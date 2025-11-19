import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0
}

const calculeteCartTotals = (products) => {
  const selectedItems = products.reduce((total, product) => total + product.quantity, 0);
  const totalPrice = products.reduce((total, product) => total + product.quantity * product.price, 0);
  return {selectedItems, totalPrice}
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(product => product._id === action.payload._id);
      if(!isExist) {
        state.products.push({...action.payload, quantity: 1})
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Added to Cart!',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Already Added to Cart!',
          text: 'You have already added this product.',
          showConfirmButton: false,
          timer: 1800,
        });
      }
      const totals = calculeteCartTotals(state.products);
      state.selectedItems = totals.selectedItems;
      state.totalPrice = totals.totalPrice;
    }
  }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
