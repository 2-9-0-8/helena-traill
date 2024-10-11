import { clsx } from 'clsx'

export function GradientMask({
	colour,
	isVisible,
	toMirrored,
  width = 20,
	className,
	...rest
}: {
	colour: string
	isVisible?: boolean
	toMirrored?: boolean
  width?: number
} & React.ComponentPropsWithRef<'div'>) {
	return (
		<div
			className={clsx(className)}
			style={{
				background: `linear-gradient(${toMirrored ? 'to left' : 'to right'}, ${colour} 0%, transparent 100%)`,
				inlineSize: `${width}px`,
				insetBlock: '0px',
				insetInlineStart: !toMirrored ? '0px' : 'auto',
				insetInlineEnd: !toMirrored ? 'auto' : '0px',
				opacity: isVisible ? 1 : 0,
        pointerEvents: 'none',
				position: 'absolute',
				transition: 'opacity 100ms',
				zIndex: 10,
			}}
			aria-hidden="true"
			{...rest}
		/>
	)
}
