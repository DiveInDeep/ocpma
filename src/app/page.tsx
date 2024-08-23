"use client";
import TopBar from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { useWalletProvider } from "@/hooks/useWalletProvider";
import Image from "next/image";

export default function Home() {
  const { disconnectWallet } = useWalletProvider();
  return (
    <div>
      <TopBar />
      <Button onClick={() => disconnectWallet()}>Logout</Button>
    </div>
  );
}
