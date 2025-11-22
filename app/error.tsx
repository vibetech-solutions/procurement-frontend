"use client"

import { Container, Title, Text, Button, Stack, Box, Alert } from "@mantine/core"
import { IconRefresh, IconHome, IconAlertTriangle } from "@tabler/icons-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))' }}>
      <Box style={{ position: 'absolute', top: 20, right: 20 }}>
        <ThemeToggle />
      </Box>
      <Container size="sm" py={80}>
        <Stack gap="xl" align="center" ta="center">
          <div>
            <IconAlertTriangle size={80} color="var(--mantine-color-red-6)" />
            <Title order={1} size="3rem" fw={900} mt="md">
              Something went wrong!
            </Title>
            <Text size="lg" c="dimmed" mt="md">
              An unexpected error occurred. Please try again.
            </Text>
          </div>

          {error.message && (
            <Alert color="red" title="Error Details" maw={500}>
              {error.message}
            </Alert>
          )}
          
          <Stack gap="md">
            <Button onClick={reset} leftSection={<IconRefresh size={16} />} size="lg">
              Try Again
            </Button>
            <Button component={Link} href="/" variant="outline" leftSection={<IconHome size={16} />}>
              Go Home
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}