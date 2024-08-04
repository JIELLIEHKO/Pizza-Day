import { FC, MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
	children: ReactNode,
	onClick: MouseEventHandler<HTMLButtonElement>,
	isActive: boolean,
	type: any;
}

export const Button: FC<ButtonProps> = ({ children, onClick, isActive, type }) => {
	return (
		<>
			<button
				className={isActive ? 'button active' : 'button'}
				onClick={onClick}
				type={type}
			>
				{children}
			</button>
		</>
	)
}

