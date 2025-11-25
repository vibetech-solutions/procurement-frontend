"use client";

import { use, useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Card,
  Group,
  ActionIcon,
  TextInput,
  Select,
  NumberInput,
  Grid,
  Checkbox,
  Badge,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock contract data for editing
const contractData = {
  id: "CNT-2025-001",
  title: "Office Supplies Agreement",
  type: "Supplier Agreement",
  counterparty: "Office Pro Ltd",
  value: 500000,
  status: "Active",
  startDate: new Date("2025-01-01"),
  endDate: new Date("2025-12-31"),
  owner: "John Doe",
  priority: "Medium",
  description: "Annual agreement for office supplies including stationery, printing materials, and basic office equipment.",
  terms: "Net 30 payment terms. Delivery within 5 business days. Quality guarantee for 6 months.",
  autoRenewal: false,
};

function getStatusColor(status: string) {
  switch (status) {
    case "Active": return "green";
    case "Pending Approval": return "orange";
    case "Draft": return "gray";
    case "Expired": return "red";
    default: return "blue";
  }
}

export default function EditContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state initialized with existing data
  const [title, setTitle] = useState(contractData.title);
  const [type, setType] = useState(contractData.type);
  const [counterparty, setCounterparty] = useState(contractData.counterparty);
  const [value, setValue] = useState<number | string>(contractData.value);
  const [startDate, setStartDate] = useState<string | null>(contractData.startDate?.toISOString().split('T')[0] || null);
  const [endDate, setEndDate] = useState<string | null>(contractData.endDate?.toISOString().split('T')[0] || null);
  const [description, setDescription] = useState(contractData.description);
  const [terms, setTerms] = useState(contractData.terms);
  const [owner, setOwner] = useState(contractData.owner);
  const [priority, setPriority] = useState(contractData.priority);
  const [autoRenewal, setAutoRenewal] = useState(contractData.autoRenewal);

  const contractTypes = [
    "Supplier Agreement",
    "Service Agreement",
    "Lease Agreement",
    "Employment Contract",
    "NDA",
    "Partnership Agreement",
    "License Agreement",
    "Other",
  ];

  const owners = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
  ];

  const priorities = [
    "Low",
    "Medium",
    "High",
    "Critical",
  ];

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/application/contracts/${id}`);
    }, 1500);
  };

  const handleCancel = () => {
    router.push(`/application/contracts/${id}`);
  };

  return (
    <Container size="lg" py="md">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between">
          <Group>
            <ActionIcon
              variant="subtle"
              component={Link}
              href={`/application/contracts/${id}`}
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>Edit Contract</Title>
              <Group gap="xs" mt={4}>
                <Text c="dimmed" size="sm">{contractData.id}</Text>
                <Badge color={getStatusColor(contractData.status)} size="sm">
                  {contractData.status}
                </Badge>
              </Group>
            </div>
          </Group>
          <Group gap="sm">
            <Button
              variant="outline"
              leftSection={<IconX size={16} />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              leftSection={<IconDeviceFloppy size={16} />}
              onClick={handleSave}
              loading={loading}
            >
              Save Changes
            </Button>
          </Group>
        </Group>

        {/* Edit Form */}
        <Card withBorder p="lg">
          <Stack gap="lg">
            {/* Basic Information */}
            <div>
              <Title order={4} mb="md">Basic Information</Title>
              <Stack gap="md">
                <Grid>
                  <Grid.Col span={8}>
                    <TextInput
                      label="Contract Title"
                      placeholder="e.g., Office Supplies Agreement 2025"
                      value={title}
                      onChange={(e) => setTitle(e.currentTarget.value)}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Select
                      label="Contract Type"
                      placeholder="Select type"
                      data={contractTypes}
                      value={type}
                      onChange={(value) => setType(value || "")}
                      required
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Counterparty"
                      placeholder="Company or individual name"
                      value={counterparty}
                      onChange={(e) => setCounterparty(e.currentTarget.value)}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Contract Value (KES)"
                      placeholder="0"
                      value={value}
                      onChange={setValue}
                      thousandSeparator=","
                      min={0}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <DateInput
                      label="Start Date"
                      placeholder="Select start date"
                      value={startDate}
                      onChange={(value: string | null) => setStartDate(value)}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <DateInput
                      label="End Date"
                      placeholder="Select end date"
                      value={endDate}
                      onChange={(value: string | null) => setEndDate(value)}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Select
                      label="Priority"
                      placeholder="Select priority"
                      data={priorities}
                      value={priority}
                      onChange={(value) => setPriority(value || "")}
                      required
                    />
                  </Grid.Col>
                </Grid>

                <div>
                  <Text size="sm" fw={500} mb={5}>Description</Text>
                  <RichTextEditor
                    editor={useEditor({
                      extensions: [
                        StarterKit,
                        Underline,
                        Superscript,
                        SubScript,
                        Highlight,
                        TextAlign.configure({
                          types: ["heading", "paragraph"],
                        }),
                      ],
                      content: description || "<p></p>",
                      immediatelyRender: false,
                      onUpdate: ({ editor }) => {
                        setDescription(editor.getHTML());
                      },
                    })}
                  >
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                      </RichTextEditor.ControlsGroup>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                      </RichTextEditor.ControlsGroup>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                      </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>
                    <RichTextEditor.Content style={{ minHeight: "100px" }} />
                  </RichTextEditor>
                </div>
              </Stack>
            </div>

            {/* Terms & Details */}
            <div>
              <Title order={4} mb="md">Terms & Details</Title>
              <Stack gap="md">
                <div>
                  <Text size="sm" fw={500} mb={5}>Key Terms & Conditions *</Text>
                  <RichTextEditor
                    editor={useEditor({
                      extensions: [
                        StarterKit,
                        Underline,
                        Superscript,
                        SubScript,
                        Highlight,
                        TextAlign.configure({
                          types: ["heading", "paragraph"],
                        }),
                      ],
                      content: terms || "<p></p>",
                      immediatelyRender: false,
                      onUpdate: ({ editor }) => {
                        setTerms(editor.getHTML());
                      },
                    })}
                  >
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                      </RichTextEditor.ControlsGroup>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                      </RichTextEditor.ControlsGroup>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Blockquote />
                      </RichTextEditor.ControlsGroup>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignRight />
                      </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>
                    <RichTextEditor.Content style={{ minHeight: "150px" }} />
                  </RichTextEditor>
                </div>

                <Grid>
                  <Grid.Col span={6}>
                    <Select
                      label="Contract Owner"
                      placeholder="Select owner"
                      data={owners}
                      value={owner}
                      onChange={(value) => setOwner(value || "")}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Checkbox
                      label="Enable Auto-Renewal"
                      description="Automatically renew this contract when it expires"
                      checked={autoRenewal}
                      onChange={(e) => setAutoRenewal(e.currentTarget.checked)}
                      mt="lg"
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </div>
          </Stack>
        </Card>

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel Changes
          </Button>
          <Button
            onClick={handleSave}
            loading={loading}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            Save Contract
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}