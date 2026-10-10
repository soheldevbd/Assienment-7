import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata = { title: "তথ্য আপডেট" };
export default async function UpdatePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=protected&callbackUrl=/profile/update");
  return <UpdateProfileForm initialName={session.user.name} />;
}
