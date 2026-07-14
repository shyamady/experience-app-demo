const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop";

type UnsplashSearchResponse = {
  results?: Array<{
    urls?: {
      regular?: string;
    };
  }>;
};

export async function searchUnsplashPhoto(query: string): Promise<string | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY?.trim();
  const trimmedQuery = query.trim();

  if (!accessKey || !trimmedQuery) {
    return null;
  }

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", trimmedQuery);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("orientation", "landscape");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as UnsplashSearchResponse;
    return data.results?.[0]?.urls?.regular ?? null;
  } catch {
    return null;
  }
}

export function getPlaceholderImageUrl(): string {
  return PLACEHOLDER_IMAGE;
}
