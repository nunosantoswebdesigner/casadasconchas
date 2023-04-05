'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { GiArmouredShell, GiSewedShell, GiOpeningShell, GiGoldShell, GiBackboneShell, GiNautilusShell, GiBeetleShell,  GiSpikedShell, GiSpiralShell, GiSwirledShell, GiTripleShells, GiTwinShell } from 'react-icons/gi';
import { SiShell } from 'react-icons/si';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Armoured',
    icon: GiArmouredShell, 
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    label: 'Backbone',
    icon: GiBackboneShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, 
  {
    label: 'Beetle',
    icon: GiBeetleShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    label: 'Gold',
    icon: GiGoldShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    label: 'Nautilus',
    icon: GiNautilusShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    label: 'Opening',
    icon: GiOpeningShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    label: 'Sewed',
    icon: GiSewedShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    label: 'Spiked',
    icon: GiSpikedShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    label: 'Spiral',
    icon: GiSpiralShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    label: 'Swirled',
    icon: GiSwirledShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    label: 'Triple Shells',
    icon: GiTripleShells,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    label: 'Twin',
    icon: GiTwinShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    label: 'Scalope',
    icon: SiShell,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
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