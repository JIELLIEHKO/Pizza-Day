import { ChangeEvent, FC, useContext, useState } from 'react'
import { Input } from '../Input/Input.tsx'
import { Button }from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

interface FormLoginProps {
	classForm: string,
	type: string
	placeholder: string,
	value: string,
	onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const FormLogin: FC<FormLoginProps> = (
	{ classForm, type, placeholder}
) => {
	const navigate = useNavigate()
	const [userName, setUserName] = useState<string>('')

	const data = useContext(UserContext)

	const handleChange =  (event: ChangeEvent<HTMLInputElement>) => {
		setUserName(event.target.value)
	}

	const handleClick = () => {
		if (data) {
			data.setUser(userName)
			navigate('/menu')
		}
	}

	return (
		<>
			<form className={classForm}>
				<Input type={type} placeholder={placeholder} onChange={handleChange}  value={userName}/>

				<Button isActive={true} onClick={handleClick} type={type}>
					Login
				</Button>
			</form>
		</>
	)
}

export default FormLogin;