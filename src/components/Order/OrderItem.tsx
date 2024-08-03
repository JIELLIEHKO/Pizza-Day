import { FC } from 'react'
import './order.css'

interface OrderItemProps {
	qty: number,
	name: string,
	ingredients: string[],
	price: number,
}

const OrderItem: FC<OrderItemProps> = (
	{ qty, name, ingredients, price }
) => {

	function capitalizeFirstLetters(arr: string[]): string[] {
		return arr.map(str => str.charAt(0).toUpperCase() + str.slice(1));
	}

	const capitalizedArray: string[] = capitalizeFirstLetters(ingredients);

	return (
		<>
			<ul>
				<li className='pizza'>
					<div className='pizza__info'>

						<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
							<p className="pizza__name">
								{qty}x {name}
							</p>
							<p className={'pizza__price'}>{`€${price}.00`}</p>
						</div>

						<div className="pizza__ingredients">
						<p>{capitalizedArray.join(', ')}</p>
						</div>

					</div>
				</li>
				<hr />
			</ul>
		</>
	)
}

export default OrderItem;