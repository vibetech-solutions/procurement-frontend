"use client";

import { use, useEffect } from "react";
import {
  Container,
  Title,
  Paper,
  TextInput,
  Button,
  Group,
  Stack,
  Badge,
  Grid,
  LoadingOverlay,
} from "@mantine/core";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchRole } from "@/lib/redux/features/merchants/merchantSlice";

const selectedPermissions: string[] = [];

export default function RoleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const dispatch = useAppDispatch();
  const { id } = use(params);

  const { role, roleLoading } = useAppSelector((state) => state.merchants);
  useEffect(() => {
    dispatch(fetchRole(parseInt(id)));
  }, [dispatch, id]);

  if (roleLoading) return <LoadingOverlay />;

  return (
    <Container size="lg">
      <Group mb="xl">
        <Button
          component={Link}
          href="/application/roles"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Roles
        </Button>
      </Group>

      <Stack gap="lg">
        <Paper p="md">
          <Title order={4} mb="md">
            Basic Information
          </Title>
          <Grid>
            <Grid.Col span={6}>
              <TextInput label="Role Name" value={role.name} disabled />
            </Grid.Col>
          </Grid>
        </Paper>

        <Paper p="md">
          <Group justify="space-between" mb="md">
            <Title order={4}>Permissions</Title>
            <Badge color="blue">
              {selectedPermissions.length} permissions selected
            </Badge>
          </Group>

          {/* <Stack gap="md">
            {Object.entries(permissionCategories).map(
              ([category, permissions]) => (
                <Card key={category} withBorder>
                  <Text fw={500} mb="sm">
                    {category}
                  </Text>
                  <Stack gap="xs">
                    {permissions.map((permission) => (
                      <Checkbox
                        key={permission}
                        label={permission}
                        checked={selectedPermissions.includes(permission)}
                        onChange={(e) =>
                          handlePermissionChange(
                            permission,
                            e.currentTarget.checked
                          )
                        }
                      />
                    ))}
                  </Stack>
                </Card>
              )
            )}
          </Stack> */}
        </Paper>

        <Group justify="flex-end">
          <Button variant="outline" component={Link} href="/application/roles">
            Cancel
          </Button>
          <Button leftSection={<IconCheck size={16} />}>Save Changes</Button>
        </Group>
      </Stack>
    </Container>
  );
}
