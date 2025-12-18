import {
  Card,
  NumberInput,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { SetStateAction, Dispatch } from "react";

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

interface TaxDetailsProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const TaxDetails = ({ formData, setFormData }: TaxDetailsProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Tax Details
      </Title>
      <Stack gap="md">
        <Select
          label="Tax Status"
          value={formData.tax_status}
          onChange={(value) =>
            setFormData({
              ...formData,
              tax_status: value || "exempt",
            })
          }
          data={[
            { value: "exempt", label: "Tax Exempt" },
            { value: "taxable", label: "Taxable" },
          ]}
        />
        {formData.tax_status === "taxable" && (
          <>
            <Select
              label="Tax Type"
              value={formData.tax_type}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  tax_type: value || "inclusive",
                })
              }
              data={[
                { value: "inclusive", label: "Inclusive" },
                { value: "exclusive", label: "Exclusive" },
              ]}
            />
            <Select
              label="Tax Value Type"
              value={formData.tax_value_type}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  tax_value_type: value || "percentage",
                })
              }
              data={[
                { value: "percentage", label: "Percentage" },
                { value: "amount", label: "Amount" },
              ]}
            />
            <NumberInput
              label={formData.tax_value_type === "percentage" ? "Tax Percentage (%)" : "Tax Amount"}
              value={formData.tax_value}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  tax_value: typeof value === "number" ? value : 0,
                })
              }
              min={0}
              max={formData.tax_value_type === "percentage" ? 100 : undefined}
              suffix={formData.tax_value_type === "percentage" ? "%" : undefined}
            />
          </>
        )}
        <Text size="xs" c="dimmed">
          Most services are tax-exempt in Kenya
        </Text>
      </Stack>
    </Card>
  );
};

export default TaxDetails;
