'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

import { GradientMask } from '#/ui/gradient-mask'

const [css, styles, href] = cxx`
	.scrollable {
		overflow-x: auto;
		position: relative;

		> div {
			display: flex;
			overflow-x: auto;
			white-space: nowrap;
		}
	}
`

export function Scrollable({
	children,
	mode = 'manual',
	speed = 1500 / 60,
	wait,
	className,
	...rest
}: {
	children: React.ReactNode
	mode?: 'auto' | 'manual'
	speed?: number
	wait?: number
} & React.ComponentPropsWithRef<'div'>) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const scrollRef = useRef<HTMLDivElement>(null)
	const resizeRef = useRef<ResizeObserver | null>(null)
	const vRef = useRef(0)
	const dRef = useRef(1)

	const [isLeftEdgeVisible, setLeftEdgeVisible] = useState(false)
	const [isRightEdgeVisible, setRightEdgeVisible] = useState(false)
	const [isPaused, setPaused] = useState<boolean>()

	const onScroll = useCallback(() => {
		const el = scrollRef.current

		if (!el) return

		const { scrollLeft, scrollWidth, clientWidth } = el

		setLeftEdgeVisible(scrollLeft > 0)
		setRightEdgeVisible(Math.ceil(scrollLeft) < scrollWidth - clientWidth)
	}, [])

	useEffect(() => {
		const el = scrollRef.current

		if (!el) return

		resizeRef.current = new ResizeObserver(onScroll)
		resizeRef.current.observe(el)

		onScroll()

		return () => {
			resizeRef.current?.unobserve(el)
			resizeRef.current = null
		}
	}, [onScroll])

	useEffect(() => {
		if (mode !== 'auto') return

		const interval = setInterval(() => {
			const el = scrollRef.current
			const v = vRef.current
			const d = dRef.current

			if (!el || isPaused) return

			const { scrollWidth, clientWidth, scrollLeft } = el
			const isStart = scrollLeft === 0
			const isEnd = Math.ceil(scrollLeft + clientWidth) === scrollWidth

			if (scrollWidth <= clientWidth) return

			const move = () => {
				el.scrollLeft = v
				vRef.current = v + d
				dRef.current = scrollLeft === 0 ? 1 : isEnd ? -1 : d
			}

			if (wait && !isPaused && (isStart || isEnd)) {
				setPaused(true)

				setTimeout(() => {
					setPaused(false)
					move()
				}, wait)

				return
			}

			move()
		}, speed)

		return () => clearInterval(interval)
	}, [mode, wait, isPaused, speed])

	const play = () => setPaused(false)
	const pause = () => setPaused(true)

	return (
		<div className={clsx(styles.scrollable, className)} ref={wrapperRef} {...rest}>
			<GradientMask isVisible={isLeftEdgeVisible} colour="rgb(var(--app-bg) / 100%)" />

			<div ref={scrollRef} onScroll={onScroll} onMouseEnter={pause} onMouseLeave={play}>
				{children}
			</div>

			<GradientMask isVisible={isRightEdgeVisible} toMirrored colour="rgb(var(--app-bg) / 100%)" />

			<style href={href} precedence="medium">
				{css}
			</style>
		</div>
	)
}
