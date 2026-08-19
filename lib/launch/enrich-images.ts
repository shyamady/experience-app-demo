import {
  getPlaceholderImageUrl,
  searchUnsplashPhoto,
} from "@/lib/unsplash/search-photos";
import type { LaunchProduct, LaunchResponse } from "@/types/launch";

async function enrichProductWithImage(
  product: LaunchProduct,
): Promise<LaunchProduct> {
  if (product.imageUrl) return product;

  const imageUrl =
    (await searchUnsplashPhoto(product.imageQuery)) ?? getPlaceholderImageUrl();

  return {
    ...product,
    imageUrl,
  };
}

export async function enrichLaunchWithImages(
  launch: LaunchResponse,
): Promise<LaunchResponse> {
  const [heroImageUrl, ...products] = await Promise.all([
    searchUnsplashPhoto(launch.heroImageQuery),
    ...launch.products.map((product) => enrichProductWithImage(product)),
  ]);

  return {
    ...launch,
    heroImageUrl: heroImageUrl ?? products[0]?.imageUrl ?? getPlaceholderImageUrl(),
    products,
  };
}
