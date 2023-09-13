import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// Material UI
import { Container } from "@mui/material";

// Screen
import PageNotFound from "./screen/NotFound";

// Core
import routes from "./core/routes/MainRoutes";

// Error Boundary
import ErrorBoundary from "./common/ErrorBoundary/ErrorBoundary";
import NavLayout from "./components/NavLayout";

const App = () => {
  return (
    <BrowserRouter>
      <NavLayout>
        <Container>
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
        </Container>
      </NavLayout>
    </BrowserRouter>
  )
}

export default App