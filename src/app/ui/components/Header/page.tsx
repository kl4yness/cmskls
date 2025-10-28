"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { signOutFunction } from "@/app/actions/signOut";
import { addToast, Button } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function Header() {
  const handleLogout = async () => {
    const result = await signOutFunction();
    if (result.success) {
      addToast({ title: "Logout success", color: "success" });
      setTimeout(() => {
        redirect("/");
      }, 300);
    }
    if (!result.success) {
      addToast({ title: "Logout failed", color: "danger" });
    }
  };

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <b>Conent Managment System</b>
      <Button color="success">
        <Link href={"/pages/createPage"}>Create page</Link>
      </Button>
      <Button type="button" onPress={handleLogout} color="primary">
        Logout
      </Button>
    </header>
  );
}
