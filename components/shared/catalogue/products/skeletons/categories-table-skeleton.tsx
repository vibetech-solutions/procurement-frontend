import { Card, Group, Skeleton, Stack, Table } from "@mantine/core";
import React from "react";

const CategoriesTableSkeleton = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Skeleton height={24} width={150} />
        <Skeleton height={32} width={120} />
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Category Name</Table.Th>
            <Table.Th>Items Count</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                <Skeleton height={16} width={120} />
              </Table.Td>
              <Table.Td>
                <Skeleton height={20} width={30} radius="sm" />
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Skeleton height={28} width={28} radius="sm" />
                  <Skeleton height={28} width={28} radius="sm" />
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
};

export default CategoriesTableSkeleton;
