
import type { JSX } from 'react'

import { cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

// https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/

const DEFAULT_ELEMENT = 'button'

export type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>> =
  JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type AsProp<C extends React.ElementType> = {
  as?: C
}

export type ExtendableProps<ExtendedProps = Record<string, unknown>, OverrideProps = Record<string, unknown>> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>

export type InheritableElementProps<C extends React.ElementType, Props = Record<string, unknown>> = ExtendableProps<
  PropsOf<C>,
  Props
>
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = Record<string, unknown>,
> = InheritableElementProps<C, Props & AsProp<C>>

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = Record<string, unknown>,
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

export type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info'
  className?: string
}

export type ButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, Props>

const [css, styles, href] = cxx`
  .block-button, :global(.btn) {
    align-items: center;
    background-color: var(--block-button-bg, rgb(var(--primary) / 100%));
    border: 1px solid var(--block-button-bg, rgb(var(--primary) / 100%));
    color: var(--block-button-clr, rgb(var(--white) / 100%));
    display: inline-flex;
    gap: var(--space-4x);
    font-size: var(--text-base);
    font-weight: 700;
    inline-size: max-content;
    padding-block: var(--space-4x);
    padding-inline: var(--space-6x);
    text-decoration: none;
    text-transform: uppercase;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        --block-button-bg: rgb(var(--neutral-950) / 100%);
      }
    }

    &[data-variant='primary'] {
      --block-button-bg: rgb(var(--primary) / 100%);
      --block-button-clr: rgb(var(--white) / 100%);

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          --block-button-bg: rgb(var(--neutral-950) / 100%);
        }
      }
    } 

    &[aria-disabled=true] {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`

export function BlockButton<C extends React.ElementType = typeof DEFAULT_ELEMENT>({
  children,
  ref,
  variant = 'primary',
  className,
  as,
  ...rest
}: ButtonProps<C> & { ref?: PolymorphicRef<C> }) {
  const Cmp = as ?? DEFAULT_ELEMENT

  return (
    <Cmp
      ref={ref}
      data-variant={variant}
      className={clsx(styles['block-button'], 'btn', className)}
      {...rest}>
      {children}

      <style href={href} precedence="medium">
        {css}
      </style>
    </Cmp>
  )
}
