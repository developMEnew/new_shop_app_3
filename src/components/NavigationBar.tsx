import { Plus, Info as InfoIcon, Settings, Database } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { DatabaseStatus } from './DatabaseStatus';

interface NavigationBarProps {
  onAddClick: () => void;
  onInfoClick: () => void;
  onSettingsClick: () => void;
}

export function NavigationBar({ onAddClick, onInfoClick, onSettingsClick }: NavigationBarProps) {
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';

  return (
    <div className={`flex justify-between items-center mb-6 sticky top-0 z-10 py-2 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <h1 className="text-2xl font-bold">MY ITEMS</h1>
      <div className="flex gap-2">
        <DatabaseStatus variant="navbar" />
        <button
          onClick={onInfoClick}
          className={`p-2 rounded-full transition-colors ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <InfoIcon className="w-6 h-6" />
        </button>
        <button
          onClick={onSettingsClick}
          className={`p-2 rounded-full transition-colors ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <Settings className="w-6 h-6" />
        </button>
        <button
          onClick={onAddClick}
          className={`p-2 rounded-full transition-colors ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}