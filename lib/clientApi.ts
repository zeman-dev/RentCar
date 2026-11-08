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