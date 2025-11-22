"use client"

import { Container, Title, Text, Button, Stack, Box } from "@mantine/core"
import { IconHome, IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))' }}>
      <Box style={{ position: 'absolute', top: 20, right: 20 }}>
        <ThemeToggle />
      </Box>
      <Container size="sm" py={80}>
        <Stack gap="xl" align="center" ta="center">
          <div>
            <Title order={1} size="6rem" fw={900}>
              404
            </Title>
            <Title order={2} size="2rem" mt="md">
              Page Not Found
            </Title>
            <Text size="lg" c="dimmed" mt="md">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </Text>
          </div>
          
          <Stack gap="md">
            <Button component={Link} href="/" leftSection={<IconHome size={16} />} size="lg">
              Go Home
            </Button>
            <Button component={Link} href="javascript:history.back()" variant="outline" leftSection={<IconArrowLeft size={16} />}>
              Go Back
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}