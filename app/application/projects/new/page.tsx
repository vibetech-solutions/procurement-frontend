"use client";

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Grid,
  TextInput,
  Select,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function NewProject() {
  return (
    <Stack gap="lg">
      <Group>
        <Button component={Link} href="/application/projects" variant="subtle" leftSection={<IconArrowLeft size={16} />}>
          Back to Projects
        </Button>
      </Group>

      <div>
        <Title order={2}>Create New Project</Title>
        <Text c="dimmed" size="sm">
          Set up a new project with budget and timeline
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form>
          <Stack gap="md">
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Project Name"
                  placeholder="e.g., Digital Transformation Initiative"
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Project Code"
                  placeholder="e.g., PROJ-2025-006"
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  label="Project Manager"
                  placeholder="Select manager"
                  data={[
                    { value: "john-smith", label: "John Smith" },
                    { value: "sarah-johnson", label: "Sarah Johnson" },
                    { value: "mike-davis", label: "Mike Davis" },
                  ]}
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  label="Status"
                  placeholder="Select status"
                  data={["Planning", "Active", "On Hold", "Completed"]}
                  defaultValue="Planning"
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="Budget (KES)"
                  placeholder="1000000"
                  thousandSeparator=","
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="Team Size"
                  placeholder="5"
                  min={1}
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Start Date"
                  type="date"
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Deadline"
                  type="date"
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  placeholder="Brief description of the project objectives and scope..."
                  rows={4}
                  required
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-end" gap="sm">
              <Button variant="outline" component={Link} href="/application/projects">
                Cancel
              </Button>
              <Button type="submit">
                Create Project
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}