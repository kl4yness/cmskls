import getPageBySlug from "@/app/actions/getPageBySlug";
import EditPageClient from "./EditPageClient";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth/auth";
import { addToast } from "@heroui/toast";

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = await getPageBySlug((await params).slug);

  if (!page) {
    return <h1 className="text-center mt-20 text-2xl">Страница не найдена</h1>;
  }

  const session = await auth();
  if (!session?.user?.id || page.authorId !== session.user.id) {
    return <h1 className="text-center mt-20 text-2xl">You are not a author of page</h1>
  }

  return <EditPageClient page={page} />;
}
