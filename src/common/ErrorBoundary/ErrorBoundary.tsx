import { PropsWithChildren, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import ErrorBoundaryInner from './ErrorBoundaryInner';

const ErrorBoundary = ({ children }: PropsWithChildren) => {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (hasError) {
            setHasError(false);
        }
        // eslint-disable-next-line
    }, [location.key]);

    return (
        <ErrorBoundaryInner
            hasError={hasError}
            setHasError={setHasError}
        >
            {children}
        </ErrorBoundaryInner>
    );
};


export default ErrorBoundary;