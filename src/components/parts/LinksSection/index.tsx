import { chakra } from '@chakra-ui/react'

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
          fontFamily={`'Zen Kaku Gothic New', sans-serif`}
        >
          /
        </chakra.span>
      )}
      <chakra.a
        href={path}
        target='_blank'
        fontSize='16px'
        textDecoration='underline'
        fontFamily={`'Zen Kaku Gothic New', sans-serif`}
      >
        {name}
      </chakra.a>
    </chakra.span>
  )
}
