import { ChangeEvent, forwardRef, FocusEvent } from 'react'

interface InputProps {
	type: string,
	name: string,
	value: string | boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	placeholder?: string;
	autoComplete?: string;
}

export const Input =
	forwardRef<HTMLInputElement, InputProps>(
		({ name, type, value, onChange, onBlur, placeholder, autoComplete }, ref) => {

			return (
				<input
					ref={ref}
					name={name}
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