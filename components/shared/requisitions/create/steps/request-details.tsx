import {
  Grid,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";

const RequestDetails = ({ projects }: { projects: Project[] }) => {
  return (
    <Stack gap="md" mt="xl">
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Requisition Title"
            placeholder="e.g., Q1 Office Equipment"
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            label="Priority"
            placeholder="Select priority"
            data={["Low", "Medium", "High", "Urgent"]}
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            label="Cost Center"
            placeholder="Select cost center"
            data={["Marketing", "IT", "Operations", "HR", "Finance"]}
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            label="Project (Optional)"
            placeholder="Select a project"
            data={projects.map((p) => ({
              value: p.id.toString(),
              label: p.name,
            }))}
            clearable
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Business Justification"
            placeholder="Explain why these items are needed..."
            rows={4}
            required
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default RequestDetails;
