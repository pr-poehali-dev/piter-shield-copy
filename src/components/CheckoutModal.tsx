import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  onOrderComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
    onOrderComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Оформление заказа</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="hover:bg-muted"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Ваш заказ</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Размер: {item.size} • Количество: {item.quantity}</p>
                    </div>
                    <p className="font-bold">{(item.price * item.quantity).toLocaleString()} ₽</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого к оплате:</span>
                  <span>{totalPrice.toLocaleString()} ₽</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Данные для доставки</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Имя *</label>
                    <Input placeholder="Введите имя" className="border-foreground" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Фамилия *</label>
                    <Input placeholder="Введите фамилию" className="border-foreground" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Телефон *</label>
                  <Input type="tel" placeholder="+7 (___) ___-__-__" className="border-foreground" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <Input type="email" placeholder="your@email.com" className="border-foreground" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Адрес доставки *</label>
                  <Input placeholder="Улица, дом, квартира" className="border-foreground" required />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Город *</label>
                    <Input placeholder="Москва" className="border-foreground" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Индекс</label>
                    <Input placeholder="123456" className="border-foreground" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Способ оплаты</label>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="payment" value="card" defaultChecked className="form-radio" />
                      <span className="text-sm">Банковская карта</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="payment" value="cash" className="form-radio" />
                      <span className="text-sm">Наличные при получении</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Комментарий к заказу</label>
                  <textarea 
                    className="w-full min-h-[80px] px-3 py-2 border border-foreground rounded resize-none focus:outline-none focus:ring-2 focus:ring-foreground"
                    placeholder="Дополнительные пожелания..."
                  />
                </div>
                
                <div className="space-y-4 pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-foreground hover:bg-muted-foreground text-background py-3"
                  >
                    Подтвердить заказ на {totalPrice.toLocaleString()} ₽
                    <Icon name="CreditCard" size={16} className="ml-2" />
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-foreground text-foreground hover:bg-muted"
                    onClick={onClose}
                  >
                    Вернуться к покупкам
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;