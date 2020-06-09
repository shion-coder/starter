import * as Yup from 'yup';

/* -------------------------------------------------------------------------- */

const registerValidation = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(6, 'Password must be at least 6 characters')
    .required('Confirm password is required'),
});

export default registerValidation;
