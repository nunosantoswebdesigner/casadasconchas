
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import ScanClient from "./ScanClient";

const SacnPage = async () => {
  const listings: any = await getFavoriteListings();
  const currentUser : any = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Sem Permissões!!"
          subtitle="Por favor habilite a sua camêra para fazer o Scan"
        />
      </ClientOnly>
    );
  }
  
  return (
    <ClientOnly>
      <ScanClient
        listings={listings}
        currentUser={currentUser}
        />
    </ClientOnly>
  );
}
 
export default SacnPage;
