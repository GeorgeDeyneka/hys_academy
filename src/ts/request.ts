export async function makeRequest<T>(BASE_URL: string, path = 1): Promise<T[]> {
  try {
    const PATH_URL: string = `${path}/photos?_start=0&_limit=10`;
    const response: Response = await fetch(BASE_URL + PATH_URL);
    const result: Array<T> = await response.json();

    return result;
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }
}
