import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { ItemCard } from '.'

export default { component: ItemCard } as ComponentMeta<typeof ItemCard>

export const Primary: ComponentStoryObj<typeof ItemCard> = {
  args: {
    userId: 1,
    title: 'foo',
  },
}
