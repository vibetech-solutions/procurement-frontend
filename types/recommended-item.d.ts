type RecommendedItem = {
  company: User;
  recommender: User;
  name: string;
  price: number;
  reason?: string;
  description?: string;
  specifications?: string;
  product?: Product;
  services?: Service;
};
