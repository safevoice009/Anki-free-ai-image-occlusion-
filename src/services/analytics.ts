/**
 * Analytics service for tracking user behavior
 * Placeholder for future analytics implementation
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: Date;
}

export interface UserSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  events: AnalyticsEvent[];
}

class AnalyticsService {
  private session: UserSession;
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.session = {
      id: this.generateSessionId(),
      startTime: new Date(),
      events: [],
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  track(eventName: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: new Date(),
    };

    this.session.events.push(event);
    console.debug('Analytics event tracked:', event);
  }

  trackPageView(page: string): void {
    this.track('page_view', { page });
  }

  trackCardCreated(cardId: number, title: string): void {
    this.track('card_created', { cardId, title });
  }

  trackCardStudied(cardId: number, score: number): void {
    this.track('card_studied', { cardId, score });
  }

  trackExport(format: string, cardCount: number): void {
    this.track('export_completed', { format, cardCount });
  }

  trackError(error: Error, context?: string): void {
    this.track('error_occurred', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  endSession(): void {
    if (!this.isEnabled) return;

    this.session.endTime = new Date();
    const duration =
      this.session.endTime.getTime() - this.session.startTime.getTime();

    this.track('session_ended', {
      duration,
      eventCount: this.session.events.length,
    });

    console.debug('Analytics session ended:', {
      ...this.session,
      duration,
    });
  }

  getSession(): UserSession {
    return { ...this.session };
  }
}

export const analyticsService = new AnalyticsService();
