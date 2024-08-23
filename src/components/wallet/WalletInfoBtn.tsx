"use client"

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
import { Button } from "../ui/button";

const WalletInfoBtn = () => {
  const { selectedAccount, disconnectWallet } = useWalletProvider();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex rounded-xl p-3 font-bold text-white border gap-4 items-center">
          <Blockies
            seed="Jeremy"
            size={10}
            scale={3}
            color="#dfe"
            bgColor="#ffe"
            spotColor="#abc"
            className="identicon"
          />
          {selectedAccount}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default WalletInfoBtn;
