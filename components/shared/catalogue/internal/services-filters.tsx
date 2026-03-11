import { nonTangibleCategories } from "@/lib/utils/constants";
import { Grid, Paper, Select, Tabs, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const ServicesFilters = () => {
  return (
    <Tabs.Panel value="services" pt="md">
      <Paper p="md" withBorder>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              placeholder="Search services, suppliers, or categories..."
              leftSection={<IconSearch size={16} />}
              size="md"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              placeholder="All Categories"
              data={nonTangibleCategories}
              size="md"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              placeholder="Sort by"
              data={[
                "Relevance",
                "Price: Low to High",
                "Price: High to Low",
                "Name A-Z",
                "Name Z-A",
              ]}
              size="md"
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </Tabs.Panel>
  );
};

export default ServicesFilters;
