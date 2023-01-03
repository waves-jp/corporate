import { chakra, Heading, Image } from '@chakra-ui/react'

export const Header: React.FC = () => {
  return (
    <chakra.header>
      <Heading
        as='h1'
        fontSize='32px'
        pb='40px'
        borderBottom='1px solid #8B8B8B'
        fontFamily='StereoGothic-550'
      >
        <Image src='/images/header-logo.png' alt='' w={205} />
      </Heading>
    </chakra.header>
  )
}
