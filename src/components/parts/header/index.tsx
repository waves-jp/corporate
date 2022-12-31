import { chakra, Heading } from '@chakra-ui/react'

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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='205'
          height='37'
          viewBox='0 0 205 37'
        >
          <g transform='translate(-283 -1451)'>
            <text transform='translate(337 1481)' fill='#fff' font-size='24'>
              <tspan x='0' y='0'>
                WAVES
              </tspan>
            </text>
            <g transform='translate(282.6 1450.94)'>
              <path
                d='M18.943.06v37L.4,11.618l15.344,15.9Z'
                transform='translate(0 0)'
                fill='#fff'
              />
              <path
                d='M92.92.06v37l18.541-25.442-15.342,15.9Z'
                transform='translate(-71.454 0)'
                fill='#fff'
              />
            </g>
          </g>
        </svg>
      </Heading>
    </chakra.header>
  )
}
