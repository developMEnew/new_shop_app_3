import React from 'react';
import { X, Pencil, Trash2 } from 'lucide-react';
import { Item } from '../types';

interface ItemDetailsProps {
  item: Item | null;
  onClose: () => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export function ItemDetails({ item, onClose, onEdit, onDelete }: ItemDetailsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  if (!item) return null;

  const handleDelete = () => {
    onDelete(item.id);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-30"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-40 flex flex-col max-h-[85vh]">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="w-12 h-1 bg-gray-300 rounded-full absolute left-1/2 -translate-x-1/2 -top-3" />
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <div>
              <span className="text-sm text-gray-500">Price</span>
              <p className="text-lg font-medium text-blue-600">RS.{item.price}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Description</span>
              <p className="mt-1 text-gray-700">{item.description}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500 block mb-2">Images</span>
              <div className="grid grid-cols-3 gap-4">
                {item.images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${item.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">Delete Item</h3>
              <p className="text-gray-600 mb-4">Are you sure you want to delete this item?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2 text-gray-600 font-medium rounded-lg border-2 border-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 text-white font-medium rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}