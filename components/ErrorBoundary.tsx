'use client';

import React from 'react';

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('DungeonFlow error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen dnd-bg flex items-center justify-center p-6">
          <div className="max-w-md w-full dnd-panel p-8 text-center space-y-4">
            <div className="text-4xl">⚔</div>
            <h1 className="text-xl font-cinzel text-blood-400 tracking-wider">A Dark Force Intervenes</h1>
            <div className="dnd-divider"><span>◆</span></div>
            <p className="text-sm text-parchment-400 font-serif italic leading-relaxed">
              {this.state.error?.message ?? 'An unexpected error has occurred.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="dnd-btn-primary px-6 py-2 font-cinzel text-xs uppercase tracking-widest text-gold-300"
            >
              Return to the Realm
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
