"use client";

import { nonTangibleCatalogueItems } from "@/lib/utils/constants";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconEye,
  IconGrid3x3,
  IconList,
  IconSearch,
  IconBriefcase,
  IconMapPin,
  IconTag,
  IconUser,
} from "@tabler/icons-react";
import React, { useState } from "react";

// ─── Service Card (Grid View) ────────────────────────────────────────────────

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  supplier: string;
  price: string;
  inStock: boolean;
  description?: string;
}

const categoryColors: Record<string, string> = {
  Travel: "violet",
  Transport: "blue",
  "Professional Services": "teal",
  Consulting: "orange",
};

const categoryIcons: Record<string, React.ReactNode> = {
  Travel: <IconMapPin size={16} />,
  Transport: <IconBriefcase size={16} />,
  "Professional Services": <IconUser size={16} />,
  Consulting: <IconTag size={16} />,
};

function ServiceGridCard({
  service,
  onView,
}: {
  service: ServiceItem;
  onView: (id: string) => void;
}) {
  const color = categoryColors[service.category] ?? "gray";
  const icon = categoryIcons[service.category] ?? <IconBriefcase size={16} />;

  return (
    <Card
      shadow="xs"
      radius="md"
      withBorder
      padding="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "box-shadow 0.18s ease, transform 0.18s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 6px 24px rgba(0,0,0,0.10)";
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
    >
      {/* Top row */}
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <ThemeIcon
          size={40}
          radius="md"
          variant="light"
          color={color}
          style={{ flexShrink: 0 }}
        >
          {icon}
        </ThemeIcon>
        <Badge
          variant="light"
          color={service.inStock ? "green" : "red"}
          size="sm"
          style={{ flexShrink: 0 }}
        >
          {service.inStock ? "Available" : "Unavailable"}
        </Badge>
      </Group>

      {/* Name & ID */}
      <Box>
        <Text fw={600} size="sm" lineClamp={2} lh={1.4}>
          {service.name}
        </Text>
        <Text size="xs" c="dimmed" mt={2}>
          {service.id}
        </Text>
      </Box>

      <Divider />

      {/* Meta */}
      <Stack gap={6}>
        <Group gap={6}>
          <Badge variant="dot" color={color} size="xs">
            {service.category}
          </Badge>
        </Group>
        <Group gap={4}>
          <IconUser size={12} color="var(--mantine-color-dimmed)" />
          <Text size="xs" c="dimmed" lineClamp={1}>
            {service.supplier}
          </Text>
        </Group>
      </Stack>

      {/* Footer */}
      <Group justify="space-between" align="center" mt="auto">
        <Text fw={700} size="md" c="cyan.6">
          {service.price}
        </Text>
        <Tooltip label="View details" withArrow>
          <ActionIcon
            variant="light"
            color="blue"
            radius="md"
            onClick={() => onView(service.id)}
          >
            <IconEye size={15} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Card>
  );
}

// ─── Main ServicesView ────────────────────────────────────────────────────────

interface ServicesViewProps {
  onView?: (id: string) => void;
}

const ServicesView = ({ onView }: ServicesViewProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = nonTangibleCatalogueItems.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !category || category === "All" || s.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleView = (id: string) => {
    onView?.(id);
  };

  return (
    <Grid.Col span={{ base: 12, md: 9 }}>
      <Stack gap="md">
        {/* ── Toolbar ── */}
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <Group gap="sm" style={{ flex: 1, minWidth: 200 }}>
            <TextInput
              placeholder="Search services..."
              leftSection={<IconSearch size={15} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              radius="md"
              size="sm"
              style={{ flex: 1 }}
            />
            <Select
              placeholder="All categories"
              data={[
                "All",
                "Travel",
                "Transport",
                "Professional Services",
                "Consulting",
              ]}
              value={category}
              onChange={setCategory}
              clearable
              radius="md"
              size="sm"
              w={180}
            />
          </Group>

          <Group gap={4}>
            <Text size="sm" c="dimmed" mr={4}>
              {filtered.length} service{filtered.length !== 1 ? "s" : ""}
            </Text>
            <Button
              variant={viewMode === "grid" ? "filled" : "subtle"}
              size="xs"
              leftSection={<IconGrid3x3 size={14} />}
              onClick={() => setViewMode("grid")}
              radius="md"
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "filled" : "subtle"}
              size="xs"
              leftSection={<IconList size={14} />}
              onClick={() => setViewMode("list")}
              radius="md"
            >
              List
            </Button>
          </Group>
        </Group>

        {/* ── Grid View ── */}
        {viewMode === "grid" && (
          <>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <Grid gutter="md">
                {filtered.map((service) => (
                  <Grid.Col key={service.id} span={{ base: 12, sm: 6, lg: 4 }}>
                    <ServiceGridCard service={service} onView={handleView} />
                  </Grid.Col>
                ))}
              </Grid>
            )}
          </>
        )}

        {/* ── List / Table View ── */}
        {viewMode === "list" && (
          <Card shadow="xs" radius="md" withBorder padding={0}>
            {filtered.length === 0 ? (
              <Box p="xl">
                <EmptyState />
              </Box>
            ) : (
              <Table
                highlightOnHover
                verticalSpacing="sm"
                horizontalSpacing="md"
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                      <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                        Service
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                        Category
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                        Supplier
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                        Price
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                        Status
                      </Text>
                    </Table.Th>
                    <Table.Th />
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filtered.map((service) => {
                    const color = categoryColors[service.category] ?? "gray";
                    return (
                      <Table.Tr key={service.id}>
                        <Table.Td>
                          <Group gap="sm" wrap="nowrap">
                            <ThemeIcon
                              size={32}
                              radius="md"
                              variant="light"
                              color={color}
                              style={{ flexShrink: 0 }}
                            >
                              {categoryIcons[service.category] ?? (
                                <IconBriefcase size={15} />
                              )}
                            </ThemeIcon>
                            <Box>
                              <Text size="sm" fw={600} lineClamp={1}>
                                {service.name}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {service.id}
                              </Text>
                            </Box>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Badge variant="light" color={color} size="sm">
                            {service.category}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" c="dimmed">
                            {service.supplier}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={700} c="cyan.6">
                            {service.price}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            variant="light"
                            color={service.inStock ? "green" : "red"}
                            size="sm"
                          >
                            {service.inStock ? "Available" : "Unavailable"}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Tooltip label="View details" withArrow>
                            <ActionIcon
                              variant="subtle"
                              color="blue"
                              onClick={() => handleView(service.id)}
                            >
                              <IconEye size={15} />
                            </ActionIcon>
                          </Tooltip>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            )}
          </Card>
        )}
      </Stack>
    </Grid.Col>
  );
};

function EmptyState() {
  return (
    <Stack align="center" py="xl" gap="xs">
      <ThemeIcon size={48} radius="xl" variant="light" color="gray">
        <IconBriefcase size={24} />
      </ThemeIcon>
      <Text fw={600} size="sm">
        No services found
      </Text>
      <Text size="xs" c="dimmed">
        Try adjusting your search or filters
      </Text>
    </Stack>
  );
}

export default ServicesView;
