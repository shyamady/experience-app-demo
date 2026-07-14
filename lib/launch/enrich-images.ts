import {
  getPlaceholderImageUrl,
  searchUnsplashPhoto,
} from "@/lib/unsplash/search-photos";
import type { LaunchProduct, LaunchResponse } from "@/types/launch";

async function enrichProductWithImage(
  product: LaunchProduct,
): Promise<LaunchProduct> {
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
  const products = await Promise.all(
    launch.products.map((product) => enrichProductWithImage(product)),
  );

  return {
    ...launch,
    products,
  };
}
