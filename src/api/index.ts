export default async function api(url: string, init?: RequestInit): Promise<string> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.text();
}