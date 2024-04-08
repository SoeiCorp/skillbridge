/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */

/* This file is for testing purpose only. Will be deleted in future.*/
import { NextResponse } from 'next/server';

export async function GET(req: Request){
      return NextResponse.json({ message: 'hello world' })
}