"use client"

import {
  Card,
  Text,
  Group,
  Stack,
  Title,
  Accordion,
  Badge,
  Divider,
  Grid,
} from "@mantine/core"
import { 
  IconQuestionMark, 
  IconBook, 
  IconMail, 
  IconPhone,
  IconInfoCircle,
} from "@tabler/icons-react"

const faqs = [
  {
    question: "How do I create a new requisition?",
    answer: "Navigate to Requisitions > My Requisitions and click 'New Requisition'. Fill in the required details, add items from the catalogue, and submit for approval."
  },
  {
    question: "What happens after I submit a requisition?",
    answer: "Your requisition goes through an approval workflow. You'll receive notifications about status changes. Once approved, it moves to procurement for processing."
  },
  {
    question: "How do I track my purchase orders?",
    answer: "Go to Procurement Management > Purchase Orders to view all your purchase orders, their status, and expected delivery dates."
  },
  {
    question: "What is the RFQ process?",
    answer: "RFQ (Request for Quotation) is sent to suppliers to get competitive quotes. Suppliers respond with quotations, which are then reviewed and the best one is selected."
  },
  {
    question: "How do I approve requisitions?",
    answer: "If you're an approver, go to Procurement Management > Approvals to see pending requisitions. Review details and approve, reject, or request changes."
  }
]

export default function HelpPage() {
  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          Help & Support
        </Title>
        <Text c="dimmed" size="sm">
          Get help with ProcurementHub and learn about the system
        </Text>
      </div>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="lg">
              <IconQuestionMark size={24} />
              <Title order={3}>Frequently Asked Questions</Title>
            </Group>

            <Accordion variant="separated">
              {faqs.map((faq, index) => (
                <Accordion.Item key={index} value={index.toString()}>
                  <Accordion.Control>{faq.question}</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">{faq.answer}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="lg">
              <IconBook size={24} />
              <Title order={3}>User Guide</Title>
            </Group>

            <Stack gap="md">
              <div>
                <Text fw={600} mb="xs">Getting Started</Text>
                <Text size="sm" c="dimmed">
                  Learn the basics of using ProcurementHub, from creating your first requisition to tracking deliveries.
                </Text>
              </div>
              
              <Divider />
              
              <div>
                <Text fw={600} mb="xs">Procurement Workflow</Text>
                <Text size="sm" c="dimmed">
                  Understand the complete procurement process: Requisition → Approval → RFQ → Quotation → Purchase Order → Delivery.
                </Text>
              </div>
              
              <Divider />
              
              <div>
                <Text fw={600} mb="xs">Roles & Permissions</Text>
                <Text size="sm" c="dimmed">
                  Learn about different user roles: Requesters, Approvers, Procurement Officers, and their specific permissions.
                </Text>
              </div>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group mb="md">
                <IconInfoCircle size={24} />
                <Title order={4}>About ProcurementHub</Title>
              </Group>
              
              <Stack gap="sm">
                <div>
                  <Text size="sm" fw={600}>Version</Text>
                  <Text size="sm" c="dimmed">2.1.0</Text>
                </div>
                <div>
                  <Text size="sm" fw={600}>Release Date</Text>
                  <Text size="sm" c="dimmed">January 2025</Text>
                </div>
                <div>
                  <Text size="sm" fw={600}>License</Text>
                  <Text size="sm" c="dimmed">Enterprise</Text>
                </div>
              </Stack>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Contact Support</Title>
              
              <Stack gap="sm">
                <Group gap="xs">
                  <IconMail size={16} />
                  <Text size="sm">support@procurementhub.com</Text>
                </Group>
                <Group gap="xs">
                  <IconPhone size={16} />
                  <Text size="sm">+254 700 123 456</Text>
                </Group>
                <Text size="xs" c="dimmed" mt="md">
                  Support hours: Monday - Friday, 8:00 AM - 6:00 PM EAT
                </Text>
              </Stack>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">System Status</Title>
              
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm">System Status</Text>
                  <Badge color="green" size="sm">Operational</Badge>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Last Update</Text>
                  <Text size="sm" c="dimmed">Jan 15, 2025</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Uptime</Text>
                  <Text size="sm" c="dimmed">99.9%</Text>
                </Group>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}