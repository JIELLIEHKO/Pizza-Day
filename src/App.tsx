import { Main } from './pages/Main.tsx'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.tsx'
import { PageNotFound } from './pages/PageNotFound.tsx'
import { Order } from './pages/Order.tsx'
import OrderId from './components/Order/OrderId.tsx'

function App() {
	return (
		<>
			<div className='wrapper'>
				<Routes>
					<Route path='/menu' element={<Main />} />
					<Route path='/' element={<Login />} />
					<Route path='/order/new' element={<Order />} />
					<Route path='/order/:id' element={<OrderId />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</div>
		</>
	)
}

export default App
