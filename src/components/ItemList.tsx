'use client';

import { useState, useEffect } from 'react';
import { Plus, Info as InfoIcon } from 'lucide-react';
import { Item } from '@/types';
import { ItemCard } from './ItemCard';
import { ItemDetails } from './ItemDetails';
import { AddItemModal } from './AddItemModal';
import { EditItemModal } from './EditItemModal';
import { DeveloperInfoModal } from './DeveloperInfo';

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isDevInfoOpen, setIsDevInfoOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const handleAddItem = async (newItem: Omit<Item, '_id'>) => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleEditItem = async (updatedItem: Item) => {
    try {
      const response = await fetch(`/api/items/${updatedItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  return (
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
                key={item._id}
                item={item}
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
  );
}