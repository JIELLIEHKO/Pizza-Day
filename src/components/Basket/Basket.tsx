import { FC } from 'react'
import { List, Typography, Button, Container } from '@mui/material';
import ItemBasket from './ItemBasket.tsx'
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import { RootState } from '../../redux/store.ts'
import { deleteFromCart } from '../../redux/slices/cartSlice.ts'
import { NavLink } from 'react-router-dom'

const Basket: FC = () => {
	const dispatch = useAppDispatch();
	const {
		cartItems, totalPrice
	} = useAppSelector(
		(state: RootState) => state.cart
	);

	const handleDeleteFromCart = (id: string) => {
		dispatch(deleteFromCart(id));
	};

	return (
		<Container>
			<Typography variant="h4">Basket</Typography>
			{cartItems.length === 0
				?
				<Typography variant="h5">The basket is empty!<br/>
				Add pizza from the menu</Typography>
				:
				<>
					<List>
						{cartItems.map(item => (
							<ItemBasket key={item.id} item={item} price={item.unitPrice} qty={item.qty} onRemove={handleDeleteFromCart} />
						))}
					</List>
					<Typography variant="h6">Total price: ${totalPrice}</Typography>

					<NavLink to='/order/new'>
						<Button variant="contained" color="primary">
							Checkout
						</Button>
					</NavLink>
				</>
			}
		</Container>
	);
};

export default Basket;