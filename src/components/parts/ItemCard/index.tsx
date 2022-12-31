import { Box, Text, Stack } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import { User } from '@/services/user'

type Props = {} & User & BoxProps

export const ItemCard: React.FC<Props> = ({
  userId,
  title,
  maxW = 350,
  p = 16,
  borderRadius = 1,
  ...rest
}) => {
  return (
    <Box maxW={maxW} p={p} borderRadius={borderRadius} {...rest}>
      <Stack spacing={8}>
        <Text as='span'>User ID : {userId}</Text>
        <Text as='span'>Title : {title}</Text>
      </Stack>
    </Box>
  )
}
