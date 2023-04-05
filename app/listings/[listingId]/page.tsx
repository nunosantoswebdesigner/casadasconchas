
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams { listingId?: string;}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing: any = await getListingById(params);
  const currentUser: any = await getCurrentUser();

  if (!listing) {
    return ( 
      <ClientOnly>
        <EmptyState />
        
      </ClientOnly> );
  };

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser}/>
    </ClientOnly>
  );
};

export default ListingPage;
