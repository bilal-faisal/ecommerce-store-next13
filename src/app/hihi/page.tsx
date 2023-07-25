"use client";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = useAuth();
  return <div>User Id: {userId}</div>;
}
