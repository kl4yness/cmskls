'use client'
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Неизвестная ошибка";
  return <h1 className="text-center mt-20 text-2xl">{message}</h1>;
}
