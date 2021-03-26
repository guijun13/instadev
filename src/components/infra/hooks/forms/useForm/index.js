import { useState } from 'react';

export default function useForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues);

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
  };
}
