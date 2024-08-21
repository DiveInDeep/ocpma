import Image from "next/image";
import { DiscoverWalletProviders } from "../DiscoverWalletProviders";

const TopBar = () => {
  return (
    <div className="flex gap-5 justify-between">
      <Image
        src={"/logo.png"}
        height={50}
        width={50}
        alt="logo"
        style={{ objectFit: "contain" }}
      />
      <div><DiscoverWalletProviders />;</div>
    </div>
  );
};

export default TopBar;
