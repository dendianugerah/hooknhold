import { NextResponse } from "next/server";

interface ApiResponse {
  meta: {
    status: number;
    message: string;
  };
  data: any;
}

export function Response(
  data: any,
  status: number,
  message: string
): NextResponse {
  const response: ApiResponse = {
    meta: {
      status: status,
      message: message,
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
