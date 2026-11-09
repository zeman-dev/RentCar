'use client';
import css from '@/components/CarForm/CarForm.module.css';
import { getCarById, postBooking } from '@/lib/clientApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useField } from 'formik';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as Yup from 'yup';

interface FormValues {
  name: string;
  email: string;
  comment: string;
}

/////{VALIDATION SCHEMA}/////

const ValidationSchema = Yup.object().shape({
  name: Yup.string().
  required('Please enter your name.').
  min(3, 'Name must be at least 3 characters.').
  max(64),
  email: Yup.string().
  required('Please enter your email.').
  email('Please enter a valid email.').
  max(64),
  comment: Yup.string().
  max(500).
  required('Comment is required'),
});

const initialValues: FormValues = {
  name: '',
  email: '',
  comment: '',
};


type FormFieldProps = {
  name: keyof FormValues;
  label: string;
  type?: string;
  as?: 'textarea';
};

function FormField({ name, label, type = 'text', as }: FormFieldProps) {
  const [, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;

  return (
    <div className={css.field}>
      <div className={`${css.control} ${hasError ? css.invalid : ''}`}>
        <Field
          as={as}
          type={as ? undefined : type}
          name={name}
          placeholder={label}
          className={css.input}
        />
        <span className={css.label}>{label}</span>
      </div>
      {hasError && <p className={css.error}>{meta.error}</p>}
    </div>
  );
}

export default function CarForm() {
  const { carId } = useParams<{ carId: string }>();

  ///// {QUERY} /////

  const { data, isLoading, isError } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
    refetchOnMount: false,
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) => postBooking(carId, values),
  });

  ///// {FORMIK} /////

  function handleSubmit(
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) {
    mutation.mutate(values, {
      onSuccess: () => {
        formikHelpers.resetForm();
      },
    });
  }

  return (
    <section>
      <div className={css.formContainer}>
        {data && (
          <Image
            className={css.image}
            src={data.img}
            alt={data.model}
            width={640}
            height={512}
            loading='eager'
          />
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchema}
        >
          <Form className={css.form}>
            <div className={css.formTitle}>
              <h2>Book your car now</h2>
              <span className={css.subtext}>
                Stay connected! We are always ready to help you.
              </span>
            </div>
  <FormField name="name" label="Name*" />
  <FormField name="email" label="Email*" type="email" />
  <FormField name="comment" label="Comment" as="textarea" />
            <button
              className={css.button}
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Sending...' : 'Send'}
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
