'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ user, description, category }) => {
  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <Avatar src={user?.image} />
          <div> 
            <div className="text-xl font-semibold">{user?.name}</div>
            <div className="text-xs text-neutral-500">Criado por</div>
          </div>
        </div>
      </div>
      <hr />
      { category && ( <ListingCategory icon={category.icon} label={category?.label} description={category?.description} /> )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
    </div>
  );
};

export default ListingInfo;
