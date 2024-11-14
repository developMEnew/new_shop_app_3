import React, { useState } from 'react';
import { Item } from './types';
import { ItemCard } from './components/ItemCard';
import { ItemDetails } from './components/ItemDetails';
import { AddItemModal } from './components/AddItemModal';
import { EditItemModal } from './components/EditItemModal';
import { DeveloperInfoModal } from './components/DeveloperInfo';
import { NavigationBar } from './components/NavigationBar';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isDevInfoOpen, setIsDevInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
        <NavigationBar
          onAddClick={() => setIsAddModalOpen(true)}
          onInfoClick={() => setIsDevInfoOpen(true)}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />

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

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;