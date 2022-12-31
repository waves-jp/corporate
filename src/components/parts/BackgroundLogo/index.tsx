import { Box } from '@chakra-ui/react'

export const BackgroundLogo: React.FC = () => {
  return (
    <Box w='100%' h='100%' position='fixed' top='0' left='0'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='526.795'
        height='492.958'
        viewBox='0 0 526.795 492.958'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: 'auto',
        }}
      >
        <g transform='translate(0.004 -0.002)'>
          <path
            d='M246.657.06V491.425L.4,153.547,204.173,364.668Z'
            transform='translate(0 0)'
            fill='rgba(121,121,121,0.21)'
            stroke='#231815'
            stroke-miterlimit='10'
            stroke-width='1'
          />
          <path
            d='M92.92.06V491.425L339.147,153.547,135.4,364.668Z'
            transform='translate(187.24 0)'
            fill='rgba(121,121,121,0.21)'
            stroke='#231815'
            stroke-miterlimit='10'
            stroke-width='1'
          />
        </g>
      </svg>
    </Box>
  )
}
