import ProductImageSlider from "@/components/ProductImageSlider";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <main className="mt-20 w-full p-2">
      {/* Welcome Section */}
      <section className="p-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          مرحبًا بكم في موقعنا
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          استعرض أحدث المنتجات والعروض الخاصة بنا!
        </p>
      </section>

      {/* Image Slider */}
      <ProductImageSlider />

      {/* Product List Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">جميع المنتجات</h2>
        <ProductList />
      </section>
    </main>
  );
}
