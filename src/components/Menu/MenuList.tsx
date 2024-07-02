import MenuItem from './MenuItem';
import { FC } from 'react';
import { useAppSelector } from '../../app/hooks.ts'


const MenuList: FC = () => {
	const pizzas = useAppSelector(state => state.cart.pizzas)

	return (
		<>
			{!!pizzas.length &&
				pizzas.map((pizza) => (
					<MenuItem
						key={pizza.name}
						img={pizza.imageUrl}
						name={pizza.name}
						ingredients={pizza.ingredients} //Раньше тут был map()
						price={pizza.unitPrice}
						sold={pizza.soldOut}
						pizza={pizza}
					/>
				))}
		</>
	);
}

export default MenuList;