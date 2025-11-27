import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#252B42] mb-8">
          Welcome to Bookstar
        </h1>
        <Link
          href="/shop"
          className="inline-block bg-[#23A6F0] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#1a8fd4] transition-colors"
        >
          Go to Shop
        </Link>
      </div>
    </div>
  );
}
