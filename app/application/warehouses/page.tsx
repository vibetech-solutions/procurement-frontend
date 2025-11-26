"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Paper,
  Table,
  Button,
  Group,
  TextInput,
  ActionIcon,
  Modal,
  Stack,
} from "@mantine/core";
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchWarehouses, addWarehouse, editWarehouse, deleteWarehouse } from "@/lib/redux/features/merchants/merchantSlice";
import { Warehouse } from "@/types/warehouse";
import AddWarehouseForm from "@/components/merchants/add-warehouse";
import EditWarehouseForm from "@/components/merchants/edit-warehouse";

const WarehousesList = () => {
  const [search, setSearch] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const dispatch = useAppDispatch();

  const { warehouses, warehousesLoading, warehouseLoading } = useAppSelector((state) => state.merchants);

  const handleEdit = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setEditModalOpen(true);
  };

  const handleAddSubmit = (data: { name: string; address: string; phone: string }) => {
    if (warehousesLoading) return;
    dispatch(addWarehouse(data)).then(() => {
      setAddModalOpen(false);
      dispatch(fetchWarehouses());
    });
  };

  const handleEditSubmit = (data: { name: string; address: string; phone: string }) => {
    if (selectedWarehouse && !warehouseLoading) {
      dispatch(editWarehouse({ ...data, id: selectedWarehouse.id })).then(() => {
        setEditModalOpen(false);
        dispatch(fetchWarehouses());
      });
    }
  };

  const handleDelete = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedWarehouse && !warehouseLoading) {
      dispatch(deleteWarehouse(selectedWarehouse.id)).then(() => {
        dispatch(fetchWarehouses());
        setDeleteModalOpen(false);
        setSelectedWarehouse(null);
      });
    }
  };

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  const filteredWarehouses = warehouses.filter(
    (warehouse) =>
      warehouse.name.toLowerCase().includes(search.toLowerCase()) ||
      warehouse.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Warehouses</Title>
        <Button
          onClick={() => setAddModalOpen(true)}
          leftSection={<IconPlus size={16} />}
        >
          Add Warehouse
        </Button>
      </Group>

      <Paper p="md">
        <Group mb="md">
          <TextInput
            placeholder="Search warehouses..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
        </Group>

        <div style={{ position: "relative" }}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Address</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredWarehouses.map((warehouse) => (
                <Table.Tr key={warehouse.id}>
                  <Table.Td>{warehouse.name}</Table.Td>
                  <Table.Td>{warehouse.address}</Table.Td>
                  <Table.Td>{warehouse.phone}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        onClick={() => handleEdit(warehouse)}
                        variant="subtle"
                        color="yellow"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        onClick={() => handleDelete(warehouse)}
                        variant="subtle" 
                        color="red"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </Paper>

      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Warehouse"
        size="md"
        centered
      >
        {selectedWarehouse && (
          <EditWarehouseForm
            warehouse={selectedWarehouse}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditModalOpen(false)}
            loading={warehouseLoading}
          />
        )}
      </Modal>

      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Warehouse"
        size="md"
        centered
      >
        <AddWarehouseForm
          onSubmit={handleAddSubmit}
          onCancel={() => setAddModalOpen(false)}
          loading={warehousesLoading}
        />
      </Modal>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Warehouse"
        size="sm"
        centered
      >
        <Stack gap="md">
          <p>Are you sure you want to delete &ldquo;{selectedWarehouse?.name}&rdquo;? This action cannot be undone.</p>
          <Group justify="flex-end">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmDelete} loading={warehouseLoading}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default WarehousesList;
