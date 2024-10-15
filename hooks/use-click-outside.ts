import { useEffect } from 'react'

export function useClickOutside(
	ref: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement | null>[],
	onClick: (e: MouseEvent) => void,
	config?: {
		when?: boolean
		dblClick?: boolean
	},
) {
	const { when, dblClick } = config || {}
	const eType = dblClick ? 'dblclick' : 'click'

	useEffect(() => {
		if (when === false) return

		function handler(e: MouseEvent) {
			const target = e.target as HTMLElement
			const refs = Array.isArray(ref) ? ref : [ref]

			if (!refs.some(r => r.current?.contains(target) || target === r.current)) {
				onClick?.(e)
			}
		}

		document.addEventListener(eType, handler)

		return () => {
			document.removeEventListener(eType, handler)
		}
	}, [ref, onClick, when, eType])
}
