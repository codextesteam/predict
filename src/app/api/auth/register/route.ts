import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { ApiResponse } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return Response.json(ApiResponse.error('Email and password are required'))
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return Response.json(ApiResponse.error('User already exists'))
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name
      }
    })

    return Response.json(ApiResponse.success(
      { id: user.id, email: user.email, name: user.name },
      'User created successfully'
    ))
  } catch (error) {
    console.error('Registration error:', error)
    return Response.json(ApiResponse.error('Internal server error'), { status: 500 })
  }
}