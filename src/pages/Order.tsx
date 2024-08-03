import { ChangeEvent, FC } from 'react'
import { Header } from '../components/Header'
import { Controller, Resolver, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Input/Input'
import { Button } from '../components/Button/Button.tsx'
import { useNavigate } from 'react-router-dom'
import { addOrderId, addOrderInfo } from '../redux/slices/cartSlice.ts'
import { RootState } from '../redux/store.ts'
import { useAppDispatch, useAppSelector } from '../app/hooks.ts'
import FormOrder from '../components/Form/FormOrder.tsx'

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

	const dispatch = useAppDispatch()
	const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
	const totalPrice = useAppSelector((state: RootState) => state.cart.totalPrice)

	const onSubmit = async (data: FormData) => {
		if (cartItems.length === 0) {
			alert('The basket is empty!')
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
				unitPrice: item.unitPrice,
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
					<h2>Ready to order? Let's go!</h2>

					<FormOrder control={control} errors={errors} name="name" type="text">First Name</FormOrder>

					<FormOrder control={control} errors={errors} name="phone" type="text">Phone number</FormOrder>

					<FormOrder control={control} errors={errors} name="address" type="text">Address</FormOrder>

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
							Want to yo give your order priority?
						</label>
					</div>

					<div className="counter-button">
						<Button type="submit" isActive={false} onClick={() => {
						}}>Order now for €{totalPrice}.00</Button>
					</div>
				</form>
			</div>
		</>
	)
}