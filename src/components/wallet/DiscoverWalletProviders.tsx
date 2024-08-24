"use client";
import { useWalletProvider } from "@/hooks/useWalletProvider";
import { formatAddress } from "@/utils";
import WalletList from "./WalletList";
import { Frown } from "lucide-react";

export const DiscoverWalletProviders = () => {
  const { wallets, connectWallet } = useWalletProvider();

  return (
    <>
      <div className="m-2">
        {Object.keys(wallets).length === 0 ? (
          <h2>No wallet detected:</h2>
        ) : (
          <h2>Wallets Detected:</h2>
        )}
      </div>
      <div>
        {Object.keys(wallets).length > 0 ? (
          Object.values(wallets).map((provider: EIP6963ProviderDetail) => (
            <WalletList
              key={provider.info.uuid}
              onClick={() => connectWallet(provider.info.rdns)}
              img={provider.info.icon}
              alt={provider.info.name}
              name={provider.info.name}
            />
          ))
        ) : (
          <div
            className="border rounded-xl flex p-4 gap-2 m-4 hover:bg-slate-700 cursor-pointer"
            onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
                "_blank"
              )
            }
          >
            <Frown />
            There are no wallet detected!
          </div>
        )}
      </div>
    </>
  );
};
