"use client";
import { useEffect, useState } from "react";
import { useWalletProvider } from "@/hooks/useWalletProvider";
import toast from "react-hot-toast";
import styles from "./transfer.module.scss";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Wallet } from "lucide-react";
import { Button } from "../ui/button";

const Transfer = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState(null);
  const { web3, selectedAccount, getAssetsFromUser } = useWalletProvider();

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!web3 || !selectedAccount) {
      toast.error("Please connect to MetaMask.");
      return;
    }

    try {
      const weiAmount = web3.utils.toWei(amount, "ether");
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 21000;

      const tx = await web3.eth.sendTransaction({
        from: selectedAccount,
        to: recipient,
        value: weiAmount,
        gasPrice: gasPrice,
        gas: gasLimit,
      });

      setTxHash(tx.transactionHash);
      getAssetsFromUser(selectedAccount);
      setAmount("");
      setRecipient("");
      toast.success(`Transaction sent! Hash: ${tx.transactionHash}`);
    } catch (error) {
      console.error("Error in transfer:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <Drawer>
        <DrawerTrigger className="gap-2 flex">
          <Wallet /> Transfer
        </DrawerTrigger>
        <DrawerContent className="flex flex-col items-center">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          {selectedAccount ? (
            <div className={styles.formContainer}>
              <form onSubmit={handleTransfer} className="flex flex-col">
                <div className="flex justify-between items-center gap-2">
                  <label htmlFor="recipientAddress">Recipient Address: </label>
                  <input
                    name="recipientAddress"
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <label htmlFor="amount">Amount: </label>
                  <input
                    name="amount"
                    type="text"
                    placeholder="Amount in ETH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button className="mt-2" type="submit">
                  Send
                </Button>
              </form>
              {txHash && <p>Transaction Hash: {txHash}</p>}
            </div>
          ) : (
            <div>Please connect your wallet</div>
          )}
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Transfer;
