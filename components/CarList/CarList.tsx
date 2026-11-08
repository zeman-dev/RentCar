'use client';
import type { Car } from '@/types/car';
import css from '@/components/CarList/CardList.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface NoteListProps {
  cars: Car[];
}

export default function CarList({ cars }: NoteListProps) {
  return (
    <ul className={css.list}>
      {cars.map(item => (
        <li key={item.id} className={css.listItem}>
          <Image
            className={css.image}
            src={item.img}
            alt={item.model}
            width={276}
            height={268}
          />
          <div className={css.listDescription}>
            <h2 className={css.title}>
              {item.brand} <span className={css.model}>{item.model}</span>,{' '}
              {item.year}
            </h2>
            <p className={css.rent}>${item.rentalPrice}</p>
          </div>
          <p className={css.itemText}>
            {item.location.city} | {item.location.country} |{' '}
            {item.rentalCompany}
            <br />
            {item.type} | {item.mileage} km
          </p>
          <Link className={css.link} href={`/catalog/${item.id}`}>
            Read more
          </Link>
        </li>
      ))}
    </ul>
  );
}
