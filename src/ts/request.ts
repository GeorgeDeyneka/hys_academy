export async function makeRequest(path = 1): Promise <[]> {
  try {
    const response: Response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${path}/photos?_start=0&_limit=10`
    );
    const result: [] = await response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
}