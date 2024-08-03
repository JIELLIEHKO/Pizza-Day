import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Input } from '../Input/Input.tsx'

interface FormOrderProps {
	control: any,
	errors: any,
	name: string,
	type: string,
	children: string,
}


const FormOrder: FC<FormOrderProps> = ({ control, errors, name, type, children }) => {
	return (
		<>
			<div>
				<label htmlFor={name}>{children}</label>
				<Controller
					control={control}
					name={name}
					render={({ field }) =>
						<Input
							{...field}
							type={type}
							placeholder=""
							autoComplete={name}
						/>
				}
				/>
			</div>

			<div className="order-error">
				{errors.name && <p>{errors.name.message}</p>}
			</div>
		</>
	)
}

export default FormOrder
