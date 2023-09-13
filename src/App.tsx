import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

// Screen
import PageNotFound from "./screen/NotFound";

// Core
import routes from "./core/routes/MainRoutes";

// Redux
import { Types } from './core/redux/action/actionTypes';
import { loadUnits } from "./core/redux/action/unitAction";
import { RootState } from "./core/redux/reducer";

// Error Boundary
import ErrorBoundary from "./common/ErrorBoundary/ErrorBoundary";
import NavLayout from "./components/NavLayout";

const App = () => {
  const counter = useSelector((state: RootState) => state.unitReducer)
  const dispatch: (action: any) => Promise<void> = useDispatch()

  useEffect(() => {
    dispatch(loadUnits(Types.UNIT_READ_SUCCESS))
  }, [dispatch])

  return (
    <BrowserRouter>
      <NavLayout>
        <Suspense fallback={<div>Loading..</div>}>
          <Routes>
            {
              routes.map(({ id, path, Component }) => {
                return (
                  <Route
                    key={id}
                    path={path}
                    element={
                      <ErrorBoundary>
                        <Component />
                      </ErrorBoundary>
                    }
                  />
                )
              })
            }
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </NavLayout>
    </BrowserRouter>
  )
}

export default App