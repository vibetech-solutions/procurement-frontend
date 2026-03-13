type CartState = {
  products: CartProduct[];
  productsLoading: boolean;
  productsError: string | null;
  services: CartService[];
  servicesLoading: boolean;
  servicesError: string | null;
};
