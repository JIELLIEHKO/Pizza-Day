import { ChangeEvent, forwardRef, FocusEvent } from 'react'

interface InputProps {
	type: string,
	value: string | boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	placeholder?: string;
	autoComplete?: string;
}

export const Input =
	forwardRef<HTMLInputElement, InputProps>(
		({ type, value, onChange, onBlur, placeholder, autoComplete }, ref) => {

			return (
				<input
					ref={ref}
					type={type}
					value={type !== 'checkbox' ? value as string : undefined}
					onChange={onChange}
					placeholder={placeholder}
					onBlur={onBlur}
					autoComplete={autoComplete}
				/>
			)
		}
	)

Input.displayName = 'Input'