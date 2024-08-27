import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Capture the error and error information
    this.setState({ error, errorInfo });

    // Log the error to the console or an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='bg-slate-800 min-h-screen text-red-600 p-6 rounded-md'>
          <h1 className='text-2xl font-bold'>Something went wrong.</h1>
          <p className='mt-2'>An unexpected error has occurred.</p>
          <details className='whitespace-pre-wrap mt-4 bg-red-800 p-4 rounded-md text-gray-200'>
            <summary className='cursor-pointer text-lg font-medium'>Error Details</summary>
            <p className='mt-2'><strong>Error:</strong> {this.state.error?.toString()}</p>
            <p className='mt-2'><strong>Stack Trace:</strong></p>
            <pre className='overflow-x-auto'>{this.state.errorInfo?.componentStack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
