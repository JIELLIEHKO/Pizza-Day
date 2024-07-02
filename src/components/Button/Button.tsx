import { FC, MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
	children: ReactNode,
	onClick: MouseEventHandler<HTMLButtonElement>,
	isActive: boolean,
	type: string
}

export const Button: FC<ButtonProps> = ({ children, onClick, isActive,  }) => {
	return (
		<>
			<button
				className={isActive ? 'button active' : 'button'}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	)
}

