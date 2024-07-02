import React, { createContext, FC, SetStateAction, useMemo, useState, Dispatch } from 'react'

export interface UserContextType {
	user: string;
	setUser: Dispatch<SetStateAction<string>>;
	orderId: string;
	setOrderId: Dispatch<SetStateAction<string>>;
}

export const UserContext =
	createContext<UserContextType  | null>(null)

interface UserContextProviderProps {
	children: React.ReactNode,
}

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>('')
	const [orderId, setOrderId] = useState<string>('')

	const contextValue = useMemo(
		() => ({ user, setUser, orderId, setOrderId }),
		[user, setUser, orderId, setOrderId]
	)

	return (
		<>
			<UserContext.Provider value={contextValue}>
				{children}
			</UserContext.Provider>
		</>
	)
}

export default UserContextProvider