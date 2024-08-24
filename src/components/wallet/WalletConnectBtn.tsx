import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DiscoverWalletProviders } from "./DiscoverWalletProviders";

const WalletConnectBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-xl p-3 mainThemeColor font-bold text-white">Connect Wallet</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl">Connect Wallet</span>
          </DialogTitle>
          <DialogDescription>
            <DiscoverWalletProviders />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectBtn;
