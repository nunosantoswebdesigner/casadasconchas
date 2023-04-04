import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface ScanClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const ScanClient: React.FC<ScanClientProps> = ( { listings, currentUser } ) => {
  return (
    <Container>
      <Heading
        title="Scan Qr code"
        subtitle="List of places you favorited!"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
       SCAN CODE
      </div>
    </Container>
   );
}
 
export default ScanClient;