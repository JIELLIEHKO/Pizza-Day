import { NavLink } from 'react-router-dom'
import { FC, useState } from 'react'
import { useAppSelector } from '../app/hooks.ts'
import { RootState } from '../redux/store.ts'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Basket from './Basket/Basket.tsx'
import { Drawer, IconButton } from '@mui/material'


export const Header: FC = () => {
	const [isBasketOpen, setIsBasketOpen] = useState(false);
	const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)

	console.log("CartItems >>> ",cartItems)

	const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);

	const toggleBasket = () => {
		setIsBasketOpen(!isBasketOpen);
	};

	return (
		<>
			<header className='header'>
				<NavLink to='/' className='logo'>
					Pizza Day
				</NavLink>
				<IconButton onClick={toggleBasket} style={{ marginRight: '3rem' }}>
					<ShoppingBasketIcon />
					<p style={{margin: '0'}}>({totalQty})</p>
				</IconButton>
			</header>

			<Drawer anchor='right' open={isBasketOpen} onClose={toggleBasket}>
				<Basket />
			</Drawer>
		</>
	)
}
