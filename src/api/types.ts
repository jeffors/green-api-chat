export type SendMessageResponse = {
  idMessage: string;
};

export type Notification = {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: number;
    senderData: {
      chatId: string;
      chatName: string;
      chatType: string;
      sender: string;
      senderName: string;
      senderType: string;
      senderContactName: string;
      senderPhoneNumber: number;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
};

export type CheckAccount = {
  exist: boolean;
  chatId: string;
  fromCache: boolean;
};

export type ContactInfo = {
  avatar: string;
  name: string;
  contactName: string;
  chatId: string;
  chatType: string;
  lastSeen: number;
  phoneNumber: number;
  phoneNumberTimestamp: number;
};
