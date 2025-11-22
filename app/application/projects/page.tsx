"use client";

import { projects } from "@/lib/utils/constants";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Grid,
  Badge,
  Progress,
  Avatar,
} from "@mantine/core";
import { IconPlus, IconCalendar, IconUsers, IconChecklist } from "@tabler/icons-react";
import Link from "next/link";

export default function ProjectsPage() {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "blue";
      case "Completed": return "green";
      case "Planning": return "yellow";
      default: return "gray";
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2}>Projects</Title>
          <Text c="dimmed" size="sm">
            Manage and track project progress
          </Text>
        </div>
        <Button component={Link} href="/application/projects/new" leftSection={<IconPlus size={16} />}>
          New Project
        </Button>
      </Group>

      <Grid gutter="md">
        {projects.map((project) => (
          <Grid.Col key={project.id} span={{ base: 12, md: 6, lg: 4 }}>
            <Card 
              shadow="sm" 
              padding="lg" 
              radius="md" 
              withBorder 
              h="100%" 
              component={Link} 
              href={`/application/projects/${project.id}`}
              style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
            >
              <Stack gap="md">
                <Group justify="space-between">
                  <Badge color={getStatusColor(project.status)} variant="light">
                    {project.status}
                  </Badge>
                  <Text size="xs" c="dimmed">{project.id}</Text>
                </Group>

                <div>
                  <Text fw={600} size="lg" lineClamp={2}>
                    {project.name}
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
                    {project.description}
                  </Text>
                </div>

                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Progress</Text>
                    <Text size="sm" fw={500}>{project.progress}%</Text>
                  </Group>
                  <Progress value={project.progress} size="sm" />
                  <Group gap="xs" mt="xs">
                    <IconChecklist size={14} />
                    <Text size="xs" c="dimmed">
                      {project.tasksCompleted}/{project.totalTasks} tasks completed
                    </Text>
                  </Group>
                </div>

                <Group justify="space-between">
                  <div>
                    <Text size="xs" c="dimmed">Budget</Text>
                    <Text size="sm" fw={500}>
                      {project.budget}
                    </Text>
                  </div>
                  <div>
                    <Text size="xs" c="dimmed">Spent</Text>
                    <Text size="sm" fw={500}>
                      {project.spent}
                    </Text>
                  </div>
                </Group>

                <Group justify="space-between">
                  <Group gap="xs">
                    <Avatar size={24} radius="xl" color="cyan">
                      {project.manager.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <div>
                      <Text size="xs" c="dimmed">Manager</Text>
                      <Text size="sm">{project.manager}</Text>
                    </div>
                  </Group>
                  <Group gap="xs">
                    <IconUsers size={16} />
                    <Text size="sm">{project.team}</Text>
                  </Group>
                </Group>

                <Group gap="xs">
                  <IconCalendar size={16} />
                  <div>
                    <Text size="xs" c="dimmed">Deadline</Text>
                    <Text size="sm">{project.endDate}</Text>
                  </div>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}