import { BroadcastChannel } from 'worker_threads';
import { AppMetadata } from '../models/app-metadata';

/**
 * Represents an event sender.
 */
export class EventSender {
  channel: BroadcastChannel = new BroadcastChannel('mache-counter-event');
  instance: EventSender;

  constructor() {
    this.instance = this;
  }

  /**
   * Sends an event with associated data.
   *
   * @param metadata The metadata of the event.
   * @param event The name of the event to send.
   * @param data The data to be sent along with the event.
   */
  sendEvent(metadata: AppMetadata, event: string, data: any) {
    this.channel.postMessage({ metadata, event, data });
  }
}
