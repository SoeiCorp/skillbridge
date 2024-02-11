import Input from "./Input"
import PasswordInput from "./PasswordInput"
import Link from "next/link"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import { useState } from "react"

export default function RegisterViaEmail({
    handleFirstFormComplete,
    isFirstFormComplete
}: {
    handleFirstFormComplete: () => void
    isFirstFormComplete: boolean
}) {

    const handleNextPageSubmit = () => {
        handleFirstFormComplete();
    };

    const [Form, setForm] = useState({
        email: '',
        password: '',
        cPassword: '',
        fname: '',
        lname: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setForm({
            ...Form,
            [event.target.name]: event.target.value
        })
        console.log(Form)
    }

    return (
        <form className="w-full" action={"/"}>
            {
                !isFirstFormComplete ?
                    <div className="pt-[5px]">
                        {/* Email Input Component */}
                        <Input name="email" label="อีเมล" inputType="email" warning="กรอกที่อยู่อีเมลของคุณ" handleChange={handleChange} value={Form.email} />

                        {/* Password Input Component */}
                        <PasswordInput fromLoginPage={false} handleChange={handleChange} value={Form.password} />

                        {/*Confirm Password Input Component */}
                        <ConfirmPasswordInput handleChange={handleChange} value={Form.cPassword} />

                        <div id="nextPage" className="w-full bg-[#334155] text-center cursor-pointer rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md" onClick={handleNextPageSubmit}>
                            ถัดไป
                        </div>

                        <p className="w-full text-center text-sm mt-[10px]">
                            มีบัญชีอยู่แล้ว ? <Link href={"/login"} className="text-[#326FE2] hover:underline hover:underline-offset-2">เข้าสู่ระบบ</Link>
                        </p>

                    </div>
                    :
                    <div className="pt-[10px] flex flex-col">
                        <Input name="fname" label="ชื่อ" inputType="text" warning="กรอกชื่อของคุณ" handleChange={handleChange} value={Form.fname} />
                        <Input name="lname" label="นามสกุล" inputType="text" warning="กรอกนามสกุลของคุณ" handleChange={handleChange} value={Form.lname} />

                        <div className="mt-[30px] w-full relative">
                            {/* Link ไป ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge และ นโยบายคุ้มครองความเป็นส่วนตัว*/}
                            <input type="checkbox" name=""
                                className="absolute cursor-pointer left-0 top-0 border
                                    border-[#848484]
                                    accent-[#334155]
                                    cursor-pointer
                                    rounded-sm
                                    "
                                required />
                            <label className="block text-[9.5px] pl-[20px]">
                                ฉันได้อ่านและยอมรับ
                                <Link href={'/'} className="text-[#326FE2] hover:underline hover:underline-offset">ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge</Link>
                            </label>
                        </div>
                        <div className="mt-[10px] w-full relative">
                            <input type="checkbox" name=""
                                className="absolute cursor-pointer left-0 top-0 border
                                    border-[#848484]
                                    accent-[#334155]
                                    cursor-pointer
                                    rounded-sm
                                    "
                                required />
                            <label className="block text-[9.5px] pl-[20px]">
                                ฉันได้อ่านและยอมรับ
                                <Link href={'/'} className="text-[#326FE2] hover:underline hover:underline-offset">นโยบายคุ้มครองความเป็นส่วนตัว</Link>
                            </label>
                        </div>


                        <button id="submit" type="submit" className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md">
                            สร้างบัญชี
                        </button>

                        <div id="previousPage" className="mt-[15px] flex justify-center">
                            <p className="text-[#334155] text-md hover:underline hover:underline-offset cursor-pointer" onClick={handleNextPageSubmit}>
                                ย้อนกลับ
                            </p>
                        </div>

                    </div>

            }
        </form>
    )
}
