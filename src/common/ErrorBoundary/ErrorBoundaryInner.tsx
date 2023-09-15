import { Component, ReactNode } from "react";
import "./Style.scss";

interface ErrorBoundaryInnerProps {
    hasError: boolean;
    setHasError: (hasError: boolean) => void;
    children: ReactNode;
}

interface ErrorBoundaryInnerState {
    hasError: boolean;
}

class ErrorBoundaryInner extends Component<ErrorBoundaryInnerProps, ErrorBoundaryInnerState> {
    constructor(props: ErrorBoundaryInnerProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error: any) {
        return { hasError: true };
    }


    componentDidUpdate(prevProps: ErrorBoundaryInnerProps) {
        if (!this.props.hasError && prevProps.hasError) {
            this.setState({ hasError: false });
        }
    }

    componentDidCatch(_error: any, _errorInfo: any) {
        this.props.setHasError(true);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <div className="errorboundary-container">There was an error</div>;
        }
        return children;
    }
}

export default ErrorBoundaryInner;