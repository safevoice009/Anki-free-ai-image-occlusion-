/**
 * Global state management
 * Placeholder for future state management implementation
 */

import React from 'react';

export interface AppState {
  user: {
    id: string | null;
    preferences: {
      theme: 'light' | 'dark';
      language: string;
    };
  };
  ui: {
    sidebarOpen: boolean;
    isLoading: boolean;
    notifications: Notification[];
  };
  cards: {
    currentCard: number | null;
    searchQuery: string;
    selectedTags: string[];
  };
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  autoClose?: boolean;
}

class StateManager {
  private state: AppState;
  private listeners: Set<(state: AppState) => void> = new Set();

  constructor() {
    this.state = this.getInitialState();
  }

  private getInitialState(): AppState {
    return {
      user: {
        id: null,
        preferences: {
          theme: 'light',
          language: 'en',
        },
      },
      ui: {
        sidebarOpen: false,
        isLoading: false,
        notifications: [],
      },
      cards: {
        currentCard: null,
        searchQuery: '',
        selectedTags: [],
      },
    };
  }

  getState(): AppState {
    return { ...this.state };
  }

  setState(updater: (state: AppState) => AppState): void {
    this.state = updater(this.state);
    this.notifyListeners();
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  // Action creators
  setLoading(isLoading: boolean): void {
    this.setState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        isLoading,
      },
    }));
  }

  addNotification(
    notification: Omit<Notification, 'id' | 'timestamp'>
  ): string {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      autoClose: notification.autoClose !== false,
    };

    this.setState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        notifications: [...state.ui.notifications, newNotification],
      },
    }));

    if (newNotification.autoClose) {
      setTimeout(() => {
        this.removeNotification(id);
      }, 5000);
    }

    return id;
  }

  removeNotification(id: string): void {
    this.setState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        notifications: state.ui.notifications.filter((n) => n.id !== id),
      },
    }));
  }

  toggleSidebar(): void {
    this.setState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        sidebarOpen: !state.ui.sidebarOpen,
      },
    }));
  }

  setCurrentCard(cardId: number | null): void {
    this.setState((state) => ({
      ...state,
      cards: {
        ...state.cards,
        currentCard: cardId,
      },
    }));
  }

  setSearchQuery(query: string): void {
    this.setState((state) => ({
      ...state,
      cards: {
        ...state.cards,
        searchQuery: query,
      },
    }));
  }

  setSelectedTags(tags: string[]): void {
    this.setState((state) => ({
      ...state,
      cards: {
        ...state.cards,
        selectedTags: tags,
      },
    }));
  }
}

export const stateManager = new StateManager();

// React hook for using global state
export function useGlobalState<T>(selector: (state: AppState) => T): T {
  const [selectedState, setSelectedState] = React.useState(() =>
    selector(stateManager.getState())
  );

  React.useEffect(() => {
    const unsubscribe = stateManager.subscribe((state) => {
      setSelectedState(selector(state));
    });

    return unsubscribe;
  }, [selector]);

  return selectedState;
}
