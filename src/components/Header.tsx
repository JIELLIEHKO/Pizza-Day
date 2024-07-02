import { Form } from './Form/Form.tsx'
import { NavLink } from 'react-router-dom'
import { ChangeEvent, FC, useState } from 'react'

export const Header: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleSearchClick = () => {
		// Логика для поиска заказа
	}

	return (
		<>
			<header className='header'>
				<a className='logo' href='/src/pages/Login'>
					Pizza Day
				</a>

				<nav className='nav'>
					<NavLink to='/' style={{ marginRight: '1rem' }}>
						Login
					</NavLink>
					<NavLink to='/menu' style={{ marginRight: '1rem' }}>
						Menu
					</NavLink>
					<NavLink to='/order/new'>
						Order
					</NavLink>
				</nav>

				<Form
					type='name'
					placeholder='Search for the order #'
					classForm={undefined}
					value={searchValue}
					onChange={handleInputChange}
					onClick={handleSearchClick}
				/>
			</header>
		</>
	)
}
