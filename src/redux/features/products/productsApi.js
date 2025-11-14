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
    })
  })
});

export const { useFetchAllProductsQuery } = productsApi;
export default productsApi;
