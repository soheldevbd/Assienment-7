import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileView from "@/components/ProfileView";

export const metadata = { title: "আমার প্রোফাইল" };
export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=protected&callbackUrl=/profile");
  const { name, email, image } = session.user;
  return <ProfileView initialUser={{ name, email, image }} />;
}
