import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { errorsSelector } from 'redux/selectors/errors.selector';
import { clearErrors } from 'redux/slices/errors.slice';

import { useField } from 'formik';
import isEmpty from 'lodash-es/isEmpty';

import { TextField } from '@material-ui/core';

/* -------------------------------------------------------------------------- */

const useForm = (fields, submit) => {
  const errors = useSelector(errorsSelector);
  const dispatch = useDispatch();

  // Clear errors when unmount component
  useEffect(() => {
    return () => !isEmpty(errors) && dispatch(clearErrors());
  }, [dispatch, errors]);

  const TextInput = props => {
    const [field, meta] = useField(props);

    return meta.error ? (
      <TextField
        {...field}
        {...props}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && !!meta.error && meta.error}
      />
    ) : (
      <TextField {...field} {...props} error={!isEmpty(errors[field.name])} helperText={errors[field.name]} />
    );
  };

  const renderFields = () => fields.map(field => <TextInput key={field.name} {...field} />);

  const onSubmit = async values => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    submit(values);
  };

  return { renderFields, onSubmit };
};

export default useForm;
