import { ChangeEvent, FC } from 'react'
import { Header } from '../components/Header'
import { Controller, Resolver, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Input/Input'
import { Button } from '../components/Button/Button.tsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderId, addOrderInfo } from '../redux/slices/cartSlice.ts'
import { RootState } from '../redux/store.ts'

// Типизация элемента корзины
interface CartItem {
	id: string;
	name: string;
	qty: number;
	unitPrice: number;
}

// Типизация данных формы
interface FormData {
	name: string;
	phone: string;
	address: string;
	priority?: boolean;
}

// Валидационная схема Yup для формы
const formSchema = Yup.object().shape({
	name: Yup.string().required('Поле не должно быть пустым'),
	phone: Yup.string().required('Поле не должно быть пустым'),
	address: Yup.string().required('Поле не должно быть пустым'),
	priority: Yup.boolean()
})

type FormSchemaType = Yup.InferType<typeof formSchema>;

export const Order: FC = () => {
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<FormSchemaType>({
		mode: 'onBlur',
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			priority: false
		},
		resolver: yupResolver(formSchema) as Resolver<FormSchemaType>
	})

	const dispatch = useDispatch()
	const cartItems = useSelector((state: RootState) => state.cart.cartItems)

	const onSubmit = async (data: FormData) => {
		if (cartItems.length === 0) {
			alert('Кошик порожній')
			return
		}

		const orderData = {
			address: data.address,
			customer: data.name,
			phone: data.phone,
			priority: data.priority || false,
			position: '',
			cart: cartItems.map((item: CartItem) => ({
				name: item.name,
				pizzaId: item.id,
				quantity: item.qty,
				totalPrice: item.qty * item.unitPrice,
				unitPrice: item.unitPrice
			}))
		}

		try {
			const response = await fetch('https://react-fast-pizza-api.onrender.com/api/order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(orderData)
			})

			const result = await response.json()

			if (result.status === 'success') {
				dispatch(addOrderInfo(orderData))
				dispatch(addOrderId({ orderId: result.data.id }))
				console.log(result.data.id)
				navigate(`/order/${result.data.id}`)
			} else {
				alert('Что-то пошло не так')
			}
		} catch (error) {
			alert('Что-то пошло не так')
		}
	}

	return (
		<>
			<Header />
			<div className="container-order">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2>Готовы к заказу? Поехали!</h2>
					<div>
						<label htmlFor="name">Имя</label>
						<Controller
							control={control}
							name="name"
							render={({ field }) => <Input {...field} type="text" placeholder="" />}
						/>
					</div>

					<div className="order-error">
						{errors.name && <p>{errors.name.message}</p>}
					</div>

					<div>
						<label htmlFor="phone">Номер телефона</label>
						<Controller
							control={control}
							name="phone"
							render={({ field }) => <Input {...field} type="text" placeholder="" />}
						/>
					</div>

					<div className="order-error">
						{errors.phone && <p>{errors.phone.message}</p>}
					</div>

					<div>
						<label htmlFor="address">Адрес</label>
						<Controller
							control={control}
							name="address"
							render={({ field }) => <Input {...field} type="text" placeholder="" />}
						/>
					</div>

					<div className="order-error">
						{errors.address && <p>{errors.address.message}</p>}
					</div>

					<div className="container-checkbox">
						<label>
							<Controller
								name="priority"
								control={control}
								render={({ field }) => (
									<Input
										type="checkbox"
										{...field}
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											setValue('priority', e.target.checked)
										}}
										value={field.value || false}
									/>
								)}
							/>
							Хотите придать приоритет вашему заказу?
						</label>
					</div>

					<div className="counter-button">
						<Button type="submit" isActive={false} onClick={() => {
						}}>Заказать</Button>
					</div>
				</form>
			</div>
		</>
	)
}