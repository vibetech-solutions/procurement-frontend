import { fetchWarehouses } from "@/lib/redux/features/merchants/merchantSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { MultiSelect } from "@mantine/core";
import React, { useEffect, SetStateAction, Dispatch } from "react";

interface WarehousesMultiSelectProps {
  formData: {
    warehouses?: string[];
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
  };
  setFormData: Dispatch<SetStateAction<{
    warehouses: string[];
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
  }>>;
}

const WarehousesMultiSelect = ({ formData, setFormData }: WarehousesMultiSelectProps) => {
  const dispatch = useAppDispatch();
  const { warehouses } = useAppSelector((state) => state.merchants);

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  return (
    <MultiSelect
      label="Warehouses"
      placeholder="Select warehouses"
      data={warehouses.map((warehouse) => ({
        value: warehouse.id.toString(),
        label: warehouse.name,
      }))}
      value={formData.warehouses || []}
      onChange={(value) =>
        setFormData({
          ...formData,
          warehouses: value,
        })
      }
      searchable
      required
    />
  );
};

export default WarehousesMultiSelect;
