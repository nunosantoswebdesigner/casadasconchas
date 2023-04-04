'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';
import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const locationValue = params?.get('locationValue'); 
  const titleValue = params?.get('title'); 
  const descriptionValue = params?.get('description'); 
 

  const titleLabel = useMemo(() => {
    if (titleValue) {
      return getByValue(titleValue as string)?.label;
    }
    return 'nome';
  }, [titleValue, getByValue]);
  
  const descriptionLabel = useMemo(() => {
    if (descriptionValue) {
      return getByValue(descriptionValue as string)?.label;
    }
    return 'descrição';
  }, [descriptionValue, getByValue]);

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return 'localização';
  }, [locationValue, getByValue]);


  return ( 
    <div onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{titleLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">{descriptionLabel}</div>
        <div className="text-sm pl-6 pr-2 font-semibold flex flex-row items-center gap-3">
          <div className="hidden sm:block">{locationLabel}</div>
          <div className="p-2 bg-blue-300 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;