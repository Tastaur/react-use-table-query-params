import { useEffect, useState } from 'react';

import { SetSearchParams } from './types';


export const useSearchParams = (): [URLSearchParams, SetSearchParams] => {
  const [searchParams, setSearchParamsState] = useState<URLSearchParams>(new URLSearchParams(window.location.search));

  const setSearchParams: SetSearchParams = (newParams) => {
    setSearchParamsState((prevSearchParams) => {
      let params = new URLSearchParams(prevSearchParams.toString());
      if ('function' === typeof newParams) {
        params = newParams(new URLSearchParams(prevSearchParams));
      } else {
        Object.entries(newParams).forEach(([key, value]) => {
          if (null === value || value === undefined || '' === value) {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        });
      }
      const newSearch = params.toString() ? `?${params.toString()}` : '';
      const newUrl = `${window.location.pathname}${newSearch}${window.location.hash}`;
      window.history.pushState({}, '', newUrl);
      return params;
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      setSearchParamsState(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return [searchParams, setSearchParams];
};
