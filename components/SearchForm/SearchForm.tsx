'use client';
import css from '@/components/SearchForm/SearchForm.module.css';
import { getAllFilters } from '@/lib/clientApi';
import { useQuery } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import Image from 'next/image';
import Select, {
  ClassNamesConfig,
  DropdownIndicatorProps,
  components,
} from 'react-select';
import * as Yup from 'yup';

export type SearchParams = {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
};

type Option<T> = { value: T; label: string };

type FormValues = {
  brand: Option<string> | null;
  price: Option<number> | null;
  minMileage: string;
  maxMileage: string;
};

const initialValues: FormValues = {
  brand: null,
  price: null,
  minMileage: '',
  maxMileage: '',
};

const validationSchema = Yup.object({
  minMileage: Yup.number()
    .typeError('Enter a number')
    .min(0, 'Must be 0 or more'),
  maxMileage: Yup.number()
    .typeError('Enter a number')
    .min(0, 'Must be 0 or more')
    .when('minMileage', ([min], schema) =>
      min !== undefined ? schema.min(min, 'Must be ≥ From') : schema
    ),
});

const getClassNames = <T,>(hasError: boolean): ClassNamesConfig<T, false> => ({
  control: () => css.control,
  placeholder: () => (hasError ? css.placeholderError : css.placeholder),
  singleValue: () => css.value,
  indicatorSeparator: () => css.hidden,
  dropdownIndicator: state =>
    state.selectProps.menuIsOpen ? css.arrowOpen : css.arrow,
  menu: () => css.menu,
  menuList: () => css.menuList,
  option: state => (state.isSelected ? css.optionSelected : css.option),
});

const DropdownIndicator = <T,>(props: DropdownIndicatorProps<T, false>) => (
  <components.DropdownIndicator {...props}>
    <Image
      src={props.selectProps.menuIsOpen ? '/up.svg' : '/down.svg'}
      width={16}
      height={16}
      alt=""
    />
  </components.DropdownIndicator>
);

type SearchFormProps = {
  onSearch: (values: SearchParams) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  /////{QUERY FUNCTION}/////

  const { data, isLoading, isError } = useQuery({
    queryKey: ['brands'],
    queryFn: () => getAllFilters(),
  });

  /////{PRISE STEP BY 10}/////

  const STEP = 10;

  const prices = data
    ? Array.from(
        { length: Math.floor((data.price.max - data.price.min) / STEP) + 1 },
        (_, i) => data.price.min + i * STEP
      )
    : [];

  /////{SUBMIT}/////

  const handleSubmit = (values: FormikValues) => {
    onSearch({
      brand: values.brand?.value,
      price: values.price?.value,
      minMileage: values.minMileage ? Number(values.minMileage) : undefined,
      maxMileage: values.maxMileage ? Number(values.maxMileage) : undefined,
    });
  };

  /////{SELECT SETTINGS}/////

  const toOptions = <T extends string | number>(list: T[]): Option<T>[] =>
    list.map(v => ({ value: v, label: String(v) }));

  const brandOptions = toOptions(data?.brands ?? []);
  const priceOptions = toOptions(prices);

  return (
    <>
      {data && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form className={css.form}>
              <label className={css.field}>
                <span className={css.label}>Car brand</span>
                <Select<Option<string>, false>
                  options={brandOptions}
                  value={values.brand}
                  onChange={v => setFieldValue('brand', v)}
                  placeholder={
                    isError ? 'Oops, something went wrong' : 'Choose a brand'
                  }
                  noOptionsMessage={() => 'No brands'}
                  isDisabled={isError}
                  isSearchable={false}
                  unstyled
                  classNames={getClassNames<Option<string>>(isError)}
                  components={{ DropdownIndicator }}
                />
              </label>

              <label className={css.field}>
                <span className={css.label}>Price/ 1 hour</span>
                <Select<Option<number>, false>
                  options={priceOptions}
                  value={values.price}
                  onChange={v => setFieldValue('price', v)}
                  formatOptionLabel={(o, { context }) =>
                    context === 'value' ? `To $${o.label}` : o.label
                  }
                  placeholder={
                    isError ? 'Oops, something went wrong' : 'Choose a price'
                  }
                  noOptionsMessage={() => 'No prices'}
                  isDisabled={isError}
                  isSearchable={false}
                  unstyled
                  classNames={getClassNames<Option<number>>(isError)}
                  components={{ DropdownIndicator }}
                />
              </label>

              <div className={css.field}>
                <span className={css.label}>Car mileage / km</span>
                <div className={css.mileage}>
                  <Field
                    name="minMileage"
                    type="number"
                    placeholder="From"
                    className={css.input}
                  />
                  <Field
                    name="maxMileage"
                    type="number"
                    placeholder="To"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="minMileage"
                  component="p"
                  className={css.error}
                />
                <ErrorMessage
                  name="maxMileage"
                  component="p"
                  className={css.error}
                />
              </div>

              <button type="submit" className={css.search}>
                Search
              </button>

              <button
                type="button"
                className={css.clear}
                onClick={() => {
                  resetForm();
                  onSearch({});
                }}
              >
                Clear filters
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
