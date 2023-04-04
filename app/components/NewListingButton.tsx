'use client';

import { useRouter } from "next/navigation";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useCallback, useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";



interface NewListingButtonProps {
  title?: string;
  currentUser?: SafeUser | null 
}

const NewListingButton: React.FC<NewListingButtonProps> = ({ title = "Criar nova Concha", currentUser}) => {
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
    <>
      {
        currentUser?.role === "admin" ? 
        <div className="absolute bottom-10 right-10">
          <div className="block">
            <button className="p-2 bg-blue-300 rounded-full text-white" title={title} onClick={rentModal.onOpen}>
              <AiOutlinePlusCircle size='3.2em'/>
            </button>
          </div>
        </div>
        :
        ''
      }
    </>
  );
};

export default NewListingButton;
