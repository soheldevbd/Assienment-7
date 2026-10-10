"use client";
import { useEffect, useState } from "react";
import { bnToday } from "@/lib/bn";

export default function BanglaDate({ className = "" }) {
  const [d, setD] = useState("");
  useEffect(() => setD(bnToday()), []);
  return <span className={className} suppressHydrationWarning>{d || "\u00a0"}</span>;
}
