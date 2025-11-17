<<<<<<< HEAD
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/getBaseURL';

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/product`,
    credentials: 'include',
  }),
  
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({category, color, minPrice, maxPrice, page=1, limit=10}) => {
        const queryParams = new URLSearchParams({
          category: category || '',
          color: color || '',
          minPrice: minPrice || 0,
          maxPrice: maxPrice || '',
          page: page.toString(),
          limit: limit.toString()
        })
        return `/?${queryParams}`
      }
    }),
    fetchProductById: builder.query({
      
    })
  })
});

export const { useFetchAllProductsQuery } = productsApi;
export default productsApi;
=======
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/getBaseURL';

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/product`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({category, color, minPrice, maxPrice, page=1, limit=10}) => {
        const queryParams = new URLSearchParams({
          category: category || '',
          color: color || '',
          minPrice: minPrice || 0,
          maxPrice: maxPrice || '',
          page: page.toString(),
          limit: limit.toString()
        })
        return `/?${queryParams}`
      }
    }),
    fetchProductById: builder.query({
      
    })
  })
});

export const { useFetchAllProductsQuery } = productsApi;
export default productsApi;
>>>>>>> 9d6cf27680a07552898b813010134684262a026d
