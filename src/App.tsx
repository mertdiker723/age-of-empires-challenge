import { useEffect } from "react";
import { Types } from './core/redux/action/actionTypes';

import { useDispatch, useSelector } from "react-redux"
import { loadUnits } from "./core/redux/action/unitAction";


const App = () => {
  const counter = useSelector((state: any) => state.unitReducer)
  const dispatch: (dispatch: any) => Promise<void> = useDispatch()

  useEffect(() => {
    dispatch(loadUnits(Types.UNIT_READ_SUCCESS))
  }, [dispatch])


  return (
    <div>App</div>
  )
}

export default App