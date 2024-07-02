import { Menu } from '../components/Menu/Menu.tsx'
import { Header } from '../components/Header.jsx'

export function Main() {
	return (
		<>
			<Header />

			<main className='main'>
				<Menu />
			</main>
		</>
	)
}
