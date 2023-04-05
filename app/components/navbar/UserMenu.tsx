'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineScan } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps { currentUser?: SafeUser | null }

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => { setIsOpen((value) => !value); }, []);

  const onRent = useCallback(() => { 
    if (!currentUser) { return loginModal.onOpen(); }
    if (currentUser?.role === "admin") { return rentModal.onOpen(); }
    return
  }, [loginModal, rentModal, currentUser]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div  onClick={() => router.push('/scan')} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineScan className="md:ml-1" />
          <div className="hidden md:block font-medium text-sm py-1 md:pr-2">scan</div>
        </div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block"><Avatar src={currentUser?.image} /></div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-mdw-[40vw]md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="As Minhas Favoritas" onClick={() => router.push('/favorites')} />
                { currentUser?.role === "admin" ? 
                  <>
                    <MenuItem label="Criadas por Mim" onClick={() => router.push('/properties')} />
                    <MenuItem label="Criar Nova Concha" onClick={rentModal.onOpen} />
                  </>
                  :
                  ''
                }
                <hr />
                <MenuItem label="Sair" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Entrar" onClick={loginModal.onOpen} />
                <MenuItem label="Criar Conta" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
