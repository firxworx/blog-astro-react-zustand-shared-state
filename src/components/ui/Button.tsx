import { cn } from '@/helpers/style'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ type, className, children, ...restProps }: ButtonProps): JSX.Element {
  return (
    <button type={type ?? 'button'} className={cn('button', className)} {...restProps}>
      {children}
    </button>
  )
}
