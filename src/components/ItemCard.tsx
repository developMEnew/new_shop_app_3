import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Item } from '../types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface ItemCardProps {
  item: Item;
  onShowDetails: (item: Item) => void;
}

export function ItemCard({ item, onShowDetails }: ItemCardProps) {
  const profit = item.sellingPrice - item.costPrice;
  const profitPercentage = ((profit / item.costPrice) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
        <div className="aspect-square relative">
          <img
            src={item.images[0] || 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Cost: RS.{item.costPrice}</p>
              <p className="text-lg font-medium text-blue-600">RS.{item.sellingPrice}</p>
              <p className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Profit: {profitPercentage}%
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2"
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