import React from 'react';
import { Button } from '@/components/ui/button';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartSheetProps {
  cartItems: CartItem[];
  updateQuantity: (itemId: string, size: string, newQuantity: number) => void;
  removeFromCart: (itemId: string, size: string) => void;
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  totalItems,
  totalPrice,
  onCheckout
}) => {
  return (
    <SheetContent className="w-96">
      <SheetHeader>
        <SheetTitle>Корзина покупок</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col h-full pt-6">
        <div className="flex-1 overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="ShoppingBag" size={64} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg mb-2">Корзина пуста</p>
              <p className="text-sm">Добавьте товары для покупки</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex items-start space-x-3 p-4 border border-foreground/20 rounded">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm leading-tight mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">Размер: {item.size}</p>
                    <p className="text-sm font-bold">{item.price.toLocaleString()} ₽</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-7 h-7 p-0"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      >
                        <Icon name="Minus" size={10} />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-7 h-7 p-0"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        <Icon name="Plus" size={10} />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-7 h-7 p-0 text-destructive hover:bg-destructive/10"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      <Icon name="Trash2" size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Товаров:</span>
                <span>{totalItems} шт.</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Итого:</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
            </div>
            <Button 
              className="w-full bg-foreground hover:bg-muted-foreground" 
              onClick={onCheckout}
            >
              Оформить заказ
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </SheetContent>
  );
};

export default CartSheet;