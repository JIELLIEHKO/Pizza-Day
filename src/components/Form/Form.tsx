import { Input } from '../Input/Input.tsx'
import { ChangeEvent, FC } from 'react'

interface FormProps {
	classForm?: string,
	placeholder: string,
	value: string,
	type: string,
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onClick: () => void;
	name: string;
}

export const Form: FC<FormProps> = ({ classForm, type, placeholder, value, onChange, name}) => {
	return (
		<>
			<form className={classForm ? classForm : undefined}>
				<Input type={type} placeholder={placeholder}  value={value} onChange={onChange} name={name}/>
			</form>
		</>
	)
}


