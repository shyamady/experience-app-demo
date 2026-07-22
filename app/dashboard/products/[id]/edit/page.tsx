import { EditProductScreen } from "@/components/product-editor/EditProductScreen";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditProductScreen productId={id} />;
}
