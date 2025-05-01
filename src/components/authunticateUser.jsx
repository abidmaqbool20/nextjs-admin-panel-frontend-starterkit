"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuthToken } from "@/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import {AUTH_TOKEN} from "@/constants/index"
export default function AuthunticateUser() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <></>;
}
