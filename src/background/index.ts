import { EventMessage } from '../events/event-message';

chrome.runtime.onMessage.addListener(
  (message: EventMessage, _, sendResponse) => {
    if (!message) {
      sendResponse({
        status: 'error',
        description: 'Message is missing',
      });
    }

    const baseUrl = process.env.API_BASE_URL || 'https://example.com/api/v1';

    try {
      switch (message.event) {
        case 'gift':
          fetch(`${baseUrl}/gifts`, {
            method: 'POST',
            body: JSON.stringify({
              broadcaster_id: message.metadata.userId,
              broadcaster_name: message.metadata.userName,
              stream_id: message.metadata.liveId,
              gifts: message.data,
            }),
          })
            .then((response) => {
              if (200 <= response.status && response.status < 300) {
                sendResponse({
                  status: 'success',
                });
              } else {
                sendResponse({
                  status: 'error',
                  description: `Failed to send gifts: ${response.status}`,
                });
              }
            })
            .catch((e) => {
              sendResponse({
                status: 'error',
                description: `Failed to send gifts: ${e}`,
              });
            });
          break;
        default:
          sendResponse({
            status: 'error',
            description: `Unknown event: ${message.event}`,
          });
      }
    } catch (e) {
      sendResponse({
        status: 'error',
        description: `Failed to send gifts: ${e}`,
      });
    }

    return true;
  },
);
