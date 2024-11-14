import ItemList from '@/components/ItemList';
import { DatabaseStatus } from '@/components/DatabaseStatus';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ItemList />
      <DatabaseStatus />
    </main>
  );
}