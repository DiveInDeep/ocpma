"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWalletProvider } from "@/hooks/useWalletProvider";
import Blockies from "react-blockies";
import { formatAddress } from "@/utils";
import { LogOut, Triangle } from "lucide-react";

const WalletInfoBtn = () => {
  const { selectedAccount, disconnectWallet } = useWalletProvider();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex rounded-xl p-3 font-bold text-[var(--text-pure)] border gap-4 items-center`}
        >
          <Blockies
            seed="Jeremy"
            size={10}
            scale={3}
            color="#dfe"
            spotColor="#abc"
            className="identicon "
          />
          {formatAddress(selectedAccount as string)}
          <Triangle className="md:rotate-180 size-3 fill-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => disconnectWallet()}
            className="gap-2"
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default WalletInfoBtn;
