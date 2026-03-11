import { Card, NumberInput, Select, Stack, Text, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { SetStateAction, Dispatch } from "react";

interface TaxDetailsProps {
  form: UseFormReturnType<CreateProductFormData>;
}

const TaxDetails = ({ form }: TaxDetailsProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Tax Details
      </Title>
      <Stack gap="md">
        <Select
          label="Tax Status"
          key={form.key("tax_status")}
          {...form.getInputProps("tax_status")}
          data={[
            { value: "exempt", label: "Tax Exempt" },
            { value: "taxable", label: "Taxable" },
          ]}
        />
        {form.values.tax_status === "taxable" && (
          <>
            <Select
              label="Tax Type"
              key={form.key("tax_type")}
              {...form.getInputProps("tax_type")}
              data={[
                { value: "inclusive", label: "Inclusive" },
                { value: "exclusive", label: "Exclusive" },
              ]}
            />
            <Select
              label="Tax Value Type"
              key={form.key("tax_value_type")}
              {...form.getInputProps("tax_value_type")}
              data={[
                { value: "percentage", label: "Percentage" },
                { value: "amount", label: "Amount" },
              ]}
            />
            <NumberInput
              label={
                form.values.tax_value_type === "percentage"
                  ? "Tax Percentage (%)"
                  : "Tax Amount"
              }
              key={form.key("tax_value")}
              {...form.getInputProps("tax_value")}
              min={0}
              max={
                form.values.tax_value_type === "percentage" ? 100 : undefined
              }
              suffix={
                form.values.tax_value_type === "percentage" ? "%" : undefined
              }
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
