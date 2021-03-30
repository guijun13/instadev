import { useEffect, useState } from 'react';

export default function useForm({ initialValues, onSubmit, validateSchema }) {
  const [values, setValues] = useState(initialValues);

  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateSchema(values)
      .then(() => {
        setIsFormDisabled(false);
        setErrors({});
      })
      .catch((err) => {
        // desconstruindo array err.inner para objeto
        const formatedErrors = err.inner.reduce(
          (errorObjectAcc, currentError) => {
            const fieldName = currentError.path;
            const errorMessage = currentError.message;
            return {
              ...errorObjectAcc,
              [fieldName]: errorMessage,
            };
          },
          {}
        );
        console.log(formatedErrors);
        setErrors(formatedErrors);
        setIsFormDisabled(true);
      });
  }, [values]);

  return {
    values,
    // handleSubmit() -> manejar o submit
    handleSubmit(event) {
      event.preventDefault();
      onSubmit(values);
    },
    // handleChange() -> mudança do input
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;

      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
    isFormDisabled,
    errors,
  };
}
