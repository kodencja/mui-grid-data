import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  // used to log the error information
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Coś poszło nie tak...</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
