import {
  Avatar,
  Card,
  Checkbox,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";

type DeliveryDetailsProps = {
  useCustomDelivery: boolean;
  setUseCustomDelivery: (v: boolean) => void;
  users: User[];
  selectedReceiver: string | null;
  setSelectedReceiver: (v: string | null) => void;
  selectedUser: User | undefined;
};

const DeliveryDetails = ({
  useCustomDelivery,
  setUseCustomDelivery,
  users,
  selectedReceiver,
  setSelectedReceiver,
  selectedUser,
}: DeliveryDetailsProps) => {
  return (
    <Stack gap="md" mt="xl">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <Checkbox
            label="Use custom delivery information"
            checked={useCustomDelivery}
            onChange={(e) => setUseCustomDelivery(e.currentTarget.checked)}
          />
        </Grid.Col>
        {!useCustomDelivery && (
          <>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Delivery Location"
                placeholder="Select location"
                data={[
                  "Main Office - Building A",
                  "Main Office - Building B",
                  "Warehouse",
                  "Remote Office",
                ]}
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Requested Delivery Date" type="date" required />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                label="Receiver"
                placeholder="Select receiver"
                data={users.map((user) => ({
                  value: user.id.toString(),
                  label: user.first_name + " " + user.last_name,
                }))}
                value={selectedReceiver}
                onChange={setSelectedReceiver}
                required
              />
            </Grid.Col>
            {selectedUser && (
              <Grid.Col span={12}>
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <Group gap="md">
                    <Avatar size={40} radius="xl" color="cyan">
                      {selectedUser.user_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Text fw={500}>
                        {selectedUser.first_name + selectedUser.last_name}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {selectedUser.email}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {selectedUser.phone}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>
            )}
            <Grid.Col span={12}>
              <Textarea
                label="Special Delivery Instructions (Optional)"
                placeholder="Any special requirements..."
                rows={3}
              />
            </Grid.Col>
          </>
        )}
        {useCustomDelivery && (
          <>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Receiver Name"
                placeholder="Enter receiver name"
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Receiver Phone"
                placeholder="Enter phone number"
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Receiver Email"
                placeholder="Enter email address"
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Department/Office"
                placeholder="Enter department or office"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Delivery Address"
                placeholder="Enter complete delivery address"
                rows={2}
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Requested Delivery Date" type="date" required />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Special Delivery Instructions (Optional)"
                placeholder="Any special requirements..."
                rows={3}
              />
            </Grid.Col>
          </>
        )}
      </Grid>
    </Stack>
  );
};

export default DeliveryDetails;
