import Link from 'next/link'

import { cxx } from '@jk2908/cxx'

import { Title } from '#/ui/title'
import { BlockButton } from '#/ui/block-button'

const [css, styles, href] = cxx`
  .not-found {
    margin-inline: auto;
    max-inline-size: 50ch;
    text-align: center;
    text-wrap: balance;
  }

  .cta {
    display: block;
    margin-block-start: var(--space-8x);
    margin-inline: auto;
  }
`

export default function NotFound() {
  return (
    <>
      <Title prefix="Page not found" />

      <p className={styles['not-found']}>
        You&apos;ve accessed a non-existent page! 😢
      </p>

      <BlockButton as={Link} href="/" className={styles.cta}>
        Go back home
      </BlockButton>

      <style href={href} precedence="medium">
        {css}
      </style>
    </>
  )
}