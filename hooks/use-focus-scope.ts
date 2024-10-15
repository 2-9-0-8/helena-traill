import { useEffect } from 'react'

import focusableSelectors from 'focusable-selectors'

import { isVisible } from '#/lib/utils'

interface FocusScopeConfig {
	when?: boolean
	roving?: boolean
	toExcludeFromTabIndex?: (HTMLElement | React.RefObject<HTMLElement>)[]
	orientation?: 'horizontal' | 'vertical'
	loop?: boolean
	onTabPress?: (e: KeyboardEvent) => void
}

export function useFocusScope<T extends React.RefObject<HTMLElement | null>>(
	ref: T,
	config?: FocusScopeConfig,
) {
	const {
		when,
		roving = false,
		toExcludeFromTabIndex,
		orientation = 'vertical',
		loop = true,
		onTabPress,
	} = config || {}
	let els: HTMLElement[] = []

	// biome-ignore lint/correctness/useExhaustiveDependencies: fix later
	useEffect(() => {
		const el = ref.current

		if (!el) return

		const getNodes = () =>
			(Array.from(el.querySelectorAll(focusableSelectors.join(', '))) as HTMLElement[]).filter(
				isVisible,
			)

		// eslint-disable-next-line react-hooks/exhaustive-deps
		if (!els.length) els = getNodes()

		const reset = (exclude?: HTMLElement) => {
			const i = toExcludeFromTabIndex?.map(e => (e instanceof HTMLElement ? e : e.current))
			const x = [exclude, ...(i ?? [])].filter(Boolean)

			for (const el of els) {
				if (!x.some(e => e === el)) {
					el.setAttribute('tabindex', '-1')
				}
			}
		}

		const first = els[0]
		const last = els[els.length - 1]

		if (roving) {
			first?.setAttribute('tabindex', '0')
			reset(first)
		}

		if (when === false) return
		if (when) first?.focus()

		function handler(e: KeyboardEvent) {
			const rovingKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
			const allKeys = ['Tab', ...rovingKeys]

			if (!allKeys.includes(e.key)) return

			e.stopPropagation()

			const active = document.activeElement as HTMLElement

			if (els.indexOf(active) === -1) return

			const prev =
				els.indexOf(active) - 1 >= 0
					? els[els.indexOf(active as HTMLElement) - 1]
					: loop
						? last
						: active
			const next =
				els.indexOf(active) + 1 < els.length
					? els[els.indexOf(active as HTMLElement) + 1]
					: loop
						? first
						: active

			switch (true) {
				case orientation === 'vertical' && roving:
					if (e.key === 'ArrowUp') {
						e.preventDefault()
						prev?.setAttribute('tabindex', '0')
						prev?.focus()
						reset(prev)
					} else if (e.key === 'ArrowDown') {
						e.preventDefault()
						next?.setAttribute('tabindex', '0')
						next?.focus()
						reset(next)
					} else if (e.key === 'Tab') {
						onTabPress?.(e)
						reset(els[els.findIndex(e => e === active)])
					}
					break
				case orientation === 'horizontal' && roving:
					if (e.key === 'ArrowLeft') {
						e.preventDefault()
						prev?.setAttribute('tabindex', '0')
						prev?.focus()
						reset(prev)
					} else if (e.key === 'ArrowRight') {
						e.preventDefault()
						next?.setAttribute('tabindex', '0')
						next?.focus()
						reset(next)
					} else if (e.key === 'Tab') {
						onTabPress?.(e)
						reset(els[els.findIndex(e => e === active)])
					}
					break
				case e.key === 'Tab' && roving !== true:
					e.preventDefault()
					e.shiftKey ? prev?.focus() : next?.focus()
					break
				default:
					return
			}
		}

		document.addEventListener('keydown', handler)

		return () => {
			document.removeEventListener('keydown', handler)
		}
	}, [when, ref, roving, orientation, loop])
}
