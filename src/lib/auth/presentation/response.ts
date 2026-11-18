import { NextResponse } from "next/server";
import { AuthError } from "../domain/errors";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  message?: string;
}

export function jsonSuccess<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
}

export function jsonMessage(message: string, status = 200): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: true,
      message,
    },
    { status },
  );
}

export function jsonError(
  error: unknown,
  fallbackStatus = 400,
): NextResponse<ApiResponse<null>> {
  if (error instanceof AuthError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode },
    );
  }

  const message =
    error instanceof Error
      ? error.message
      : "An unexpected error occurred during request processing.";

  return NextResponse.json(
    {
      success: false,
      error: message,
      code: "INTERNAL_ERROR",
    },
    { status: fallbackStatus },
  );
}
