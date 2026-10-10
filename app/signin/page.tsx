import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন" };
export default function SignInPage() {
  return <Suspense fallback={<div className="skeleton mx-auto mt-8 h-96 max-w-md" />}><SignInForm /></Suspense>;
}
