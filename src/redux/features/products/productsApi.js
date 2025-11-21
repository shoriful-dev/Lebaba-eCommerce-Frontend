import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/getBaseURL';

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/product`,
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: builder => ({
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams({
          category: category || '',
          color: color || '',
          minPrice: minPrice || 0,
          maxPrice: maxPrice || '',
          page: page.toString(),
          limit: limit.toString(),
        });
        return `/?${queryParams}`;
      },
      providesTags: ['Products'],
    }),
    fetchProductById: builder.query({
      query: id => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    AddProduct: builder.mutation({
      query: newProduct => ({
        url: '/create-product',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  used,
} = productsApi;
export default productsApi;
