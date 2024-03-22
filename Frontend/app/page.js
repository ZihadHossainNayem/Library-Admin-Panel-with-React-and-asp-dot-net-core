import Image from "next/image";
import CRUD from "./CRUD";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-between py-12 px-4 bg-dark">
      <h1 className="text-white text-center mb-12 font-semibold">
        Book List : Admin Panel
      </h1>
      <CRUD />
    </main>
  );
}
