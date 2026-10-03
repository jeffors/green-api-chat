import { request, type Instance } from "./client";
import type { SendMessageResponse } from "./types";

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
