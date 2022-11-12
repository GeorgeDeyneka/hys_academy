export async function makeRequest(BASE_URL: string, path = 1): Promise<[]> {
  const PATH_URL: string = `${path}/photos?_start=0&_limit=10`;

  try {
    const response: Response = await fetch(BASE_URL + PATH_URL);
    const result: [] = await response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
}
