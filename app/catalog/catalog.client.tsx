'use client';
import css from '@/app/catalog/catalog.module.css';
import CarList from '@/components/CarList/CarList';
import SearchForm, { SearchParams } from '@/components/SearchForm/SearchForm';
import { fetchCars } from '@/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function CatalogClient() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<SearchParams>({});

  function onSearch(params: SearchParams) {
    setFilters(params);
    setPage(1);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cars', filters, page],
    queryFn: () => fetchCars(filters, page),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.container}>
      <div className={css.search}>
        <SearchForm onSearch={onSearch} />
      </div>
      {isLoading && <p>Loading please wait....</p>}
      {data && data.cars.length > 0 && <CarList cars={data.cars} />}
      {isError && <p>Oops something went wrong.</p>}
    </div>
  );
}
