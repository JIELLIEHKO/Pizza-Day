import ReactDOM from 'react-dom';
import './Modal.css'
import { SquareX } from 'lucide-react';
import { FC, ReactNode } from 'react'

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => { {
	if (!isOpen) return null;

	const modalRoot = document.getElementById('modal-root');

	if (!modalRoot) {
		console.error('Modal root element not found');
		return null;
	}

	return ReactDOM.createPortal(
		<div className="modal-overlay">
			<dialog open className="modal-dialog">
				<div className="modal-content">
					<SquareX
						onClick={onClose}
						className="close">
					</SquareX>
					{children}
				</div>
			</dialog>
		</div>,
		modalRoot
	);
}}

export default Modal;