import consumer from "./consumer";

const NewsChannel = consumer.subscriptions.create("NewsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server

  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the WebSocket for this channel
    const event = new CustomEvent('news-received', { detail: data });
    console.log('updated')
    window.dispatchEvent(event);
  }
});

export default NewsChannel;