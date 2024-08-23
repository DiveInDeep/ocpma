import Image from "next/image";
import { DiscoverWalletProviders } from "../wallet/DiscoverWalletProviders";
import { ModeToggle } from "../custom/ModeToggle";
import WalletConnectBtn from "../wallet/WalletConnectBtn";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-[#181C1D] border-b border-[#32383d]">
      <div className="flex items-center gap-2">
        <Image
          src={"/logo.png"}
          height={50}
          width={50}
          alt="logo"
          style={{ objectFit: "contain" }}
        />
        <div>
          <strong>OCPMA</strong>
          <p className="text-sm font-thin">The Next Generation WEB 3.0</p>
        </div>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <WalletConnectBtn />
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;
