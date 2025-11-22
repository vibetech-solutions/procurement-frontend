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

export default function EditProject({ params }: { params: { project_id: string } }) {
  const project = {
    id: "PROJ-2025-001",
    name: "Digital Transformation Initiative",
    status: "Active",
    budget: 2500000,
    manager: "john-smith",
    team: 8,
    startDate: "2025-01-15",
    deadline: "2025-06-30",
    description: "Modernizing our digital infrastructure and processes to improve efficiency and reduce operational costs."
  };

  return (
    <Stack gap="lg">
      <Group>
        <Button component={Link} href={`/application/projects/${params.project_id}`} variant="subtle" leftSection={<IconArrowLeft size={16} />}>
          Back to Project
        </Button>
      </Group>

      <div>
        <Title order={2}>Edit Project</Title>
        <Text c="dimmed" size="sm">
          Update project details and settings
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form>
          <Stack gap="md">
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Project Name"
                  defaultValue={project.name}
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Project Code"
                  defaultValue={project.id}
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  label="Project Manager"
                  data={[
                    { value: "john-smith", label: "John Smith" },
                    { value: "sarah-johnson", label: "Sarah Johnson" },
                    { value: "mike-davis", label: "Mike Davis" },
                  ]}
                  defaultValue={project.manager}
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  label="Status"
                  data={["Planning", "Active", "On Hold", "Completed"]}
                  defaultValue={project.status}
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="Budget (KES)"
                  defaultValue={project.budget}
                  thousandSeparator=","
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="Team Size"
                  defaultValue={project.team}
                  min={1}
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Start Date"
                  type="date"
                  defaultValue={project.startDate}
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Deadline"
                  type="date"
                  defaultValue={project.deadline}
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  defaultValue={project.description}
                  rows={4}
                  required
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-end" gap="sm">
              <Button variant="outline" component={Link} href={`/application/projects/${params.project_id}`}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}