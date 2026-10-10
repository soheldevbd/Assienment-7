import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id || p.slug} product={p} />
      ))}
    </div>
  );
}
