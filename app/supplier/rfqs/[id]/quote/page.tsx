"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { supplierRFQs } from "@/lib/utils/constants";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Table,
  ActionIcon,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SubmitQuotePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const rfq = supplierRFQs.find(r => r.id === id);

  const [quoteItems, setQuoteItems] = useState([
    {
      id: "1",
      name: "Dell XPS 15 Laptop",
      quantity: 3,
      unitPrice: 194999,
      total: 584997,
    },
    {
      id: "2", 
      name: "Wireless Mouse",
      quantity: 3,
      unitPrice: 3899,
      total: 11697,
    },
  ]);

  const [formData, setFormData] = useState({
    validUntil: "",
    notes: "",
    deliveryTerms: "",
  });

  const subtotal = quoteItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handlePriceChange = (itemId: string, price: number) => {
    setQuoteItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, unitPrice: price, total: price * item.quantity }
          : item
      )
    );
  };

  const handleSubmit = () => {
    console.log("Submitting quote:", { rfqId: id, items: quoteItems, formData });
    router.push("/supplier/rfqs");
  };

  if (!rfq) {
    return (
      <ContentContainer>
        <Text>RFQ not found</Text>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group>
          <ActionIcon variant="subtle" component={Link} href={`/supplier/rfqs/${id}`}>
            <IconArrowLeft size={16} />
          </ActionIcon>
          <div>
            <Title order={2}>Submit Quote</Title>
            <Text c="dimmed" size="sm">
              {rfq.id} • {rfq.title}
            </Text>
          </div>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Text fw={600} size="lg">Quote Items</Text>
            
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Unit Price (KES)</Table.Th>
                  <Table.Th>Total (KES)</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {quoteItems.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Text size="sm" fw={500}>{item.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{item.quantity}</Text>
                    </Table.Td>
                    <Table.Td>
                      <NumberInput
                        value={item.unitPrice}
                        onChange={(value) => handlePriceChange(item.id, Number(value) || 0)}
                        min={0}
                        w={120}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600}>
                        {item.total.toLocaleString()}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            <Group justify="flex-end">
              <Stack gap="xs" align="flex-end">
                <Group>
                  <Text size="sm">Subtotal:</Text>
                  <Text size="sm" fw={600}>KES {subtotal.toLocaleString()}</Text>
                </Group>
                <Group>
                  <Text size="sm">Tax (16%):</Text>
                  <Text size="sm" fw={600}>KES {tax.toLocaleString()}</Text>
                </Group>
                <Group>
                  <Text size="lg" fw={700}>Total:</Text>
                  <Text size="lg" fw={700} c="cyan">KES {total.toLocaleString()}</Text>
                </Group>
              </Stack>
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Text fw={600} size="lg">Quote Details</Text>
            
            <Group grow>
              <TextInput
                label="Valid Until"
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                required
              />
              <TextInput
                label="Delivery Terms"
                placeholder="e.g., 3-5 business days"
                value={formData.deliveryTerms}
                onChange={(e) => setFormData({...formData, deliveryTerms: e.target.value})}
              />
            </Group>

            <Textarea
              label="Additional Notes"
              placeholder="Any additional terms or conditions"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              minRows={3}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="outline" component={Link} href={`/supplier/rfqs/${id}`}>
                Cancel
              </Button>
              <Button leftSection={<IconDeviceFloppy size={16} />} onClick={handleSubmit}>
                Submit Quote
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </ContentContainer>
  );
}