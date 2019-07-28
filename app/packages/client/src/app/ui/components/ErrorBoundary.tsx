import * as React from "react";

import { Logger } from "common/Logger";

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({
      hasError: true
    });

    Logger.error(error.message);
    // Notify.error("Sorry, something went wrong. Please refresh and try again.");
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // todo: make this better!
      return <h1>Something went wrong.</h1>;
    }

    return (
      <>{this.props.children}</>
    );
  }
}

export default ErrorBoundary;
