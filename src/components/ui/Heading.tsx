import { cn } from '@/helpers/style'
import type React from 'react'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({ as = 'h2', className, children, ...restProps }: HeadingProps): JSX.Element {
  const Comp = as

  return (
    <Comp
      className={cn(
        'font-bold',
        {
          'text-3xl': as === 'h1',
          'text-2xl': as === 'h2',
          'text-xl': as === 'h3',
          'text-lg': as === 'h4',
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </Comp>
  )
}
