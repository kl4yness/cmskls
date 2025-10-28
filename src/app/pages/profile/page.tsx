// app/pages/profile/page.tsx
import { auth } from "@/app/auth/auth";
import getPagesByAuthor from "@/app/actions/getPagesByAuthor";
import ProfileClient from "@/app/ui/components/ProfileClient/page";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) return null;

  const pages = await getPagesByAuthor(session.user?.id as string);

  return <ProfileClient pages={pages} />;
}
