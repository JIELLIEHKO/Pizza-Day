import { FC } from 'react'

interface OrderItemProps {
	qty: number,
	name: string,
	ingredients: string[],
	price: number,
}

const OrderItem: FC<OrderItemProps> = (
	{ qty, name, ingredients, price }
) => {

	return (
		<>
			<ul>
				<li className='pizza'>
					<div className='pizza__info'>
						<p className='pizza__name'>
							{qty}x {name}
						</p>

						<div className='pizza__ingredients'>
							<p>{ingredients.join(', ')}</p>
						</div>

						<div className='pizza__actions'>
							<p className={'pizza__price'}>{`€${price}.00`}</p>
						</div>
					</div>
				</li>
				<hr />
			</ul>
		</>
	)
}

export default OrderItem;