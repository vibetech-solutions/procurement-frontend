"use client"

import { notifications } from "@/lib/utils/constants"
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Badge,
  TextInput,
  Select,
  Paper,
  ActionIcon,
} from "@mantine/core"
import { 
  IconSearch, 
  IconCheck, 
  IconAlertCircle, 
  IconInfoCircle, 
  IconExclamationMark,
  IconTrash,
  IconMail,
  IconMailOpened,
} from "@tabler/icons-react"
import { useState } from "react"

function getNotificationIcon(type: string) {
  switch (type) {
    case 'success': return <IconCheck size={20} color="var(--mantine-color-green-6)" />
    case 'warning': return <IconExclamationMark size={20} color="var(--mantine-color-yellow-6)" />
    case 'error': return <IconAlertCircle size={20} color="var(--mantine-color-red-6)" />
    default: return <IconInfoCircle size={20} color="var(--mantine-color-blue-6)" />
  }
}

function getNotificationColor(type: string) {
  switch (type) {
    case 'success': return 'green'
    case 'warning': return 'yellow'
    case 'error': return 'red'
    default: return 'blue'
  }
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All")
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "Unread") return !notification.read
    if (filter === "Read") return notification.read
    return true
  })

  const handleMarkAsRead = (id: string) => {
    console.log('Mark as read:', id)
  }

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read')
  }

  const handleDelete = (id: string) => {
    console.log('Delete notification:', id)
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} mb="xs">
            Notifications
          </Title>
          <Text c="dimmed" size="sm">
            Stay updated with your procurement activities
          </Text>
        </div>
        <Button onClick={handleMarkAllAsRead} variant="light">
          Mark All as Read
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search notifications..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Filter"
            data={["All", "Unread", "Read"]}
            value={filter}
            onChange={(value) => setFilter(value || "All")}
            w={120}
          />
          <Select
            placeholder="Type"
            data={["All", "Success", "Warning", "Error", "Info"]}
            w={120}
          />
        </Group>

        <Stack gap="sm">
          {filteredNotifications.map((notification) => (
            <Paper 
              key={notification.id} 
              p="md" 
              withBorder
              style={{ 
                backgroundColor: notification.read ? 'transparent' : 'var(--mantine-color-blue-0)',
                borderLeft: `4px solid var(--mantine-color-${getNotificationColor(notification.type)}-6)`
              }}
            >
              <Group justify="space-between" wrap="nowrap">
                <Group gap="md" style={{ flex: 1 }}>
                  {getNotificationIcon(notification.type)}
                  <div style={{ flex: 1 }}>
                    <Group gap="xs" mb="xs">
                      <Text fw={600} size="sm">
                        {notification.title}
                      </Text>
                      <Badge 
                        size="xs" 
                        variant="light" 
                        color={getNotificationColor(notification.type)}
                      >
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <Badge size="xs" color="blue">
                          New
                        </Badge>
                      )}
                    </Group>
                    <Text size="sm" c="dimmed" mb="xs">
                      {notification.message}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {notification.time}
                    </Text>
                  </div>
                </Group>
                
                <Group gap="xs">
                  {!notification.read && (
                    <ActionIcon 
                      variant="subtle" 
                      color="blue"
                      onClick={() => handleMarkAsRead(notification.id)}
                      title="Mark as read"
                    >
                      <IconMailOpened size={16} />
                    </ActionIcon>
                  )}
                  <ActionIcon 
                    variant="subtle" 
                    color="red"
                    onClick={() => handleDelete(notification.id)}
                    title="Delete notification"
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>
            </Paper>
          ))}
          
          {filteredNotifications.length === 0 && (
            <Paper p="xl" withBorder ta="center">
              <IconMail size={48} stroke={1} color="var(--mantine-color-gray-5)" />
              <Text size="lg" fw={500} mt="md" c="dimmed">
                No notifications found
              </Text>
              <Text size="sm" c="dimmed">
                {filter === "Unread" ? "All notifications have been read" : "You're all caught up!"}
              </Text>
            </Paper>
          )}
        </Stack>
      </Card>
    </Stack>
  )
}