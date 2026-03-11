type EditProductArgs = {
  product_id: number;
  product_name: string;
  category_id: number;
  suppliers: User[];
  price: number;
  description: string;
  specifications: string;
};
