import { FC } from 'react'
import FormLogin from '../components/Form/FormLogin';
import { Header } from '../components/Header';

const Login: FC = () => {

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
					<FormLogin
						type='name'
						placeholder='Your full name'
						classForm='login-form'
					/>
				</div>
			</main>
		</>
	);
};

export default Login;