import { useState, useEffect, useRef } from 'react';

import axios, { CancelToken } from 'axios';

/* -------------------------------------------------------------------------- */

const useFetch = url => {
  const isMounted = useRef(null);
  const [state, setState] = useState({
    loading: true,
    error: false,
    data: [],
  });

  useEffect(() => {
    isMounted.current = true;
    const source = CancelToken.source();

    (async () => {
      const { data } =
        (await axios.get(url, { cancelToken: source.token }).catch(
          () =>
            isMounted.current &&
            setState({
              loading: false,
              error: 'An error occurred when fetching data',
              data: [],
            }),
        )) || {};

      if (isMounted.current && data) {
        setState({ loading: false, error: false, data });
      }
    })();

    return () => {
      isMounted.current = false;
      source.cancel();
    };
  }, [url]);

  return state;
};

export default useFetch;
