'use client';

import { useState, useEffect } from 'react';
import { Plus, Info as InfoIcon, Settings } from 'lucide-react';
import { Item } from '@/types';
import { ItemCard } from './ItemCard';
import { ItemDetails } from './ItemDetails';
import { AddItemModal } from './AddItemModal';
import { EditItemModal } from './EditItemModal';
import { DeveloperInfoModal } from './DeveloperInfo';
import { SettingsModal } from './SettingsModal';
import { useSettings } from '../hooks/useSettings';

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isDevInfoOpen, setIsDevInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { settings } = useSettings();

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

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const isDark = settings.theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className={`flex justify-between items-center mb-6 sticky top-0 z-10 py-2 border-b ${
          isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <h1 className={`text-2xl font-bold ${getFontSizeClass()}`}>MY ITEMS</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsDevInfoOpen(true)}
              className={`p-2 rounded-full transition-colors ${
                isDark 
                  ? 'bg-purple-600 text-gray-100 hover:bg-purple-700' 
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              <InfoIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2 rounded-full transition-colors ${
                isDark 
                  ? 'bg-indigo-600 text-gray-100 hover:bg-indigo-700' 
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              <Settings className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className={`p-2 rounded-full transition-colors ${
                isDark 
                  ? 'bg-blue-600 text-gray-100 hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} ${getFontSizeClass()}`}>
                No items yet. Click the + button to add your first item.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onShowDetails={setSelectedItem}
                  isDark={isDark}
                />
              ))}
            </div>
          )}
        </div>

        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddItem}
          isDark={isDark}
        />

        <ItemDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onEdit={(item) => {
            setEditingItem(item);
            setSelectedItem(null);
          }}
          onDelete={handleDeleteItem}
          isDark={isDark}
        />

        <EditItemModal
          item={editingItem}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleEditItem}
          isDark={isDark}
        />

        <DeveloperInfoModal
          isOpen={isDevInfoOpen}
          onClose={() => setIsDevInfoOpen(false)}
          isDark={isDark}
        />

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          isDark={isDark}
        />
      </div>
    </div>
  );
}