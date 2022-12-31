import { Button, ButtonProps } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'

type Props = {} & LinkProps & ButtonProps

export const LinkButton: React.FC<Props> = ({
  children,
  href,
  variant = 'solid',
  ...rest
}) => {
  return (
    <Link href={href} passHref>
      <Button variant={variant} {...rest}>
        {children}
      </Button>
    </Link>
  )
}
