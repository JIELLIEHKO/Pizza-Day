import { Header } from '../Header.tsx'
import OrderItem from './OrderItem.tsx'
import { FC } from 'react'
import { RootState } from '../../redux/store.ts'
import { useAppSelector } from '../../app/hooks.ts'

const OrderId: FC = () => {
	const {
		cartItems, totalPrice, priority, orderId
	} = useAppSelector(
		(state: RootState) => state.cart
	);

	return (
		<>
			<Header />
			<div style={{ marginTop: '5rem' }}>
				<h2>{`Order: #${orderId} status: preparing`}</h2>
				{priority === true && <h2>Priority</h2>}
				<div>
					{!!cartItems.length &&
						cartItems.map(pizza => (
							<OrderItem
								key={pizza.name}
								name={pizza.name}
								qty={pizza.qty}
								ingredients={pizza.ingredients}
								price={pizza.unitPrice}
							/>
						))}
				</div>
				<div>
					<p>{`Price pizza: €${totalPrice}.00`}</p>
					{priority === true && <p>{`Price priority: €8.00`}</p>}
					{priority === true && (
						<p>{`To pay on delivery: €${totalPrice + 8}.00`}</p>
					)}
				</div>
			</div>
		</>
	)
}

export default OrderId