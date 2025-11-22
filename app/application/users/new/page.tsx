"use client";

import { addUser } from "@/lib/redux/features/merchants/merchantSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
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
  ActionIcon,
  NumberInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddUserPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    approval_limit: 0,
  });

  const roles = [
    { value: "USER", label: "User" },
    { value: "APPROVER", label: "Approver" },
    { value: "PROCUREMENT", label: "Procurement" },
    { value: "FINANCE", label: "Finance" },
    { value: "CATALOGUEADMIN", label: "Catalogue Admin" },
    { value: "SUPPLIER", label: "Supplier" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(addUser(formData)).unwrap();
      notifications.show({
        title: "Success",
        message: "User created successfully",
        color: "green",
      });
      router.push("/application/users");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create user";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="lg">
      <Group>
        <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
          <IconArrowLeft size={20} />
        </ActionIcon>
        <div>
          <Title order={2}>Add New User</Title>
          <Text c="dimmed" size="sm">
            Create a new user account
          </Text>
        </div>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={4}>User Information</Title>

          <Grid gutter="md">
            <Grid.Col span={6}>
              <TextInput
                label="First Name"
                placeholder="Enter first name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Last Name"
                placeholder="Enter last name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email Address"
                placeholder="user@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Phone Number"
                placeholder="+254 700 000 000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Role"
                placeholder="Select role"
                data={roles}
                value={formData.role}
                onChange={(value) =>
                  setFormData({ ...formData, role: value || "" })
                }
                required
              />
            </Grid.Col>
          </Grid>

          {formData.role === "PROCUREMENT" && (
            <>
              <Title order={4} mt="lg">
                Procurement Officer Settings
              </Title>
              <Grid gutter="md">
                <Grid.Col span={6}>
                  <NumberInput
                    label="Approval Limit (KES)"
                    placeholder="Enter approval limit"
                    value={formData.approval_limit}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        approval_limit: typeof value === "number" ? value : 0,
                      })
                    }
                    min={0}
                    thousandSeparator=","
                    required
                  />
                </Grid.Col>
              </Grid>
            </>
          )}

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              Create User
            </Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
