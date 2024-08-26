"use client";

import { useWalletProvider } from "@/hooks/useWalletProvider";
import styles from "./asset.module.scss";
import AssetCard from "./AssetCard";
import Image from "next/image";
import Transfer from "../transfer/Transfer";

const Assets = () => {
  const { coins, selectedAccount } = useWalletProvider();

  const coinSet = Object.entries(coins);

  return (
    <div className={styles.banner}>
      {selectedAccount && (
        <div
          className={styles.slider}
          style={{ "--quantity": coinSet.length } as React.CSSProperties}
        >
          {coinSet.map((_, index) => (
            <div
              key={index}
              className={styles.item}
              style={{ "--position": index + 1 } as React.CSSProperties}
            >
              <AssetCard coinName={_?.[0]} amount={_?.[1]} />
            </div>
          ))}
        </div>
      )}
      <div className={styles.content}>
        <h1 data-content="WEB 3.0">WEB 3.0</h1>
        <div className={styles.model}>
          <div className={styles.modelWrapper}>
            <Image
              src={"/ethModel.png"}
              height={500}
              width={500}
              alt="ethModal"
            />
            <Transfer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
