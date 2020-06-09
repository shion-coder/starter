import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from 'redux/slices/auth.slice';

import { Formik, Form } from 'formik';

import { Container, Button, Typography } from '@material-ui/core';

import { LOGIN_FIELD } from 'config/fields';
import loginValidation from 'utils/validation/login';
import useForm from 'utils/hooks/use-form';

/* -------------------------------------------------------------------------- */

const Login = ({ login }) => {
  const { renderFields, onSubmit } = useForm(LOGIN_FIELD, login);

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center" color="primary" style={{ letterSpacing: '4px' }}>
        LOGIN
      </Typography>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginValidation}
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
              LOGIN
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

/* -------------------------------------------------------------------------- */

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
