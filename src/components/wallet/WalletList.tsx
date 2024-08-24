"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";

interface WalletListProps {
  onClick: () => void;
  img: string;
  alt: string;
  name: string;
}

const WalletList = ({ onClick, img, alt, name }: WalletListProps) => {
  const { theme } = useTheme();
  return (
    <Card
      className={`${
        theme === "dark" ? "hover:bg-[#242A2D]" : "hover:bg-[#D3D3D3]"
      } my-2 cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="flex items-center p-4 gap-4">
        <Image src={img} alt={alt} width={50} height={50} />
        <span>{name}</span>
      </CardContent>
    </Card>
  );
};

export default WalletList;
