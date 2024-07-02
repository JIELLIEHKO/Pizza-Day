import MenuList from './MenuList';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextType } from '../../context/UserContext';
import { useAppDispatch } from '../../app/hooks.ts'
import { getAllPizzas } from '../../redux/slices/cartSlice.ts';

export function Menu() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllPizzas());
	}, [dispatch]);

	const data = useContext<UserContextType | null>(UserContext);

	if (!data) {
		return <div>Error: UserContext is not available</div>;
	}

	return (
		<>
			<div className='menu'>
				<div>
					<h1>User: {data.user}</h1>
				</div>
				<MenuList />
			</div>
		</>
	);
}
