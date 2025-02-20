"use server"

import uploadFileToS3 from "../public/S3/uploadFileToS3"
import { prisma } from "../../lib/prisma"
import { TransactionStatus } from "@prisma/client"
import {
  depositPendingToInProgress,
  wagePaymentPendingToDone,
} from "../jobs/jobCards/employerChangeApplicationState"
import verifySlip from "./verifySlip"

const createTransaction = async (formData: FormData) => {
  const jobId = formData.get("jobId") as string
  const studentId = formData.get("studentId") as string
  const employerUserId = formData.get("employerUserId") as string
  const amount = parseFloat(formData.get("amount") as string)
  const isDeposit = formData.get("isDeposit") === "true"
  const receipt = formData.get("receipt") as File
  try {
    const buffer = await receipt.arrayBuffer()
    const byteArray = new Uint8Array(buffer)

    const receiptImage = await uploadFileToS3(
      byteArray,
      receipt.type,
      receipt.size,
      "transactionFiles"
    )

    if (receiptImage && !receiptImage.success) throw new Error("Error in uploading receipt")

    console.log("Receipt Uploaded with name", receiptImage.data)

    const newTransaction = await prisma.transaction.create({
      data: {
        jobId,
        studentId,
        employerUserId,
        amount,
        receiptImageName: receiptImage.data,
        isDeposit,
      },
    })

    console.log("Transaction Created with id", newTransaction.id)

    // Validate receipt
    const validatedResult = await verifySlip(newTransaction.id, receiptImage.data, amount)

    console.log("Validation result:", validatedResult?.message)

    const results = await Promise.all([
      prisma.transaction.update({
        where: {
          id: newTransaction.id,
        },
        data: {
          status: validatedResult?.success
            ? TransactionStatus.ACCEPTED
            : TransactionStatus.REJECTED,
        },
      }),
      validatedResult?.success
        ? isDeposit
          ? depositPendingToInProgress(studentId, jobId)
          : wagePaymentPendingToDone(studentId, jobId)
        : null,
      // if pay wage, transfer money to student
    ])

    return results
  } catch (error) {
    console.error("Error in createTransaction:", error)
    return null
  }
}

export default createTransaction
