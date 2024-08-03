import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts'

// Типизация для элемента корзины
export interface CartItem {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	ingredients: string[];
	unitPrice: number;
	soldOut: boolean
	qty: number
}

// Типизация пиццы
export interface Pizza {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	ingredients: string[];
	unitPrice: number;
	soldOut: boolean
	qty: number
}

// Типизация для начального состояния
export interface CartState {
	cartItems: CartItem[];
	pizzas: Pizza[];
	isLoading: boolean;
	error: string | null;
	totalItems: number;
	totalPrice: number;
	customer: string;
	address: string;
	phone: string;
	priority: boolean;
	priorityPrice: number;
	position: string;
	orderId: string;
}

const initialState: CartState = {
	cartItems: [],
	pizzas: [],
	isLoading: false,
	error: null,
	totalItems: 0,
	totalPrice: 0,
	customer: '',
	address: '',
	phone: '',
	priority: false,
	priorityPrice: 8,
	position: '',
	orderId: '',
};

export const getAllPizzas = createAsyncThunk<Pizza[], void, { state: RootState }>(
	'cart/getAllPizzas',
	async () => {
		const res = await fetch('https://react-fast-pizza-api.onrender.com/api/menu');
		const { data } = await res.json();
		return data as Pizza[];
	}
);

const updateTotals = (state: CartState) => {
	state.totalItems = calcTotalItems(state.cartItems);
	state.totalPrice = calcTotalPrice(state.cartItems);
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const findItem = state.cartItems.find(cartItem => cartItem.id === action.payload.id);

			if (!findItem) {
				state.cartItems.push({ ...action.payload, qty: 1 });
			} else {
				findItem.qty += 1;
			}

			updateTotals(state)
		},
		deleteFromCart: (state, action: PayloadAction<string>) => {
			state.cartItems = state.cartItems.filter(item => item.id !== action.payload);

			updateTotals(state)
		},
		increment: (state, action: PayloadAction<string>) => {
			const findItem = state.cartItems.find(cartItem => cartItem.id === action.payload);
			if (findItem) {
				findItem.qty += 1;
			}

			updateTotals(state)
		},
		decrement: (state, action: PayloadAction<string>) => {
			const findItem = state.cartItems.find(cartItem => cartItem.id === action.payload);
			if (findItem) {
				findItem.qty -= 1;

				if (findItem.qty < 1) {
					state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
				}
			}

			updateTotals(state)
		},
		addOrderInfo: (state, action: PayloadAction<{ customer: string; address: string; phone: string; priority: boolean }>) => {
			state.customer = action.payload.customer;
			state.address = action.payload.address;
			state.phone = action.payload.phone;
			state.priority = action.payload.priority;
		},
		addOrderId: (state, action: PayloadAction<{ orderId: string }>) => {
			state.orderId = action.payload.orderId;
		}
	},
	extraReducers: builder => {
		builder
			.addMatcher(
				action => action.type.endsWith('/pending'),
				state => {
					state.error = null;
					state.isLoading = true;
				}
			)
			.addMatcher(
				action => action.type.endsWith('/fulfilled'),
				(state, action: PayloadAction<Pizza[]>) => {
					state.pizzas = action.payload;
					state.isLoading = false;
				}
			)
			.addMatcher(
				action => action.type.endsWith('/rejected'),
				state => {
					state.error = 'Failed to fetch';
					state.isLoading = false;
				}
			);
	}

});

export default cartSlice.reducer;
export const {
	addToCart,
	deleteFromCart,
	decrement,
	increment,
	addOrderInfo,
	addOrderId
} = cartSlice.actions;

const calcTotalItems = (items: CartItem[]): number =>
	items.reduce((acc, item) => acc + item.qty, 0);
const calcTotalPrice = (items: CartItem[]): number =>
	items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0);

export { calcTotalItems, calcTotalPrice };
