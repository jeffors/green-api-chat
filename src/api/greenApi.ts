import { request, type Instance } from "./client";
import type { SendMessageResponse, Notification } from "./types";

export const checkStateInstance = (instance: Instance) =>
  request<{ stateInstance: string }>(instance, "getStateInstance");

export const sendMessage = (
  instance: Instance,
  chatId: string,
  message: string,
) =>
  request<SendMessageResponse>(instance, "sendMessage", {
    httpMethod: "POST",
    body: { chatId, message },
  });

export const recieveNotification = (instance: Instance) =>
  request<Notification | null>(instance, "receiveNotification");

export const deleteNotification = (instance: Instance, receiptId: number) =>
  request<{ result: boolean }>(instance, "deleteNotification", {
    httpMethod: "DELETE",
    pathSuffix: `/${receiptId}`,
  });
