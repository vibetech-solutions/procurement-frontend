"use client";

import {
  Card,
  Stack,
  Group,
  Skeleton,
  Grid,
  Tabs,
} from "@mantine/core";
import { ContentContainer } from "../layout/content-container";

export function ProfileSkeleton() {
  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Skeleton height={32} width={150} mb="xs" />
            <Skeleton height={16} width={300} />
          </div>
        </Group>

        <Tabs value="profile">
          <Tabs.List>
            <Skeleton height={40} width={80} mr="md" />
            <Skeleton height={40} width={80} mr="md" />
            <Skeleton height={40} width={100} mr="md" />
            <Skeleton height={40} width={80} />
          </Tabs.List>

          <Tabs.Panel value="profile" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack align="center" gap="md">
                    <Skeleton height={120} width={120} radius="xl" />
                    <div style={{ textAlign: "center" }}>
                      <Skeleton height={24} width={150} mb="xs" />
                      <Skeleton height={20} width={80} />
                    </div>
                    <Skeleton height={32} width={120} />
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="md">
                    <Skeleton height={24} width={180} />
                    <Skeleton height={32} width={32} />
                  </Group>

                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Skeleton height={16} width={80} mb="xs" />
                      <Skeleton height={36} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Skeleton height={16} width={80} mb="xs" />
                      <Skeleton height={36} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Skeleton height={16} width={80} mb="xs" />
                      <Skeleton height={36} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Skeleton height={16} width={80} mb="xs" />
                      <Skeleton height={36} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Skeleton height={16} width={80} mb="xs" />
                      <Skeleton height={36} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Skeleton height={16} width={80} mb="xs" />
                      <Skeleton height={36} />
                    </Grid.Col>
                  </Grid>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </ContentContainer>
  );
}