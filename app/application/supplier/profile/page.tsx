"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { supplierProfile } from "@/lib/utils/constants";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  TextInput,
  Select,
  Grid,
  Badge,
  Divider,
  ActionIcon,
  Tabs,
  MultiSelect,
} from "@mantine/core";
import {
  IconSettings,
  IconBell,
  IconEdit,
  IconBuilding,
  IconMail,
  IconPhone,
  IconWorld,
  IconFileText,
} from "@tabler/icons-react";
import { useState } from "react";

export default function SupplierProfilePage() {
  const [activeTab, setActiveTab] = useState<string | null>("profile");
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(supplierProfile);

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={2} mb="xs">
              Supplier Profile
            </Title>
            <Text c="dimmed" size="sm">
              Manage your company profile and business information
            </Text>
          </div>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="profile" leftSection={<IconBuilding size={16} />}>
              Company Profile
            </Tabs.Tab>
            <Tabs.Tab value="business" leftSection={<IconFileText size={16} />}>
              Business Details
            </Tabs.Tab>
            <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
              Settings
            </Tabs.Tab>
            <Tabs.Tab
              value="notifications"
              leftSection={<IconBell size={16} />}
            >
              Notifications
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Company Information</Title>
                <ActionIcon
                  variant="subtle"
                  onClick={() => setEditMode(!editMode)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Group>

              <Grid gutter="md">
                <Grid.Col span={6}>
                  <TextInput
                    label="Company Name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!editMode}
                    leftSection={<IconBuilding size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!editMode}
                    leftSection={<IconMail size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    disabled={!editMode}
                    leftSection={<IconPhone size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Website"
                    value={profileData.website}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        website: e.target.value,
                      })
                    }
                    disabled={!editMode}
                    leftSection={<IconWorld size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    label="Address"
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: e.target.value,
                      })
                    }
                    disabled={!editMode}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <MultiSelect
                    label="Business Categories"
                    value={profileData.categories}
                    onChange={(values) =>
                      setProfileData({ ...profileData, categories: values })
                    }
                    data={[
                      "IT Equipment",
                      "Software",
                      "Hardware",
                      "Office Supplies",
                      "Furniture",
                      "Services",
                    ]}
                    disabled={!editMode}
                  />
                </Grid.Col>
              </Grid>

              {editMode && (
                <Group justify="flex-end" mt="md">
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setEditMode(false)}>
                    Save Changes
                  </Button>
                </Group>
              )}
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="business" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Legal Information
                  </Title>
                  <Stack gap="md">
                    <TextInput
                      label="Tax ID"
                      value={profileData.taxId}
                      disabled
                    />
                    <TextInput
                      label="Registration Number"
                      value={profileData.registrationNumber}
                      disabled
                    />
                    <TextInput
                      label="Established Year"
                      value={profileData.establishedYear}
                      disabled
                    />
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Business Details
                  </Title>
                  <Stack gap="md">
                    <TextInput
                      label="Employee Count"
                      value={profileData.employeeCount}
                      disabled
                    />
                    <TextInput
                      label="Annual Revenue"
                      value={profileData.annualRevenue}
                      disabled
                    />
                    <div>
                      <Text size="sm" fw={500} mb="xs">
                        Certifications
                      </Text>
                      <Group gap="xs">
                        {profileData.certifications.map((cert) => (
                          <Badge key={cert} variant="light">
                            {cert}
                          </Badge>
                        ))}
                      </Group>
                    </div>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={12}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Terms & Conditions
                  </Title>
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <TextInput
                        label="Payment Terms"
                        value={profileData.paymentTerms}
                        disabled
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Delivery Terms"
                        value={profileData.deliveryTerms}
                        disabled
                      />
                    </Grid.Col>
                  </Grid>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">
                Account Settings
              </Title>
              <Stack gap="md">
                <Select
                  label="Default Currency"
                  value="KES"
                  data={[
                    { value: "KES", label: "Kenyan Shilling (KES)" },
                    { value: "USD", label: "US Dollar (USD)" },
                    { value: "EUR", label: "Euro (EUR)" },
                  ]}
                />
                <Select
                  label="Timezone"
                  value="EAT"
                  data={[
                    { value: "EAT", label: "East Africa Time (EAT)" },
                    { value: "UTC", label: "UTC" },
                  ]}
                />
                <Select
                  label="Language"
                  value="en"
                  data={[
                    { value: "en", label: "English" },
                    { value: "sw", label: "Swahili" },
                  ]}
                />
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="notifications" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">
                Notification Preferences
              </Title>
              <Text size="sm" c="dimmed" mb="md">
                Configure how you want to receive notifications
              </Text>
              <Stack gap="md">
                <Group justify="space-between">
                  <div>
                    <Text size="sm" fw={500}>
                      New RFQ Notifications
                    </Text>
                    <Text size="xs" c="dimmed">
                      Get notified when new RFQs are available
                    </Text>
                  </div>
                  <Badge color="green">Enabled</Badge>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <div>
                    <Text size="sm" fw={500}>
                      Order Updates
                    </Text>
                    <Text size="xs" c="dimmed">
                      Receive updates on purchase order status
                    </Text>
                  </div>
                  <Badge color="green">Enabled</Badge>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <div>
                    <Text size="sm" fw={500}>
                      Payment Notifications
                    </Text>
                    <Text size="xs" c="dimmed">
                      Get notified about payment status
                    </Text>
                  </div>
                  <Badge color="green">Enabled</Badge>
                </Group>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </ContentContainer>
  );
}
