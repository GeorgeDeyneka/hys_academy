import { nativeDataType } from "./models/interfaces.model";

export async function makeRequest(BASE_URL: string, path = 1): Promise<nativeDataType[]> {
  const PATH_URL: string = `${path}/photos?_start=0&_limit=10`;

  try {
    const response: Response = await fetch(BASE_URL + PATH_URL);
    const result: nativeDataType[] = await response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
}
