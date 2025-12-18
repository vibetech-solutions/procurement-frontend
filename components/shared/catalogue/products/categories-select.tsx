import {
  fetchCategories,
  searchCategories,
} from "@/lib/redux/features/products/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Grid, NumberInput, Select } from "@mantine/core";
import React, { useEffect, SetStateAction, Dispatch } from "react";

interface FormData {
  product_name: string;
  category_id: string;
  categories: string[];
  suppliers: string[];
  base_price: number;
  description: string;
  specifications: string;
  serviceTerms: string;
  tax_status: string;
  tax_type: string;
  tax_method: string;
  tax_value_type: string;
  tax_value: number;
  opening_stock: number;
  min_stock: number;
  max_stock: number;
}

interface CategoriesSelectProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const CategoriesSelect = ({ formData, setFormData }: CategoriesSelectProps) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.product_categories);

  useEffect(() => {
    dispatch(fetchCategories(1));
  }, [dispatch]);

  return (
    <Grid gutter="md">
      <Grid.Col span={6}>
        <Select
          label="Category"
          placeholder="Select category"
          data={categories.map((category) => ({
            value: category.id.toString(),
            label: category.name,
          }))}
          value={formData.category_id}
          onChange={(value) =>
            setFormData({
              ...formData,
              category_id: value || "",
            })
          }
          searchable
          onSearchChange={(query) => {
            if (query) {
              dispatch(searchCategories(query));
            } else {
              dispatch(fetchCategories(1));
            }
          }}
          required
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Price (KES)"
          placeholder="0"
          value={formData.base_price}
          onChange={(value) =>
            setFormData({
              ...formData,
              base_price: typeof value === "number" ? value : 0,
            })
          }
          min={0}
          prefix="KES "
          thousandSeparator=","
          required
        />
      </Grid.Col>
    </Grid>
  );
};

export default CategoriesSelect;
