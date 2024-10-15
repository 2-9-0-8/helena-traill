'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'
import mergeRefs from 'merge-refs'

import { GradientMask } from '#/ui/gradient-mask'

const [css, styles, href] = cxx`
	.scrollable {
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
	bgColour,
	scrollbars,
	mode = 'manual',
	speed = 1500 / 60,
	wait,
	className,
	style,
	wrapperRef: extWrapperRef,
	scrollRef: extScrollRef,
	onScrollChange,
	...rest
}: {
	children: React.ReactNode
	bgColour: string
	scrollbars?: { thumb: string; track: string; width: 'thin' | 'auto' }
	mode?: 'auto' | 'manual'
	speed?: number
	wait?: number
	wrapperRef?: React.RefObject<HTMLDivElement | null>
	scrollRef?: React.RefObject<HTMLDivElement | null>
	onScrollChange?: (el: HTMLElement) => void
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

		onScrollChange?.(el)
		
		setLeftEdgeVisible(scrollLeft > 0)
		setRightEdgeVisible(Math.ceil(scrollLeft) < scrollWidth - clientWidth)
	}, [onScrollChange])

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
		<div
			ref={mergeRefs(extWrapperRef, wrapperRef)}
			className={clsx(styles.scrollable, className)}
			{...rest}
		>
			<GradientMask isVisible={isLeftEdgeVisible} colour={bgColour} />

			<div
				ref={mergeRefs(extScrollRef, scrollRef)}
				onScroll={onScroll}
				onMouseEnter={pause}
				onMouseLeave={play}
				style={{
					scrollbarColor: `${scrollbars?.thumb} ${scrollbars?.track}`,
					scrollbarWidth: scrollbars?.width,
					...style
				}}
			>
				{children}
			</div>

			<GradientMask isVisible={isRightEdgeVisible} toMirrored colour={bgColour} />

			<style href={href} precedence="medium">
				{css}
			</style>
		</div>
	)
}
