import { NextRequest, NextResponse } from "next/server";

const FAL_BASE = "https://fal.run";
const FAL_KEY  = process.env.FAL_KEY!;

async function proxyRequest(request: NextRequest, params: Promise<{ path: string[] }>) {
  const { path } = await params;
  const falPath  = path.join("/");
  const url      = `${FAL_BASE}/${falPath}${request.nextUrl.search}`;

  const headers: HeadersInit = {
    Authorization: `Key ${FAL_KEY}`,
    "Content-Type": request.headers.get("content-type") ?? "application/json",
  };

  const body = request.method !== "GET" && request.method !== "HEAD"
    ? await request.text()
    : undefined;

  const res = await fetch(url, {
    method:  request.method,
    headers,
    body,
  });

  const resBody = await res.text();
  return new NextResponse(resBody, {
    status:  res.status,
    headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
  });
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, ctx.params);
}
export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, ctx.params);
}
export async function PUT(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, ctx.params);
}
