import { EventMessage } from './event-message';

/**
 * Represents an event sender.
 */
export class ChromeExtensionMessage {
  /**
   * Sends an event with associated data.
   *
   * @param message Message
   */
  static sendEvent(message: EventMessage) {
    return chrome.runtime.sendMessage<EventMessage, any>(message);
  }
}
