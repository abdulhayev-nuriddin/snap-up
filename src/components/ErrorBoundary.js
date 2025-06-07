import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong. Please try again later.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
