import React, { useState } from 'react';
import { Plus, Info as InfoIcon } from 'lucide-react';
import { Item } from './types';
import { ItemCard } from './components/ItemCard';
import { ItemDetails } from './components/ItemDetails';
import { AddItemModal } from './components/AddItemModal';
import { EditItemModal } from './components/EditItemModal';
import { DeveloperInfoModal } from './components/DeveloperInfo';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isDevInfoOpen, setIsDevInfoOpen] = useState(false);

  const handleAddItem = (newItem: Omit<Item, 'id'>) => {
    const item: Item = {
      ...newItem,
      id: Math.random().toString(36).substring(2),
    };
    setItems((prev) => [...prev, item]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  const handleEditItem = (updatedItem: Item) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-50 z-10 py-2">
          <h1 className="text-2xl font-bold text-gray-900">MY ITEMS</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsDevInfoOpen(true)}
              className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <InfoIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto custom-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No items yet. Click the + button to add your first item.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                  onShowDetails={setSelectedItem}
                />
              ))}
            </div>
          )}
        </div>

        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddItem}
        />

        <ItemDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onEdit={(item) => {
            setEditingItem(item);
            setSelectedItem(null);
          }}
          onDelete={handleDeleteItem}
        />

        <EditItemModal
          item={editingItem}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleEditItem}
        />

        <DeveloperInfoModal
          isOpen={isDevInfoOpen}
          onClose={() => setIsDevInfoOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;