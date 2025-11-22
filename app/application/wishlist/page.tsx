"use client"

import { wishlistItems } from "@/lib/utils/constants"
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Badge,
  Image,
  Grid,
  ActionIcon,
  TextInput,
  Select,
} from "@mantine/core"
import { 
  IconHeart,
  IconShoppingCart,
  IconTrash,
  IconHeartFilled,
  IconGrid3x3,
  IconList,
  IconSearch,
  IconStar,
} from "@tabler/icons-react"
import { useState } from "react"

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const handleAddToCart = (itemId: string) => {
    console.log('Add to cart:', itemId)
  }

  const handleRemoveFromWishlist = (itemId: string) => {
    console.log('Remove from wishlist:', itemId)
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} mb="xs">
            My Wishlist
          </Title>
          <Text c="dimmed" size="sm">
            Items you&apos;ve saved for future procurement ({wishlistItems.length} items)
          </Text>
        </div>
        <Group gap="xs">
          <Button 
            variant={viewMode === 'grid' ? 'filled' : 'subtle'} 
            size="sm"
            leftSection={<IconGrid3x3 size={16} />}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'filled' : 'subtle'} 
            size="sm"
            leftSection={<IconList size={16} />}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </Group>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="lg" gap="md">
          <TextInput
            placeholder="Search wishlist items..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Category"
            data={["All", "IT Equipment", "Furniture", "Office Supplies"]}
            w={150}
          />
          <Select
            placeholder="Availability"
            data={["All", "In Stock", "Out of Stock"]}
            w={150}
          />
        </Group>

        {wishlistItems.length === 0 ? (
          <Stack align="center" gap="md" py="xl">
            <IconHeart size={64} stroke={1} color="var(--mantine-color-gray-5)" />
            <Title order={3} c="dimmed">Your wishlist is empty</Title>
            <Text c="dimmed" ta="center">
              Browse the catalogue and add items to your wishlist for easy access later
            </Text>
            <Button component="a" href="/application/catalogue">
              Browse Catalogue
            </Button>
          </Stack>
        ) : viewMode === 'grid' ? (
          <Grid gutter="md">
            {wishlistItems.map((item) => (
              <Grid.Col key={item.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <Card shadow="sm" padding={0} radius="md" withBorder h="100%" style={{ overflow: 'hidden' }}>
                  <Card.Section style={{ position: 'relative' }}>
                    <Image
                      src={item.image}
                      height={220}
                      alt={item.name}
                      fallbackSrc="/placeholder.jpg"
                    />
                    <ActionIcon 
                      variant="filled" 
                      color="red"
                      size="lg"
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: 'var(--mantine-color-red-6)'
                      }}
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <IconHeartFilled size={18} />
                    </ActionIcon>
                    {!item.inStock && (
                      <Badge 
                        color="red" 
                        variant="filled"
                        style={{
                          position: 'absolute',
                          top: 12,
                          left: 12
                        }}
                      >
                        Out of Stock
                      </Badge>
                    )}
                  </Card.Section>

                  <Stack gap="sm" p="md">
                    <Badge size="xs" variant="light" w="fit-content">
                      {item.category}
                    </Badge>
                    
                    <Title order={5} lineClamp={2} style={{ minHeight: 40 }}>
                      {item.name}
                    </Title>
                    
                    <Text size="sm" c="dimmed">
                      by {item.supplier}
                    </Text>
                    
                    <Group justify="space-between" align="center">
                      <Text size="xl" fw={700} c="blue">
                        {item.price}
                      </Text>
                      <Group gap={4}>
                        {[1,2,3,4,5].map(star => (
                          <IconStar key={star} size={12} fill="var(--mantine-color-yellow-4)" color="var(--mantine-color-yellow-4)" />
                        ))}
                        <Text size="xs" c="dimmed">(4.5)</Text>
                      </Group>
                    </Group>
                    
                    <Button
                      fullWidth
                      leftSection={<IconShoppingCart size={16} />}
                      onClick={() => handleAddToCart(item.id)}
                      disabled={!item.inStock}
                      variant={item.inStock ? 'filled' : 'outline'}
                    >
                      {item.inStock ? 'Add to Cart' : 'Notify When Available'}
                    </Button>
                    
                    <Text size="xs" c="dimmed" ta="center">
                      Added on {item.addedDate}
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Stack gap="sm">
            {wishlistItems.map((item) => (
              <Card key={item.id} shadow="sm" padding="md" radius="md" withBorder>
                <Group wrap="nowrap" gap="md">
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Group justify="space-between">
                      <Group gap="sm">
                        <Badge size="xs" variant="light">
                          {item.category}
                        </Badge>
                        {!item.inStock && (
                          <Badge color="red" variant="filled" size="xs">
                            Out of Stock
                          </Badge>
                        )}
                      </Group>
                      <Group gap={4}>
                        {[1,2,3,4,5].map(star => (
                          <IconStar key={star} size={12} fill="var(--mantine-color-yellow-4)" color="var(--mantine-color-yellow-4)" />
                        ))}
                        <Text size="xs" c="dimmed">(4.5)</Text>
                      </Group>
                    </Group>
                    
                    <Title order={4}>
                      {item.name}
                    </Title>
                    
                    <Text size="sm" c="dimmed">
                      by {item.supplier}
                    </Text>
                    
                    <Text size="xs" c="dimmed">
                      Added on {item.addedDate}
                    </Text>
                  </Stack>
                  
                  <Stack gap="sm" align="flex-end" style={{ minWidth: 200 }}>
                    <Text size="xl" fw={700} c="blue">
                      {item.price}
                    </Text>
                    
                    <Group gap="xs">
                      <ActionIcon 
                        variant="subtle" 
                        color="red"
                        size="lg"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <IconHeartFilled size={18} />
                      </ActionIcon>
                      
                      <Button
                        leftSection={<IconShoppingCart size={16} />}
                        onClick={() => handleAddToCart(item.id)}
                        disabled={!item.inStock}
                        variant={item.inStock ? 'filled' : 'outline'}
                      >
                        {item.inStock ? 'Add to Cart' : 'Notify Me'}
                      </Button>
                    </Group>
                  </Stack>
                </Group>
              </Card>
            ))}
          </Stack>
        )}
      </Card>

      {wishlistItems.length > 0 && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text fw={600} size="lg">Quick Actions</Text>
              <Text size="sm" c="dimmed">
                Manage your entire wishlist
              </Text>
            </div>
            <Group gap="sm">
              <Button variant="outline" color="red" leftSection={<IconTrash size={16} />}>
                Clear Wishlist
              </Button>
              <Button leftSection={<IconShoppingCart size={16} />} size="md">
                Add All Available to Cart
              </Button>
            </Group>
          </Group>
        </Card>
      )}
    </Stack>
  )
}