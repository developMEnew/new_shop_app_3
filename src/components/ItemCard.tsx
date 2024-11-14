import React from 'react';
import { Info } from 'lucide-react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onDelete: (id: string) => void;
  onShowDetails: (item: Item) => void;
}

export function ItemCard({ item, onShowDetails }: ItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={item.images[0] || 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <span className="text-blue-600 font-medium">RS.{item.price}</span>
        </div>
        <div className="flex justify-end items-center mt-4">
          <button
            onClick={() => onShowDetails(item)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}