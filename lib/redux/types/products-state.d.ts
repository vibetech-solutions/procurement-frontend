import { Product } from "@/types/product";

export type ProductsState = {
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
  product: Product;
  productLoading: boolean;
  productError: string | null;
};
