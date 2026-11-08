import CatalogClient from "./catalog.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchCars } from "@/lib/clientApi";

export default async function Catalog() {
  const queryClient = new QueryClient()

  const page = 1;
  await queryClient.prefetchQuery({
    queryKey: ['cars', {}, page],
    queryFn: () => fetchCars({}, page),
  })

  return <>
  <HydrationBoundary state={dehydrate(queryClient)}>
   <CatalogClient/> 
  </HydrationBoundary>
  </>;
}
