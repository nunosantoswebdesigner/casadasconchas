'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";

interface ListingCardProps {
  data: SafeListing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({ data, onAction, disabled, actionLabel, actionId = '', currentUser, }) => {
  console.log(data)
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) {return; }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

 

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image src={data.imageSrc} alt="..." fill className="object-cover h-full w-full group-hover:scale-110 transition" />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data?.title}
        </div>
        <div className="font-light text-neutral-500">
          {data?.category}
        </div>
        <div className="font-light">{location?.flag} {location?.label}</div>
        {onAction && actionLabel && (
          <Button disabled={disabled} small label={actionLabel}  onClick={handleCancel} />
        )}
      </div>
    </div>
  );
};
 
export default ListingCard;
