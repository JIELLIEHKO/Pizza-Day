import { ChangeEvent, forwardRef, FocusEvent } from 'react'

interface InputProps {
	type: string,
	value: string | boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

export const Input =
	forwardRef<HTMLInputElement, InputProps>(
		({ type, value, onChange, onBlur, placeholder }, ref) => {
			return (
				<input
					ref={ref}
					type={type}
					value={type !== 'checkbox' ? value as string : undefined}
					onChange={onChange}
					placeholder={placeholder}
					onBlur={onBlur}
				/>
			)
		}
	)

Input.displayName = 'Input'