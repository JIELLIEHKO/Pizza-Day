import { Header } from '../Header.tsx'
import OrderItem from './OrderItem.tsx'
import { FC, useState } from 'react'
import { RootState } from '../../redux/store.ts'
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import './order.css'
import { Button } from '@mui/material'
import Modal from './Modal.tsx'
import { togglePriority } from '../../redux/slices/cartSlice.ts'

const OrderId: FC = () => {
	const dispatch = useAppDispatch();
	const {
		cartItems, totalPrice, priority, orderId, customer, phone, address
	} = useAppSelector(
		(state: RootState) => state.cart
	);

	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const handlePriorityClick = () => {
		dispatch(togglePriority());
	};

	return (
		<>
			<Header />
			<div className="container-basket">
				<div id="modal-root"></div>
				<div className='basket'>
					<div className="basket-title">
						<h2>{`Order: #${orderId} status: preparing`}</h2>

						<div className="basket-status">
							{priority === true && <h2 className="basket-priority">Priority</h2>}
							<h2 className="basket-order">Preparing order</h2>
						</div>
					</div>
					<div className="basket-pizza">
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
					<div className="container-price">
						<p>{`Price pizza: €${totalPrice}.00`}</p>
						{priority === true && <p>{`Price priority: €8.00`}</p>}
						{priority === true && (
							<p style={{ fontWeight: '700' }}>{`To pay on delivery: €${totalPrice + 8}.00`}</p>
						)}
					</div>
					<div style={{display: 'flex', justifyContent: 'space-between',  marginTop: '1rem'}}>
						<Button onClick={toggleModal} variant="contained" color="success">
							Make an order
						</Button>
						<Button onClick={handlePriorityClick} variant="contained" color="error">
							{priority ? "Remove Priority" : "Prioritize"}
						</Button>
					</div>
				</div>
				<Modal
					isOpen={isOpen}
					onClose={toggleModal}
				>
					<h2>The order is already being processed and will be delivered to you soon. Thank you for your purchase!</h2>
					<p>Name: {customer}</p>
					<p>Phone number: {phone}</p>
					<p>Address: {address}</p>
				</Modal>
			</div>
		</>
	)
}

export default OrderId