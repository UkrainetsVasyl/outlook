let webSocket = null;

enum Messages {
  newMessage = 'new_message',
  reply = 'reply_to',
  replyAll = 'reply_to_all'
}

Office.onReady((info) => {
  webSocket = new WebSocket('ws://localhost:9000');

  run();

  if (info.host === Office.HostType.Outlook) {
    document.getElementById('sideload-msg').style.display = 'none';
    document.getElementById('app-body').style.display = 'flex';
    // document.getElementById('run').onclick = run;
  }
});

export async function run() {
  webSocket.onopen = function () {
    console.log('connected');
  };

  webSocket.onmessage = function (message) {
    switch (message.data) {
      case Messages.newMessage: openNewMessage(); break;
      case Messages.reply: replyMessage(); break;
      case Messages.replyAll: replyMessagesAll(); break;
      default: logMessage(message.data);
    }
  };
}

function logMessage(message) {
  console.log('Message: %s', message.data);
}

function openNewMessage() {
  Office.context.mailbox.displayNewMessageForm({});
}

function replyMessage() {
  Office.context.mailbox.item.displayReplyForm('hello there');
}

function replyMessagesAll() {
  Office.context.mailbox.item.displayReplyAllForm('hello there');
}