import {
  fetchCategories,
  searchCategories,
} from "@/lib/redux/features/products/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Grid, NumberInput, Select } from "@mantine/core";
import React, { useEffect } from "react";

interface FormData {
  category: string;
  price: number;
  [key: string]: any;
}

interface CategoriesSelectProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
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
          value={formData.category}
          onChange={(value) =>
            setFormData({
              ...formData,
              category: value || "",
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
          value={formData.price}
          onChange={(value) =>
            setFormData({
              ...formData,
              price: typeof value === "number" ? value : 0,
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
