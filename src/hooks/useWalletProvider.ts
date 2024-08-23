import { useContext } from "react";
import { WalletProviderContext } from "@/providers/WalletProvider";

export const useWalletProvider = () => useContext(WalletProviderContext);
