'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div className="flex items-center cursor-pointer">
      <Image onClick={() => router.push('/')} className="logo-img block" src="/images/logo.svg" width="50" height="50" alt="Logo"/>
      <div className="ml-3 hidden md:block">
        <div className="font-bold">Casa das Conchas</div>
        <div className="text-xs">Foz do Arelho</div>
      </div>
    </div>
  );
};

export default Logo;
