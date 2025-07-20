import { cookies } from "next/headers";

export async function POST(request) {
  const { table_number } = await request.json();

  cookies().set("table_number", table_number, {
    httpOnly: false, // bisa dibaca juga di client
    path: "/",
    maxAge: 60 * 60 * 24, // 1 hari
  });

  return new Response("OK");
}
