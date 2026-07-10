type Props = {
  index: string
  name: string
  side?: 'left' | 'right'
}

/** セクション横のラベル列。「(01) VISION」＋大きな番号。モバイルでは横並びの帯になる。 */
export function SectionLabel({ index, name, side = 'left' }: Props) {
  return (
    <div
      className={`flex flex-col justify-between gap-[120px] px-8 py-16 max-md:flex-row max-md:items-center max-md:justify-between max-md:gap-4 max-md:border-b max-md:px-5 max-md:py-4 ${
        side === 'left'
          ? 'border-r border-foreground max-md:border-r-0'
          : 'border-l border-foreground max-md:order-first max-md:border-l-0'
      }`}
    >
      <div className='font-mono text-xs font-medium tracking-[0.14em]'>
        ({index}) {name}
      </div>
      <div className='font-display text-[96px] font-bold leading-none text-pale max-md:text-[40px]'>
        {index}
      </div>
    </div>
  )
}
