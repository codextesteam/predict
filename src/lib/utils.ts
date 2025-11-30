// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export class ApiResponse<T = any> {
  success: boolean
  data: T | null
  message: string | null

  constructor(success: boolean, data: T | null = null, message: string | null = null) {
    this.success = success
    this.data = data
    this.message = message
  }

  static success<T>(data: T, message: string = 'Success') {
    return new ApiResponse(true, data, message)
  }

  static error(message: string = 'Error') {
    return new ApiResponse(false, null, message)
  }

  toJSON() {
    return {
      success: this.success,
      data: this.data,
      message: this.message
    }
  }
}