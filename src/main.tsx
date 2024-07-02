import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import UserContextProvider from './context/UserContext.tsx'
import store from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<UserContextProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</UserContextProvider>
	</BrowserRouter>
)
