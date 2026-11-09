import CarDetails from "@/components/CarDetails/Car";
import CarForm from "@/components/CarForm/CarForm";
import { getCarById } from "@/lib/clientApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import css from "@/app/catalog/[carId]/carId.module.css";

interface CarIdProps{
    params: Promise <{carId: string}>;
}

export default async function CarId (props : CarIdProps){
    const {carId} = await props.params;

	const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
    
  })

    return(
	<HydrationBoundary state={dehydrate(queryClient)}>
    <div className={css.carInfoContainer}>
      <CarForm/>
      <CarDetails/>
      </div>
    </HydrationBoundary>

    );
}