const BASE_URL = "https://3100.api.green-api.com";

export type Instance = {
  idInstance: string;
  apiTokenInstance: string;
};

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function request<T>(
  instance: Instance,
  method: string,
  options: {
    httpMethod?: "GET" | "POST" | "DELETE";
    body?: unknown;
    pathSuffix?: string;
    signal?: AbortSignal;
  } = {},
): Promise<T> {
  const { httpMethod = "GET", body, pathSuffix = "", signal } = options;
  const url = `${BASE_URL}/waInstance${instance.idInstance}/${method}/${instance.apiTokenInstance}${pathSuffix}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: httpMethod,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw e;
    throw new ApiError("Нет соединения с сервером");
  }

  if (!response.ok) {
    throw new ApiError(`Ошибка запроса: ${response.status}`, response.status);
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}
