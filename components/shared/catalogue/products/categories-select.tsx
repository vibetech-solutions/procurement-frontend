import {
  fetchCategories,
  searchCategories,
  createCategory,
} from "@/lib/redux/features/products/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Grid, NumberInput, Select, Group, Button, Modal, TextInput, Stack } from "@mantine/core";
import React, { useEffect, SetStateAction, Dispatch, useState } from "react";
import { notifications } from "@mantine/notifications";

interface CategoriesSelectProps {
  formData: {
    category_id: string;
    base_price: number;
    product_name: string;
    categories: string[];
    suppliers: string[];
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
    warehouses: string[];
  };
  setFormData: Dispatch<SetStateAction<{
    category_id: string;
    base_price: number;
    product_name: string;
    categories: string[];
    suppliers: string[];
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
    warehouses: string[];
  }>>;
}

const CategoriesSelect = ({ formData, setFormData }: CategoriesSelectProps) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.product_categories);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories(1));
  }, [dispatch]);

  const handleCreateCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        const result = await dispatch(
          createCategory({
            name: newCategoryName,
            description: "",
            image: null,
          })
        ).unwrap();

        setFormData({
          ...formData,
          category_id: result.id.toString(),
        });

        notifications.show({
          title: "Success",
          message: "Category created successfully",
          color: "green",
        });

        setNewCategoryName("");
        setModalOpen(false);
        dispatch(fetchCategories(1)); // Refresh categories list
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to create category",
          color: "red",
        });
      }
    }
  };

  return (
    <>
      <Grid gutter="md">
        <Grid.Col span={6}>
          <Group align="end" gap="xs">
            <div style={{ flex: 1 }}>
              <Select
                label="Category"
                placeholder="Select category"
                data={(categories || []).map((category) => ({
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
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setModalOpen(true)}
            >
              +
            </Button>
          </Group>
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

      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setNewCategoryName("");
        }}
        title="Create New Category"
        size="sm"
      >
        <Stack gap="md">
          <TextInput
            label="Category Name"
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
          <Group justify="flex-end" gap="sm">
            <Button
              variant="outline"
              onClick={() => {
                setModalOpen(false);
                setNewCategoryName("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateCategory} disabled={!newCategoryName.trim()}>
              Create
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default CategoriesSelect;
