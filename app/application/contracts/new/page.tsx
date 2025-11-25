"use client";

import { useState } from "react";
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
  Stepper,
  FileInput,
  Checkbox,
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
  IconCheck,
  IconUpload,
  IconFileText,
  IconX,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewContractPage() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [counterparty, setCounterparty] = useState("");
  const [value, setValue] = useState<number | string>("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");
  const [owner, setOwner] = useState("");
  const [priority, setPriority] = useState("");
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

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

  const owners = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"];

  const priorities = ["Low", "Medium", "High", "Critical"];

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/application/contracts");
    }, 2000);
  };

  return (
    <Container size="lg" py="md">
      <Stack gap="lg">
        <Group>
          <ActionIcon
            variant="subtle"
            component={Link}
            href="/application/contracts"
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
          <div>
            <Title order={2}>Create New Contract</Title>
            <Text c="dimmed" size="sm">
              Set up a new contract with automated workflow
            </Text>
          </div>
        </Group>

        <Card withBorder p="lg">
          <Stepper active={active} size="sm" mb="xl">
            <Stepper.Step label="Basic Info" description="Contract details">
              <Stack gap="md" mt="xl">
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
                  <Text size="sm" fw={500} mb={5}>
                    Description
                  </Text>
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
            </Stepper.Step>

            <Stepper.Step label="Terms & Details" description="Contract terms">
              <Stack gap="md" mt="xl">
                <div>
                  <Text size="sm" fw={500} mb={5}>
                    Key Terms & Conditions *
                  </Text>
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
            </Stepper.Step>

            <Stepper.Step label="Documents" description="Upload files">
              <Stack gap="md" mt="xl">
                <FileInput
                  label="Contract Documents"
                  description="Upload contract drafts, terms, or related documents (Max 5MB per file)"
                  placeholder="Click to upload files"
                  leftSection={<IconUpload size={16} />}
                  multiple
                  value={undefined}
                  onChange={(newFiles) => {
                    const filesToAdd = Array.isArray(newFiles)
                      ? newFiles
                      : newFiles
                      ? [newFiles]
                      : [];
                    const validFiles = filesToAdd.filter(
                      (file) => file.size <= 5 * 1024 * 1024
                    );
                    if (filesToAdd.length !== validFiles.length) {
                      alert("Some files exceed 5MB limit and were not added");
                    }
                    setFiles((prev) => [...prev, ...validFiles]);
                  }}
                  accept=".pdf,.doc,.docx,.txt"
                />

                {files.length > 0 && (
                  <Card withBorder p="md">
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" fw={500}>
                        Uploaded Files:
                      </Text>
                      <Button
                        size="xs"
                        variant="outline"
                        color="red"
                        leftSection={<IconTrash size={14} />}
                        onClick={() => setFiles([])}
                      >
                        Clear All
                      </Button>
                    </Group>
                    <Stack gap="xs">
                      {files.map((file, index) => (
                        <Group key={index} justify="space-between">
                          <Group gap="xs">
                            <IconFileText size={16} />
                            <Text size="sm">{file.name}</Text>
                            <Text size="xs" c="dimmed">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </Text>
                          </Group>
                          <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="red"
                            onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                          >
                            <IconX size={14} />
                          </ActionIcon>
                        </Group>
                      ))}
                    </Stack>
                  </Card>
                )}

                <Text size="sm" c="dimmed">
                  Supported formats: PDF, DOC, DOCX, TXT. Maximum file size: 5MB
                  per file.
                </Text>
              </Stack>
            </Stepper.Step>

            <Stepper.Completed>
              <Stack gap="md" mt="xl" align="center">
                <IconCheck size={48} color="green" />
                <Title order={3}>Contract Ready!</Title>
                <Text ta="center" c="dimmed">
                  Your contract has been created and is ready for review. It
                  will be sent to the appropriate approvers based on your
                  workflow settings.
                </Text>
              </Stack>
            </Stepper.Completed>
          </Stepper>

          <Group justify="space-between" mt="xl">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={active === 0}
            >
              Back
            </Button>

            {active < 2 ? (
              <Button onClick={nextStep}>Next Step</Button>
            ) : active === 2 ? (
              <Button
                onClick={handleSubmit}
                loading={loading}
                leftSection={<IconCheck size={16} />}
              >
                Create Contract
              </Button>
            ) : (
              <Button component={Link} href="/application/contracts">
                View Contracts
              </Button>
            )}
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}
