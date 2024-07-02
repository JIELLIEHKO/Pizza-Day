import { ChangeEvent, FC, useState } from 'react'
import FormLogin from '../components/Form/FormLogin';
import { Header } from '../components/Header';

const Login: FC = () => {
	const [value, setValue] = useState<string>(''); // определение значения для value

	return (
		<>
			<Header />
			<main className='main'>
				<div className='hero'>
					<h1 className='title'>
						The best pizza.
						<br />
						<span className='text-yellow'>
              Straight out of the oven, straight to you.
            </span>
					</h1>
					<p className='sub-title'>
						👋 Welcome! Please start by telling us your name:
					</p>

					{/* Пропсы для FormLogin */}
					<FormLogin
						type='name'
						placeholder='Your full name'
						classForm='login-form'
						value={value}
						onChange={(e: ChangeEvent<HTMLInputElement> ) => setValue(e.target.value)} // обработчик изменения значения
					/>
				</div>
			</main>
		</>
	);
};

export default Login;