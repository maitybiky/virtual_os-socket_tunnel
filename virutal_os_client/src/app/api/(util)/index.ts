import { NextResponse } from "next/server";

export const createErrorBody = (
  error: unknown
): { msg: string } => {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";
  return { msg: errorMessage };
};
