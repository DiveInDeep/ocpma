import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Decimal } from "decimal.js";

interface AssetCardProps {
  coinName: string;
  amount: number;
}

const AssetCard = ({ coinName, amount }: AssetCardProps) => {
  const formatAmount = (amount: number, decimalPlaces: number = 4) => {
    const number = new Decimal(amount).toFixed(decimalPlaces);
    return number;
  };
  const fullAmount = (amount: number) => {
    const number = new Decimal(amount).toFixed();
    return number;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Card className={"bg-[#000000]/50 "}>
            <CardContent
              className={"flex flex-col items-center justify-center p-3"}
            >
              <Image
                src={`/${coinName}.png`}
                alt={coinName}
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
              />
              <div className="m-2 text-xl font-extrabold">
                {coinName.toLocaleUpperCase()}
              </div>
              <div className="m-2 text-xl font-extrabold">
                {formatAmount(amount, 4)}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            <span>{coinName.toLocaleUpperCase()}:</span>
            <span>{fullAmount(amount)}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AssetCard;
