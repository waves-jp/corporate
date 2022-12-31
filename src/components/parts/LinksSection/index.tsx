import { Box, chakra, HStack } from '@chakra-ui/react'

type Props = {
  name: string
  path: string
  hideSeparate: boolean
}

export const LinksSection: React.FC<Props> = ({ name, path, hideSeparate }) => {
  return (
    <chakra.span>
      {hideSeparate || (
        <chakra.span
          mx='5px'
          textDecoration='none'
          userSelect='none'
          pointerEvents='none'
        >
          /
        </chakra.span>
      )}
      <chakra.a
        href={path}
        target='_blank'
        fontSize='16px'
        textDecoration='underline'
      >
        {name}
      </chakra.a>
    </chakra.span>
  )
}
