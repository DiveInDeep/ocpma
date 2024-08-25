"use client";
import { useWalletProvider } from "@/hooks/useWalletProvider";
import WalletList from "./WalletList";
import { Frown } from "lucide-react";

export const DiscoverWalletProviders = () => {
  const { wallets, connectWallet } = useWalletProvider();

  return (
    <>
      <div className="m-2">
        {Object.keys(wallets).length === 0 ? (
          <div>No wallet detected:</div>
        ) : (
          <div>Wallets Detected:</div>
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
            className={`border rounded-xl flex p-4 gap-2 m-4 hover:bg-[var(--card-bg-theme)] cursor-pointer`}
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
