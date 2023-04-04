'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { GiSewedShell, GiOpeningShell, GiGoldShell, GiBackboneShell, GiNautilusShell, GiBeetleShell} from 'react-icons/gi';
import { SiShell } from 'react-icons/si';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Abalone',
    icon: GiSewedShell,
    description: 'All abalones have natural holes that run along one side',
  },
  {
    label: 'Cowrie',
    icon: GiOpeningShell,
    description: 'Cowries have an oval shape that is glossy and smooth to the touch but lined with tiny teeth around both lips of their opening.',
  },
  {
    label: 'Melon',
    icon: GiBeetleShell,
    description: 'These colorful shells have an inner lip with three or four plaits (grooves, teeth, or folds). ',
  },
  {
    label: 'Murex',
    icon: GiBackboneShell,
    description: 'Murex seashells are renowned for their incredible range of ornamentation and sculpture.',
  },
  {
    label: 'Nautilus',
    icon: GiNautilusShell,
    description: 'This remarkable structures are composed of many chambers and is perfectly proportioned mathematically',
  },
  {
    label: 'Turbo',
    icon: GiGoldShell,
    description: 'They belong to the large family of Turbinidae, which consists of several hundred species found mainly in tropical seas.'
  },
  {
    label: 'Clams',
    icon: GiOpeningShell,
    description: 'Clams are a type of mollusk found in the ocean and have two shells that open and close.'
  },
  {
    label: 'Scallop',
    icon: SiShell,
    description: 'Scallop seashells are a type of marine bivalve mollusk related to oysters and clams.'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;