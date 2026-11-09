"use client"
import css from "@/components/CarDetails/Car.module.css";
import { getCarById } from "@/lib/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function CarDetails(){

    const {carId} = useParams<{carId: string}>();

    const {data, isLoading, isError} = useQuery({
        queryKey: ['car', carId],
        queryFn:() => getCarById(carId),
        refetchOnMount: false,
    })

    return(
        <>
        {isLoading && <p className={css.loading}>Loading pleas wait ....</p>}
        {data && 
        <section>
         <div className={css.detailsHeader}>
        <h2 className={css.detailsTitle}>{data.brand} {data.model},  {data.year}</h2>
        <span className={css.detailsSubtitle}>Article: 9582</span>
        </div>
        <div className={css.text}>
            <p className={css.adress}>{`${data.location.city}, ${data.location.country}`}</p>
            <h2 className={css.price}>${data.rentalPrice}</h2>
            <p className={css.textDescription}>{data.description}</p>
        </div>
        {data.rentalConditions.length > 0 && 
        <div className={css.conditions}>
            <p className={css.conditionHeader}>Rental Conditions: </p>
            <ul className={css.List}>
                {data.rentalConditions.map((item) => 
                    <li key={item} className={css.listItem}><img src="/check-circle.svg" alt="check-circle"/>{item}</li>
                )}
            </ul>
        </div>}
        <div className={css.specifications}>
            <p className={css.specificationsHeader}>Rental Conditions: </p>
            <ul className={css.List}>
                <li className={css.listItem}><img src="/calendar.svg" alt=""/>Year: {data.year}</li>
                <li className={css.listItem}><img src="/car.svg" alt=""/>Type: {data.type}</li>
                <li className={css.listItem}><img src="/fuel-pump.svg" alt=""/>Fuel Consumption: {data.fuelConsumption}</li>
                <li className={css.listItem}><img src="/gear.svg" alt=""/>Engine: {data.engine}</li>
                <li className={css.listItem}><img src="/road-horizon.svg" alt=""/>Mileage: {data.mileage}</li>
            </ul>
        </div>
        {data.features.length > 0 && 
        <div className={css.specifications}>
            <p className={css.specificationsHeader}>Rental Conditions:</p>
            <ul className={css.List}>
                {data.features.map((item) => 
                    <li key={item} className={css.listItem}><img src="/check-circle.svg" alt=""/>{item}</li>
                )}
            </ul>
        </div>}
    </section>}
    {isError && <p className={css.error}>Something went wrong</p> }
    </>)
}