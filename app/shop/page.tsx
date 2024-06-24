import Shop from '../components/Shop/Shop';

export default async function page() {
  return (
    <main className="w-full min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-80px)]">
      <Shop />
    </main>
  );
}
