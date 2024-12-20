import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState, AppDispatchType } from '../redux/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatchType>(); 
