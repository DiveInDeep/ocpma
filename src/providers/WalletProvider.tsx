"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import Web3 from "web3";

type SelectedAccountByWallet = Record<string, string | null>;

interface Coins {
  eth?: number;
  usdt?: number;
  usdc?: number;
}

interface WalletProviderContext {
  wallets: Record<string, EIP6963ProviderDetail>; // Record of wallets by UUID
  selectedWallet: EIP6963ProviderDetail | null; // Currently selected wallet
  selectedAccount: string | null; // Account address of selected wallet
  connectWallet: (walletUuid: string) => Promise<void>; // Function to trigger wallet connection
  disconnectWallet: () => void; // Function to trigger wallet disconnection
  coins: Coins;
  web3: any;
  getAssetsFromUser: (account: string) => Promise<void>;
}

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent;
  }
}

const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const TOKEN_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

export const WalletProviderContext = createContext<WalletProviderContext>(
  null as unknown as WalletProviderContext
);

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [wallets, setWallets] = useState<Record<string, EIP6963ProviderDetail>>(
    {}
  );
  const [selectedWalletRdns, setSelectedWalletRdns] = useState<string | null>(
    null
  );
  const [selectedAccountByWalletRdns, setSelectedAccountByWalletRdns] =
    useState<SelectedAccountByWallet>({});
  const [coins, setCoins] = useState<Coins>({ eth: 0, usdc: 0, usdt: 0 });
  const [web3, setWeb3] = useState(null as unknown);

  useEffect(() => {
    const savedSelectedWalletRdns = localStorage.getItem("selectedWalletRdns");
    const savedSelectedAccountByWalletRdns = localStorage.getItem(
      "selectedAccountByWalletRdns"
    );

    if (savedSelectedAccountByWalletRdns) {
      const accountByWalletRdns = JSON.parse(savedSelectedAccountByWalletRdns);
      setSelectedAccountByWalletRdns(accountByWalletRdns);

      getAssetsFromUser(
        accountByWalletRdns[savedSelectedWalletRdns as unknown as 0]
      );
    }

    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      setWallets((currentWallets) => ({
        ...currentWallets,
        [event.detail.info.rdns]: event.detail,
      }));

      if (
        savedSelectedWalletRdns &&
        event.detail.info.rdns === savedSelectedWalletRdns
      ) {
        setSelectedWalletRdns(savedSelectedWalletRdns);
      }
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () =>
      window.removeEventListener("eip6963:announceProvider", onAnnouncement);
  }, []);

  const getAssetsFromUser = async (account: string) => {
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
    const usdtContract = new web3Instance.eth.Contract(
      TOKEN_ABI,
      USDT_CONTRACT_ADDRESS
    );
    const usdcContract = new web3Instance.eth.Contract(
      TOKEN_ABI,
      USDC_CONTRACT_ADDRESS
    );

    const usdtBalance = await usdtContract.methods.balanceOf(account).call();
    const usdcBalance = await usdcContract.methods.balanceOf(account).call();
    const ethBalance = await web3Instance.eth.getBalance(account);

    setCoins({
      eth: Number(ethBalance),
      usdc: Number(usdcBalance),
      usdt: Number(usdtBalance),
    });
  };

  const connectWallet = useCallback(
    async (walletRdns: string) => {
      try {
        const wallet = wallets[walletRdns];
        const accounts = (await wallet.provider.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (accounts?.[0]) {
          setSelectedWalletRdns(wallet.info.rdns);
          setSelectedAccountByWalletRdns((currentAccounts) => ({
            ...currentAccounts,
            [wallet.info.rdns]: accounts[0],
          }));

          localStorage.setItem("selectedWalletRdns", wallet.info.rdns);
          localStorage.setItem(
            "selectedAccountByWalletRdns",
            JSON.stringify({
              ...selectedAccountByWalletRdns,
              [wallet.info.rdns]: accounts[0],
            })
          );
          getAssetsFromUser(accounts?.[0]);
        }
      } catch (error) {
        console.error("Failed to connect to provider:", error);
        const walletError: WalletError = error as WalletError;
        toast.error(
          `Code: ${walletError.code} \nError Message: ${walletError.message}`
        );
      }
    },
    [wallets, selectedAccountByWalletRdns]
  );

  const disconnectWallet = useCallback(async () => {
    if (selectedWalletRdns) {
      setSelectedAccountByWalletRdns((currentAccounts) => ({
        ...currentAccounts,
        [selectedWalletRdns]: null,
      }));

      const wallet = wallets[selectedWalletRdns];
      setSelectedWalletRdns(null);
      localStorage.removeItem("selectedWalletRdns");

      try {
        await wallet.provider.request({
          method: "wallet_revokePermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch (error) {
        console.error("Failed to revoke permissions:", error);
        const walletError: WalletError = error as WalletError;
        toast.error(
          `Code: ${walletError.code} \nError Message: ${walletError.message}`
        );
      }
    }
  }, [selectedWalletRdns, wallets]);

  const contextValue: WalletProviderContext = {
    wallets,
    selectedWallet:
      selectedWalletRdns === null ? null : wallets[selectedWalletRdns],
    selectedAccount:
      selectedWalletRdns === null
        ? null
        : selectedAccountByWalletRdns[selectedWalletRdns],
    connectWallet,
    disconnectWallet,
    coins,
    web3,
    getAssetsFromUser,
  };

  return (
    <WalletProviderContext.Provider value={contextValue}>
      {children}
    </WalletProviderContext.Provider>
  );
};
