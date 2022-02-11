import { defineStore } from 'pinia';

const wishlist: any = {};
const user: any = {};
const cart: any = {};

interface CustomerState {
  wishlist,
  user,
  cart,
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    wishlist,
    user,
    cart,
  }),
});
