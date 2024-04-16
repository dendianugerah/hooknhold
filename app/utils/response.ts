import { NextResponse } from "next/server";

interface ApiResponse<T> {
  meta: ApiResponseMeta;
  data: T;
}

interface ApiResponseMeta {
  status: number;
  message: string;
}

export function Response<T>(
  data: T,
  status: number,
  message?: string
): NextResponse {
  const defaultMessage: Record<number, string> = {
    200: "Success",
    400: "Bad Request",
    404: "Not Found",
    500: "Internal Server Error",
  };

  const response: ApiResponse<T> = {
    meta: {
      status: status,
      message: message || defaultMessage[status],
    },
    data: data,
  };

  return new NextResponse(JSON.stringify(response, null, 2), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
