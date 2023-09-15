import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// Material UI
import { Container, LinearProgress } from "@mui/material";

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
      <Suspense fallback={<LinearProgress />}>
        <NavLayout>
          <Container>
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
                  );
                })
              }
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Container>
        </NavLayout>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;