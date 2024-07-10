const maxRetries = 5;

export function connectWebSocket(url: string, onMessage: (event: MessageEvent) => void) {
  let retryCount = 0;

  function connect() {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      retryCount = 0; // Reset retry count on successful connection
    };

    ws.onmessage = onMessage;

    ws.onclose = (event) => {
      if (event.code === 1006) {
        console.error('WebSocket connection closed abnormally');
        if (retryCount < maxRetries) {
          const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          setTimeout(connect, retryDelay);
          retryCount++;
        } else {
          console.error('Max retries reached. Unable to reconnect.');
        }
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  connect();
}