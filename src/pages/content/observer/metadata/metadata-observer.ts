import { appAction } from '../../app/app.slice';
import { store } from '../../store';
import { DomObserver } from '../dom-observer';

export class MetadataObserver extends DomObserver {
  constructor() {
    super({
      targetSelector: '.broadcaster',
      mutationObserverInit: {
        attributes: true,
      },
    });
  }

  onChange(element: HTMLElement) {
    console.log(element);

    const { id, name } = this.getBroadcaster(element) ?? {};
    const streamId = this.getStreamId();
    console.log({ id, name, streamId });

    if (!id || !name || !streamId) {
      throw new Error('Metadata not found');
    }

    store.dispatch(
      appAction.setMetadata({
        userId: id,
        userName: name,
        liveId: streamId,
      }),
    );
  }

  getBroadcaster(element: HTMLElement): { id?: string; name?: string } {
    const name = element.querySelector('.name')?.textContent;
    const id = element
      .querySelector('button')
      ?.getAttribute('data-tar1_talent_id');

    return { id: id ?? undefined, name: name ?? undefined };
  }

  getStreamId(): string | undefined {
    return document.querySelector('#stream_name')?.textContent ?? undefined;
  }
}
