import './Menu.css';
import { Button } from '../Button/Button';
import {
	addToCart,
	decrement,
	deleteFromCart,
	increment
} from '../../redux/slices/cartSlice';
import { FC } from 'react';
import { RootState } from '../../redux/store';
import { CartItem, Pizza } from '../../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'

interface MenuItemProps {
	img: string;
	name: string;
	ingredients: string[];
	price: number;
	sold: boolean;
	pizza: Pizza;
}

const MenuItem: FC<MenuItemProps> = (
	{ img,
		name,
		ingredients,
		price,
		sold,
		pizza
}) => {
	const dispatch = useAppDispatch();
	const items = useAppSelector((state: RootState) => state.cart.cartItems);
	const cartItem = items.find((item) => item.id === pizza.id);
	const qty = cartItem ? cartItem.qty : 0;

	const handleDeleteFromCart = (id: string) => {
		dispatch(deleteFromCart(id));
	};

	const handleClickAddOrder = (pizza: CartItem) => {
		dispatch(addToCart(pizza));
	};

	console.log('qty >>>', qty)
	console.log(cartItem)
	return (
		<>
			<ul>
				<li className='pizza'>
					<img
						src={img}
						className={!sold ? 'pizza__image' : 'pizza__image sold__image'}
						alt='pizza'
					/>

					<div className='pizza__info'>
						<p className='pizza__name'>{name}</p>

						<div className='pizza__ingredients'>
							<p>{ingredients.join(', ')}</p>
						</div>

						<div className='pizza__actions'>
							<p className={!sold ? 'pizza__price' : 'pizza__price sold__price'}>
								{!sold ? `€${price}.00` : 'SOLD OUT'}
							</p>

							{!sold && qty < 1 ? (
								<div className='counter-button'>
									<Button onClick={() => handleClickAddOrder(pizza)} isActive={true} type='primary'>
										Add to cart
									</Button>
								</div>
							) : (
								!sold &&
								qty > 0 && (
									<div className='counter'>
										<div className='counter-button'>
											<Button onClick={() => dispatch(decrement(pizza.id))} isActive={true} type='primary'>
												-
											</Button>
										</div>
										<p>{qty}</p>
										<div className='counter-button'>
											<Button onClick={() => dispatch(increment(pizza.id))} isActive={true} type='primary'>
												+
											</Button>
										</div>
										<div className='counter-button'>
											<Button onClick={() => handleDeleteFromCart(pizza.id)} isActive={true} type='primary'>
												Delete
											</Button>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</li>
				<hr />
			</ul>
		</>
	);
}

export default MenuItem;
