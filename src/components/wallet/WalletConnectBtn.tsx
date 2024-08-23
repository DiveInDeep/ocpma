import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DiscoverWalletProviders } from "./DiscoverWalletProviders";
import { Button } from "../ui/button";

const WalletConnectBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Connect Wallet</Button>
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
