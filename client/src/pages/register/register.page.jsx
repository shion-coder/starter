import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { register } from 'redux/slices/auth.slice';

import { Formik, Form } from 'formik';

import { Container, Button, Typography } from '@material-ui/core';

import { REGISTER_FIELD } from 'config/fields';
import registerValidation from 'utils/validation/register';
import useForm from 'utils/hooks/use-form';

/* -------------------------------------------------------------------------- */

const Register = ({ register }) => {
  const { renderFields, onSubmit } = useForm(REGISTER_FIELD, register);

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center" color="primary" style={{ letterSpacing: '4px' }}>
        REGISTER
      </Typography>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerValidation}
        onSubmit={async values => onSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            {renderFields()}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              style={{ marginTop: '10px' }}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

/* -------------------------------------------------------------------------- */

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(Register);
