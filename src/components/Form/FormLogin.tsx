import { FC, useContext } from 'react';
import { Input } from '../Input/Input.tsx';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormLoginProps {
	classForm: string;
	type: string;
	placeholder: string;
}

const FormLogin: FC<FormLoginProps> = ({ classForm, type, placeholder }) => {
	const navigate = useNavigate();
	const data = useContext(UserContext);

	const formSchema = Yup.object().shape({
		username: Yup.string().required('Поле не должно быть пустым'),
	});

	const formik = useFormik({
		initialValues: {
			username: '',
		},
		validationSchema: formSchema,
		onSubmit: (values) => {
			if (data) {
				data.setUser(values.username);
				navigate('/menu');
			}
		},
	});

	return (
		<form className={classForm} onSubmit={formik.handleSubmit} autoComplete="on">
			<div>
				<Input
					type={type}
					placeholder={placeholder}
					name="username"
					autoComplete="username"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
				/>
				<Button isActive={true} type="submit" onClick={() => {}}>
					Login
				</Button>
				{formik.touched.username && formik.errors.username ? (
					<div style={{color: 'red'}} className="error">{formik.errors.username}</div>
				) : null}
			</div>
		</form>
	);
};

export default FormLogin;