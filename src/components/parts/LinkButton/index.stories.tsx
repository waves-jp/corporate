import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { LinkButton } from '.'

type StoryMeta = ComponentMeta<typeof LinkButton>
type StoryObj = ComponentStoryObj<typeof LinkButton>

export default { component: LinkButton } as StoryMeta

export const Index: StoryObj = {
  args: {
    href: '/',
    children: 'LinkButton',
  },
}
