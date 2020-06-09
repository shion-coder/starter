import { useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'redux/selectors/auth.selector';
import { logout } from 'redux/slices/auth.slice';

import setToken from 'utils/helper/set-token';

/* -------------------------------------------------------------------------- */

const useToken = () => {
  const token = localStorage.getItem('token');
  const { exp } = useSelector(selectUser);
  const dispatch = useDispatch();
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;

    if (isMounted.current && token) {
      exp && exp < Date.now() / 1000 ? dispatch(logout()) : setToken(token);
    }

    return () => {
      isMounted.current = false;
    };
  }, [dispatch, token, exp]);
};

export default useToken;
