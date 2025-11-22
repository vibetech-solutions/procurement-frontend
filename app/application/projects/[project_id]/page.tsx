"use client";

import { projects, projectTasks, purchaseOrders, projectItemUsage } from "@/lib/utils/constants";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Grid,
  Badge,
  Progress,
  Avatar,
  Divider,
  Paper,
  Table,
  ActionIcon,
  Modal,
  TextInput,
  Textarea,
  Select,
  NumberInput,
} from "@mantine/core";
import { IconArrowLeft, IconCalendar, IconUsers, IconEdit, IconCurrencyDollar, IconPlus, IconCheck, IconClock, IconAlertCircle, IconEye, IconTrash } from "@tabler/icons-react";
import { useState, use } from "react";
import Link from "next/link";

export default function ProjectDetailPage({ params }: { params: Promise<{ project_id: string }> }) {
  const { project_id } = use(params);
  const project = projects.find(p => p.id === project_id) || projects[0];
  const tasks = projectTasks.filter(task => task.projectId === project_id);
  const projectPOs = purchaseOrders.filter(po => po.projectId === project_id);
  const itemUsage = projectItemUsage.filter(usage => usage.projectId === project_id);
  const [selectedTask, setSelectedTask] = useState<typeof projectTasks[0] | null>(null);
  const [taskModalOpened, setTaskModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editTask, setEditTask] = useState<typeof projectTasks[0] | null>(null);
  const [itemUsageModalOpened, setItemUsageModalOpened] = useState(false);
  const [selectedPO, setSelectedPO] = useState<typeof purchaseOrders[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "blue";
      case "Completed": return "green";
      case "Planning": return "yellow";
      default: return "gray";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "green";
      case "In Progress": return "blue";
      case "Pending": return "orange";
      default: return "gray";
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <IconCheck size={16} />;
      case "In Progress": return <IconClock size={16} />;
      case "Pending": return <IconAlertCircle size={16} />;
      default: return null;
    }
  };

  const budgetAmount = parseInt(project.budget.replace(/[^0-9]/g, ''));
  const spentAmount = parseInt(project.spent.replace(/[^0-9]/g, ''));
  const remaining = budgetAmount - spentAmount;
  const spentPercentage = (spentAmount / budgetAmount) * 100;

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Group>
          <Button component={Link} href="/application/projects" variant="subtle" leftSection={<IconArrowLeft size={16} />}>
            Back to Projects
          </Button>
        </Group>
        <Button component={Link} href={`/application/projects/${project_id}/edit`} leftSection={<IconEdit size={16} />}>
          Edit Project
        </Button>
      </Group>

      <div>
        <Group justify="space-between" align="flex-start">
          <div>
            <Title order={2}>{project.name}</Title>
            <Text c="dimmed" size="sm" mt="xs">{project.id}</Text>
          </div>
          <Badge color={getStatusColor(project.status)} variant="light" size="lg">
            {project.status}
          </Badge>
        </Group>
      </div>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Project Overview</Title>
              <Text size="sm" c="dimmed">
                {project.description}
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Tasks ({tasks.length})</Title>
                <Button size="xs" leftSection={<IconPlus size={14} />}>
                  Add Task
                </Button>
              </Group>
              
              {tasks.length > 0 ? (
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Task</Table.Th>
                      <Table.Th>Assignee</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Due Date</Table.Th>
                      <Table.Th>Priority</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {tasks.map((task) => (
                      <Table.Tr key={task.id}>
                        <Table.Td>
                          <div>
                            <Text size="sm" fw={500}>{task.title}</Text>
                            <Text size="xs" c="dimmed" lineClamp={1}>{task.description}</Text>
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <Avatar size={24} radius="xl" color="cyan">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Text size="sm">{task.assignee}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Badge 
                            variant="light" 
                            color={getTaskStatusColor(task.status)}
                            leftSection={getTaskStatusIcon(task.status)}
                          >
                            {task.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{task.dueDate}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge size="sm" variant="dot" color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'blue'}>
                            {task.priority}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon 
                              variant="subtle" 
                              size="sm"
                              onClick={() => {
                                setSelectedTask(task);
                                setTaskModalOpened(true);
                              }}
                            >
                              <IconEye size={16} />
                            </ActionIcon>
                            <ActionIcon 
                              variant="subtle" 
                              size="sm"
                              color="blue"
                              onClick={() => {
                                setEditTask({...task});
                                setEditModalOpened(true);
                              }}
                            >
                              <IconEdit size={16} />
                            </ActionIcon>
                            <ActionIcon 
                              variant="subtle" 
                              size="sm"
                              color="red"
                              onClick={() => {
                                if (confirm('Delete this task?')) {
                                  // Delete logic here
                                }
                              }}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              ) : (
                <Text c="dimmed" ta="center" py="xl">
                  No tasks created yet. Add your first task to get started.
                </Text>
              )}
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Progress</Title>
              <Group justify="space-between" mb="xs">
                <Text size="sm">Overall Progress</Text>
                <Text size="sm" fw={500}>{project.progress}%</Text>
              </Group>
              <Progress value={project.progress} size="lg" />
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Budget Overview</Title>
              <Grid gutter="md">
                <Grid.Col span={4}>
                  <Paper p="md" withBorder>
                    <Group gap="xs" mb="xs">
                      <IconCurrencyDollar size={16} />
                      <Text size="xs" c="dimmed">Total Budget</Text>
                    </Group>
                    <Text size="lg" fw={600}>
                      {project.budget}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Paper p="md" withBorder>
                    <Text size="xs" c="dimmed" mb="xs">Spent</Text>
                    <Text size="lg" fw={600} c="red">
                      {project.spent}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Paper p="md" withBorder>
                    <Text size="xs" c="dimmed" mb="xs">Remaining</Text>
                    <Text size="lg" fw={600} c="green">
                      KES {remaining.toLocaleString()}
                    </Text>
                  </Paper>
                </Grid.Col>
              </Grid>
              <Divider my="md" />
              <Group justify="space-between" mb="xs">
                <Text size="sm">Budget Utilization</Text>
                <Text size="sm" fw={500}>{spentPercentage.toFixed(1)}%</Text>
              </Group>
              <Progress value={spentPercentage} size="sm" color={spentPercentage > 80 ? "red" : "blue"} />
            </Card>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Purchase Orders ({projectPOs.length})</Title>
              {projectPOs.length > 0 ? (
                <Stack gap="xs">
                  {projectPOs.map((po) => (
                    <Paper key={po.id} p="sm" withBorder>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm" fw={500}>{po.id}</Text>
                        <Badge 
                          variant="light" 
                          color={po.status === 'Delivered' ? 'green' : po.status === 'In Transit' ? 'blue' : 'orange'}
                          size="sm"
                        >
                          {po.status}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed" mb="xs">{po.supplier}</Text>
                      <Group justify="space-between">
                        <Text size="sm" fw={500}>{po.amount}</Text>
                        {po.status === 'Delivered' && (
                          <Button 
                            size="xs" 
                            variant="outline"
                            onClick={() => {
                              setSelectedPO(po);
                              setItemUsageModalOpened(true);
                            }}
                          >
                            Track
                          </Button>
                        )}
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Text c="dimmed" ta="center" py="md" size="sm">
                  No purchase orders linked yet.
                </Text>
              )}
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Item Usage ({itemUsage.length})</Title>
              {itemUsage.length > 0 ? (
                <Stack gap="xs">
                  {itemUsage.map((usage) => (
                    <Paper key={usage.id} p="sm" withBorder>
                      <Text size="sm" fw={500} mb="xs">{usage.itemName}</Text>
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">Used: {usage.usedQuantity}/{usage.totalQuantity}</Text>
                        <Text size="xs" c="green">Available: {usage.availableQuantity}</Text>
                      </Group>
                      <Text size="xs" c="dimmed">By: {usage.usedBy}</Text>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Text c="dimmed" ta="center" py="md" size="sm">
                  No items tracked yet.
                </Text>
              )}
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Project Details</Title>
              <Stack gap="md">
                <div>
                  <Group gap="xs" mb="xs">
                    <Avatar size={32} radius="xl" color="cyan">
                      {project.manager.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <div>
                      <Text size="xs" c="dimmed">Project Manager</Text>
                      <Text size="sm" fw={500}>{project.manager}</Text>
                    </div>
                  </Group>
                </div>

                <Divider />

                <Group gap="xs">
                  <IconUsers size={16} />
                  <div>
                    <Text size="xs" c="dimmed">Team Size</Text>
                    <Text size="sm" fw={500}>{project.team} members</Text>
                  </div>
                </Group>

                <Divider />

                <Group gap="xs">
                  <IconCalendar size={16} />
                  <div>
                    <Text size="xs" c="dimmed">Start Date</Text>
                    <Text size="sm" fw={500}>{project.startDate}</Text>
                  </div>
                </Group>

                <Group gap="xs">
                  <IconCalendar size={16} />
                  <div>
                    <Text size="xs" c="dimmed">Deadline</Text>
                    <Text size="sm" fw={500}>{project.endDate}</Text>
                  </div>
                </Group>

                <Divider />

                <div>
                  <Text size="xs" c="dimmed" mb="xs">Task Progress</Text>
                  <Text size="sm" fw={500}>
                    {project.tasksCompleted} of {project.totalTasks} completed
                  </Text>
                  <Progress 
                    value={project.totalTasks > 0 ? (project.tasksCompleted / project.totalTasks) * 100 : 0} 
                    size="sm" 
                    mt="xs"
                  />
                </div>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      <Modal
        opened={taskModalOpened}
        onClose={() => setTaskModalOpened(false)}
        title="Task Details"
        size="md"
      >
        {selectedTask && (
          <Stack gap="md">
            <div>
              <Title order={4}>{selectedTask.title}</Title>
              <Text size="sm" c="dimmed" mt="xs">{selectedTask.id}</Text>
            </div>
            
            <Text>{selectedTask.description}</Text>
            
            <Grid gutter="md">
              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">Assignee</Text>
                <Group gap="xs" mt="xs">
                  <Avatar size={24} radius="xl" color="cyan">
                    {selectedTask.assignee.split(' ').map((n: string) => n[0]).join('')}
                  </Avatar>
                  <Text size="sm">{selectedTask.assignee}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">Status</Text>
                <Badge 
                  variant="light" 
                  color={getTaskStatusColor(selectedTask.status)}
                  leftSection={getTaskStatusIcon(selectedTask.status)}
                  mt="xs"
                >
                  {selectedTask.status}
                </Badge>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">Due Date</Text>
                <Text size="sm" mt="xs">{selectedTask.dueDate}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">Priority</Text>
                <Badge 
                  size="sm" 
                  variant="dot" 
                  color={selectedTask.priority === 'High' ? 'red' : selectedTask.priority === 'Medium' ? 'yellow' : 'blue'}
                  mt="xs"
                >
                  {selectedTask.priority}
                </Badge>
              </Grid.Col>
            </Grid>
            
            <Group justify="flex-end" mt="lg">
              <Button variant="outline" onClick={() => setTaskModalOpened(false)}>
                Close
              </Button>
              <Button 
                color="blue" 
                leftSection={<IconEdit size={16} />}
                onClick={() => {
                  setEditTask({...selectedTask});
                  setTaskModalOpened(false);
                  setEditModalOpened(true);
                }}
              >
                Edit Task
              </Button>
              <Button 
                color="red" 
                leftSection={<IconTrash size={16} />}
                onClick={() => {
                  if (confirm('Delete this task?')) {
                    setTaskModalOpened(false);
                    // Delete logic here
                  }
                }}
              >
                Delete
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Edit Task"
        size="md"
      >
        {editTask && (
          <Stack gap="md">
            <TextInput
              label="Task Title"
              value={editTask.title}
              onChange={(e) => setEditTask({...editTask, title: e.target.value})}
            />
            <Textarea
              label="Description"
              value={editTask.description}
              onChange={(e) => setEditTask({...editTask, description: e.target.value})}
            />
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  label="Assignee"
                  value={editTask.assignee}
                  onChange={(e) => setEditTask({...editTask, assignee: e.target.value})}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Status"
                  value={editTask.status}
                  onChange={(value) => setEditTask({...editTask, status: value || 'Pending'})}
                  data={['Pending', 'In Progress', 'Completed']}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Due Date"
                  value={editTask.dueDate}
                  onChange={(e) => setEditTask({...editTask, dueDate: e.target.value})}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Priority"
                  value={editTask.priority}
                  onChange={(value) => setEditTask({...editTask, priority: value || 'Low'})}
                  data={['Low', 'Medium', 'High']}
                />
              </Grid.Col>
            </Grid>
            <Group justify="flex-end" mt="lg">
              <Button variant="outline" onClick={() => setEditModalOpened(false)}>
                Cancel
              </Button>
              <Button onClick={() => setEditModalOpened(false)}>
                Save Changes
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      <Modal
        opened={itemUsageModalOpened}
        onClose={() => setItemUsageModalOpened(false)}
        title="Track Item Usage"
        size="lg"
      >
        {selectedPO && (
          <Stack gap="md">
            <Text size="sm" c="dimmed">Purchase Order: {selectedPO.id}</Text>
            <Text fw={500}>{selectedPO.title}</Text>
            
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item</Table.Th>
                  <Table.Th>Total Qty</Table.Th>
                  <Table.Th>Mark as Used</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Sample Item</Table.Td>
                  <Table.Td>5</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <NumberInput 
                        placeholder="Qty used" 
                        min={0} 
                        max={5} 
                        size="xs" 
                        w={80}
                      />
                      <Button size="xs">Mark Used</Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
            
            <Group justify="flex-end" mt="lg">
              <Button variant="outline" onClick={() => setItemUsageModalOpened(false)}>
                Close
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}