import { request, type Instance } from "./client";

export const checkStateInstance = (instance: Instance) =>
  request<{ stateInstance: string }>(instance, "getStateInstance");
