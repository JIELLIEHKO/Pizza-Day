import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store.ts'


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector