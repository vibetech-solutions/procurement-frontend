"use client";

import { ContentContainer } from "@/components/layout/content-container";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  ActionIcon,
  Grid,
  MultiSelect,
  Tabs,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconPackage,
  IconPlane,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewSuppliersCatalogItem() {
  const router = useRouter();
  const [itemType, setItemType] = useState<string | null>('inventory');
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    suppliers: [] as string[],
    price: 0,
    description: "",
    taxStatus: "taxable",
    taxType: "inclusive",
    taxValue: 16,
  });

  const suppliers = [
    "Office Pro Ltd",
    "Tech Solutions Inc",
    "Supplies Direct",
    "Kenya Airways",
    "Serena Hotels",
    "Avis Kenya",
  ];

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={() => router.back()}
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>Request New Supplier Item</Title>
              <Text c="dimmed" size="sm">
                Request a new item from external suppliers
              </Text>
            </div>
          </Group>
          <Group>
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button leftSection={<IconDeviceFloppy size={16} />}>
              Submit Request
            </Button>
          </Group>
        </Group>

        <Tabs value={itemType} onChange={setItemType}>
          <Tabs.List>
            <Tabs.Tab value="inventory" leftSection={<IconPackage size={16} />}>
              Product
            </Tabs.Tab>
            <Tabs.Tab value="service" leftSection={<IconPlane size={16} />}>
              Service
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="inventory" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Product Request Information
                    </Title>
                    <Stack gap="md">
                      <TextInput
                        label="Product Name"
                        placeholder="e.g., Ergonomic Office Chair"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <Grid gutter="md">
                        <Grid.Col span={6}>
                          <Select
                            label="Category"
                            placeholder="Select category"
                            data={[
                              "Office Supplies",
                              "IT Equipment",
                              "Furniture",
                              "Marketing Materials",
                              "Safety Equipment",
                            ]}
                            value={formData.category}
                            onChange={(value) =>
                              setFormData({ ...formData, category: value || "" })
                            }
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <NumberInput
                            label="Expected Price Range (KES)"
                            placeholder="0"
                            value={formData.price}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                price: typeof value === "number" ? value : 0,
                              })
                            }
                            min={0}
                            prefix="Up to KES "
                            thousandSeparator=","
                          />
                        </Grid.Col>
                      </Grid>
                      <Textarea
                        label="Product Description & Requirements"
                        placeholder="Detailed description of the product and specific requirements..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        rows={6}
                        required
                      />
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Preferred Suppliers
                    </Title>
                    <Stack gap="md">
                      <MultiSelect
                        label="Select Preferred Suppliers"
                        placeholder="Choose suppliers to request quotes from"
                        data={suppliers}
                        value={formData.suppliers}
                        onChange={(value) =>
                          setFormData({ ...formData, suppliers: value })
                        }
                        searchable
                        required
                      />
                      <Text size="sm" c="dimmed">
                        Selected suppliers will be contacted for quotes and availability
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="md">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Request Details
                    </Title>
                    <Stack gap="md">
                      <Select
                        label="Urgency"
                        data={[
                          { value: "low", label: "Low - 2+ weeks" },
                          { value: "medium", label: "Medium - 1 week" },
                          { value: "high", label: "High - 3 days" },
                          { value: "urgent", label: "Urgent - Same day" },
                        ]}
                      />
                      <NumberInput
                        label="Quantity Needed"
                        min={1}
                        defaultValue={1}
                      />
                      <TextInput
                        label="Required By Date"
                        type="date"
                      />
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Budget Information
                    </Title>
                    <Stack gap="md">
                      <Select
                        label="Budget Status"
                        data={[
                          { value: "approved", label: "Budget Approved" },
                          { value: "pending", label: "Budget Pending" },
                          { value: "estimate", label: "Estimate Only" },
                        ]}
                      />
                      <TextInput
                        label="Cost Center"
                        placeholder="e.g., IT Operations"
                      />
                      <Text size="xs" c="dimmed">
                        Supplier quotes will be reviewed before procurement
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="service" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Service Request Information
                    </Title>
                    <Stack gap="md">
                      <TextInput
                        label="Service Name"
                        placeholder="e.g., Flight Booking Service"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <Grid gutter="md">
                        <Grid.Col span={6}>
                          <Select
                            label="Category"
                            placeholder="Select category"
                            data={[
                              "Travel",
                              "Transport",
                              "Professional Services",
                              "Consulting",
                              "Training",
                              "Marketing",
                            ]}
                            value={formData.category}
                            onChange={(value) =>
                              setFormData({ ...formData, category: value || "" })
                            }
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <NumberInput
                            label="Expected Budget (KES)"
                            placeholder="0"
                            value={formData.price}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                price: typeof value === "number" ? value : 0,
                              })
                            }
                            min={0}
                            prefix="Up to KES "
                            thousandSeparator=","
                          />
                        </Grid.Col>
                      </Grid>
                      <Textarea
                        label="Service Description & Requirements"
                        placeholder="Detailed description of the service needed and specific requirements..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        rows={6}
                        required
                      />
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Preferred Service Providers
                    </Title>
                    <Stack gap="md">
                      <MultiSelect
                        label="Select Preferred Providers"
                        placeholder="Choose providers to request quotes from"
                        data={[
                          "Kenya Airways",
                          "Serena Hotels",
                          "Avis Kenya",
                          "Corporate Training Ltd",
                          "Business Consulting Kenya",
                          "Creative Agency Ltd",
                        ]}
                        value={formData.suppliers}
                        onChange={(value) =>
                          setFormData({ ...formData, suppliers: value })
                        }
                        searchable
                        required
                      />
                      <Text size="sm" c="dimmed">
                        Selected providers will be contacted for service quotes
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="md">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Service Timeline
                    </Title>
                    <Stack gap="md">
                      <Select
                        label="Urgency"
                        data={[
                          { value: "low", label: "Low - 2+ weeks" },
                          { value: "medium", label: "Medium - 1 week" },
                          { value: "high", label: "High - 3 days" },
                          { value: "urgent", label: "Urgent - Same day" },
                        ]}
                      />
                      <TextInput
                        label="Service Start Date"
                        type="date"
                      />
                      <TextInput
                        label="Service End Date"
                        type="date"
                      />
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Budget Information
                    </Title>
                    <Stack gap="md">
                      <Select
                        label="Budget Status"
                        data={[
                          { value: "approved", label: "Budget Approved" },
                          { value: "pending", label: "Budget Pending" },
                          { value: "estimate", label: "Estimate Only" },
                        ]}
                      />
                      <TextInput
                        label="Cost Center"
                        placeholder="e.g., Marketing Department"
                      />
                      <Text size="xs" c="dimmed">
                        Service quotes will be reviewed before booking
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </ContentContainer>
  );
}