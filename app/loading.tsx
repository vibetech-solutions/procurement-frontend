"use client"

import { Container, Loader, Stack, Box } from "@mantine/core"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Loading() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))' }}>
      <Box style={{ position: 'absolute', top: 20, right: 20 }}>
        <ThemeToggle />
      </Box>
      <Container size="sm" py={80}>
        <Stack gap="xl" align="center" justify="center" style={{ minHeight: '60vh' }}>
          <Loader size="xl" color="cyan" />
        </Stack>
      </Container>
    </div>
  )
}