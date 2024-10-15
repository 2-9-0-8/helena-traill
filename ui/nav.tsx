'use client'

import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

import { useFocusScope } from '#/hooks/use-focus-scope'
import { useKey } from '#/hooks/use-key'
import { useMediaQuery } from '#/hooks/use-media-query'

import { BlockButton } from '#/ui/block-button'
import { Icon } from '#/ui/icon'

import type { GetLayoutQuery } from '#/__generated__/graphql'
import { useClickOutside } from '#/hooks/use-click-outside'

const [css, styles, href] = cxx`
	.nav {
		background-color: rgb(var(--neutral-950) / 100%);
		inset: 0px;
		pointer-events: none;
		position: fixed;
		transition: translate 300ms cubic-bezier(0.4, 0, 0.2, 1);
		translate: 100%;
		z-index: 20;

		&[data-state=open] {
			pointer-events: auto;
			translate: 0px;
		}

		@media (width >= 720px) {
			background-color: transparent;
			display: block;
			inset: auto;
			pointer-events: auto;
			position: static;
			translate: 0px;
			z-index: auto;
		}

    > ul {
			display: flex;
			flex-direction: column;
		  list-style-type: none;
			gap: var(--space-5x);
			padding-block: var(--space-5x);
			padding-inline: var(--space-5x);

			@media (width >= 720px) {
				flex-direction: row;
				padding-block: 0px;
				padding-inline: 0px;
			}
		}
  }

  .link {
		color: rgb(var(--white) / 100%);
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;

		@media (width >= 720px) {
			color: rgb(var(--app-fg) / 100%);
		}
  }

	.hamburger {
		padding-block: var(--space-2x);
		padding-inline: var(--space-2x);
	
		@media (width >= 720px) {
			display: none;
		}
	}

	.close {
		inset-block-start: var(--space-5x);
		inset-inline-end: var(--space-5x);
		position: absolute;
	}
`

export function Nav({
	items,
	...rest
}: { items: GetLayoutQuery['primaryMenuItems'] } & React.ComponentPropsWithRef<'nav'>) {
	const navRef = useRef<HTMLDivElement>(null)
	const openRef = useRef<HTMLButtonElement>(null)
	const closeRef = useRef<HTMLButtonElement>(null)

	const [isOpen, setOpen] = useState(false)
	const mq = useMediaQuery('(width >= 720px)')
	const pathname = usePathname()

	useClickOutside(navRef, () => setOpen(false), { when: isOpen && !mq })
	useFocusScope(navRef, { when: isOpen && !mq })

	useKey(
		'Escape',
		() => {
			flushSync(() => {
				setOpen(false)
			})

			openRef.current?.focus()
		},
		{
			when: isOpen && !mq,
		},
	)

	return (
		<nav {...rest}>
			{!mq && (
				<BlockButton
					ref={openRef}
					onClick={() => {
						flushSync(() => {
							setOpen(true)
						})

						closeRef.current?.focus()
					}}
					aria-expanded={isOpen}
					className={clsx(styles.open, styles.hamburger)}
				>
					<Icon name="hamburger" title="Open" size={24} />
					<span className="sr-only">Open menu</span>
				</BlockButton>
			)}

			<div
				ref={navRef}
				className={styles.nav}
				data-state={!mq ? (isOpen ? 'open' : 'closed') : undefined}
				inert={!mq ? !isOpen : undefined}
			>
				{!mq && (
					<BlockButton
						ref={closeRef}
						onClick={() => setOpen(false)}
						autoFocus
						className={clsx(styles.close, styles.hamburger)}
					>
						<Icon name="x" title="Close" size={24} />
						<span className="sr-only">Close menu</span>
					</BlockButton>
				)}

				<ul>
					{items?.nodes.map(
						({ uri, label, id }) =>
							uri && (
								<li key={id}>
									<Link
										onClick={() => {
											setOpen(false)
										}}
										href={uri}
										className={styles.link}
										aria-current={pathname === uri ? 'page' : false}
									>
										{label}
									</Link>
								</li>
							),
					)}
				</ul>
			</div>

			<style href={href} precedence="medium">
				{css}
			</style>
		</nav>
	)
}
