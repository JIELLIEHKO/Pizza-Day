import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface BasketItemProps {
	item: {
		id: string;
		name: string;
	};
	qty: number,
	price: number;
	onRemove: (id: string) => void;
}

const ItemBasket: React.FC<BasketItemProps> = ({ item, onRemove, price, qty }) => {

	console.log('Price >>> ', price)

	return (
		<ListItem>
			<ListItemText primary={`${qty}x ${item.name}`} secondary={`€${price}.00`} />
			<IconButton edge="end" onClick={() => onRemove(item.id)}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	);
};

export default ItemBasket;