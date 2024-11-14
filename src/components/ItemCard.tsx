import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Item } from '../types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface ItemCardProps {
  item: Item;
  onShowDetails: (item: Item) => void;
  isDark: boolean;
}

export function ItemCard({ item, onShowDetails, isDark }: ItemCardProps) {
  const profit = item.sellingPrice - item.costPrice;
  const profitPercentage = ((profit / item.costPrice) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`overflow-hidden h-full hover:shadow-lg transition-shadow ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="aspect-square relative">
          <img
            src={item.images[0] || 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className={`font-semibold text-lg line-clamp-1 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>{item.name}</h3>
            <div className="space-y-1">
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Cost: RS.{item.costPrice}
              </p>
              <p className={`text-lg font-medium ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                RS.{item.sellingPrice}
              </p>
              <p className={`text-sm ${
                profit >= 0 
                  ? isDark ? 'text-green-400' : 'text-green-600'
                  : isDark ? 'text-red-400' : 'text-red-600'
              }`}>
                Profit: {profitPercentage}%
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`w-full mt-2 ${
                isDark 
                  ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => onShowDetails(item)}
            >
              <Info className="w-4 h-4 mr-2" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}