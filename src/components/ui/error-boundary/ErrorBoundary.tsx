import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            padding: "20px",
            border: "2px solid red",
            backgroundColor: "#ffe0e0",
          }}
        >
          <h1>Oisann! Noe gikk galt.</h1>
          <p>Beklager for ulempen. Vi har logget feilen og vil se på den.</p>
          <p>
            Prøv å <a href={window.location.href}>laste siden på nytt</a>.
          </p>
          {/* For development, you might want to display more details */}
          {process.env.NODE_ENV === "development" && this.state.errorInfo && (
            <details style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
              <summary>Feildetaljer</summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
