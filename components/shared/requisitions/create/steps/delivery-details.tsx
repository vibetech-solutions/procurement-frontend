import { useAppSelector } from "@/lib/redux/hooks";
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
import { UseFormReturnType } from "@mantine/form";
import React from "react";

type DeliveryDetailsProps = {
  useCustomDelivery: boolean;
  setUseCustomDelivery: (v: boolean) => void;
  users: User[];
  selectedReceiver: string | null;
  setSelectedReceiver: (v: string | null) => void;
  selectedUser: User | undefined;
  requisitionForm: UseFormReturnType<CreateRequisitionFormData>;
};

const DeliveryDetails = ({
  useCustomDelivery,
  setUseCustomDelivery,
  users,
  selectedReceiver,
  setSelectedReceiver,
  selectedUser,
  requisitionForm,
}: DeliveryDetailsProps) => {
  const { locations } = useAppSelector((state) => state.locations);
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
                data={locations.map((loc) => ({
                  value: loc.id.toString(),
                  label: loc.contact_name + " - " + loc.address,
                }))}
                key={requisitionForm.key("location_id")}
                {...requisitionForm.getInputProps("location_id")}
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
