"use client";

import Image from "next/image";
import { ModeToggle } from "../custom/ModeToggle";
import WalletConnectBtn from "../wallet/WalletConnectBtn";
import { useTheme } from "next-themes";
import { useWalletProvider } from "@/hooks/useWalletProvider";
import WalletInfoBtn from "../wallet/WalletInfoBtn";
import Link from "next/link";

const TopBar = () => {
  const { theme } = useTheme();
  const { selectedAccount } = useWalletProvider();
  return (
    <div
      className={`flex justify-between items-center p-4 bg-[${
        theme === "dark" ? "#32383d" : "#F7F7F8"
      }] border-b border-[${theme === "dark" ? "#32383d" : "#F7F7F8"}]`}
    >
      <Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <Image
            src={"/logo.png"}
            height={50}
            width={50}
            alt="logo"
            style={{ objectFit: "contain" }}
            draggable="false"
          />
          <div>
            <strong>OCPMA</strong>
            <p className="text-sm font-thin">The Next Generation WEB 3.0</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between gap-2 items-center">
        {!selectedAccount ? <WalletConnectBtn /> : <WalletInfoBtn />}
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;
