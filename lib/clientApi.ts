import { SearchParams } from '@/components/SearchForm/SearchForm';
import { Car } from '@/types/car';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
});

export interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export async function fetchCars(
  filters: SearchParams,
  page: number,
): Promise<FetchCarsResponse> {
  const res = await api.get('/cars', {
    params: {
      ...filters,
      perPage: 12,
      page,
    },
  });

  return res.data;
}

  type getAllFiltersResponse = {
  brands: string[],
  price: {
    min: number,
    max: number
  }
}

export async function getAllFilters(): Promise<getAllFiltersResponse> {
  const res = await api.get('/cars/filters');
return(res.data)
}

export async function getCarById(id: string):Promise<Car> {
 const res = await api.get(`/cars/${id}`);
 return res.data;
}

interface bookCar {
  name: string,
  email: string,
  comment: string
}

export async function postBooking( carId:string, values:bookCar): Promise<{message: string}>{
  const res = await api.post(`/cars/${carId}/booking-requests`, values);
  return res.data;

}