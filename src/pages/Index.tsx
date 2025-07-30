import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const addToCart = (product: any, size: string) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id && item.size === size 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        size,
        quantity: 1
      }]);
    }
  };

  const products = [
    {
      id: '1',
      name: 'Минималистичное Черное Платье',
      price: 8990,
      category: 'Платья',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      image: '/img/24828602-1f3f-4410-b495-fce24267f7cb.jpg',
      description: 'Элегантное платье для любого случая'
    },
    {
      id: '2',
      name: 'Белая Рубашка Классик',
      price: 4990,
      category: 'Рубашки',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      image: '/img/24828602-1f3f-4410-b495-fce24267f7cb.jpg',
      description: 'Базовая рубашка из премиум хлопка'
    },
    {
      id: '3',
      name: 'Черный Пиджак',
      price: 12990,
      category: 'Пиджаки',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      image: '/img/24828602-1f3f-4410-b495-fce24267f7cb.jpg',
      description: 'Стильный пиджак строгого кроя'
    },
    {
      id: '4',
      name: 'Белые Кроссовки',
      price: 6990,
      category: 'Обувь',
      sizes: ['36', '37', '38', '39', '40', '41', '42'],
      image: '/img/8b7de8b8-9b15-40d0-bd62-c780a0bd9855.jpg',
      description: 'Минималистичные кроссовки'
    },
    {
      id: '5',
      name: 'Черная Сумка',
      price: 7990,
      category: 'Аксессуары',
      sizes: ['Единый'],
      image: '/img/8b7de8b8-9b15-40d0-bd62-c780a0bd9855.jpg',
      description: 'Кожаная сумка ручной работы'
    },
    {
      id: '6',
      name: 'Черные Очки',
      price: 2990,
      category: 'Аксессуары',
      sizes: ['Единый'],
      image: '/img/8b7de8b8-9b15-40d0-bd62-c780a0bd9855.jpg',
      description: 'Солнцезащитные очки в стиле авиатор'
    }
  ];

  const categories = ['Все', 'Платья', 'Рубашки', 'Пиджаки', 'Обувь', 'Аксессуары'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-foreground">MONOCHROME</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#catalog" className="text-foreground hover:text-muted-foreground transition-colors">Каталог</a>
                <a href="#about" className="text-foreground hover:text-muted-foreground transition-colors">О нас</a>
                <a href="#contact" className="text-foreground hover:text-muted-foreground transition-colors">Контакты</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-foreground"
                />
              </div>
              
              <Button variant="outline" size="sm" className="relative border-foreground">
                <Icon name="ShoppingBag" size={16} />
                <span className="ml-2">Корзина</span>
                {totalItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-foreground text-background">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-foreground mb-6">
              МИНИМАЛИЗМ
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Черно-белая коллекция для тех, кто ценит простоту и элегантность
            </p>
            <Button size="lg" className="bg-foreground hover:bg-muted-foreground">
              Смотреть коллекцию
              <Icon name="ArrowDown" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-foreground text-background" : "border-foreground text-foreground hover:bg-foreground hover:text-background"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section id="catalog" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">КАТАЛОГ</h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="border-foreground hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                  <p className="text-xl font-bold">{product.price.toLocaleString()} ₽</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Размеры:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <Button
                            key={size}
                            variant="outline"
                            size="sm"
                            className="border-foreground text-foreground hover:bg-foreground hover:text-background"
                            onClick={() => addToCart(product, size)}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">О БРЕНДЕ</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            MONOCHROME — это философия минимализма в одежде. Мы создаем вещи, 
            которые никогда не выйдут из моды, используя только черный и белый цвета. 
            Каждая деталь продумана до мелочей, чтобы подчеркнуть вашу индивидуальность.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <Icon name="Shirt" size={48} className="mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Качество</h3>
              <p className="text-sm text-muted-foreground">Премиальные материалы и безупречный крой</p>
            </div>
            <div className="text-center">
              <Icon name="Palette" size={48} className="mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Стиль</h3>
              <p className="text-sm text-muted-foreground">Вечная элегантность черно-белой палитры</p>
            </div>
            <div className="text-center">
              <Icon name="Recycle" size={48} className="mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Экология</h3>
              <p className="text-sm text-muted-foreground">Ответственное производство и упаковка</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-6">КОНТАКТЫ</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} />
                  <span>г. Москва, ул. Тверская, 10</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} />
                  <span>hello@monochrome.ru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} />
                  <span>Ежедневно: 10:00-22:00</span>
                </div>
              </div>
            </div>
            
            <Card className="border-foreground">
              <CardHeader>
                <CardTitle>Обратная связь</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Ваше имя" className="border-foreground" />
                <Input placeholder="Email" type="email" className="border-foreground" />
                <textarea 
                  className="w-full min-h-[100px] px-3 py-2 border border-foreground rounded-none resize-none focus:outline-none focus:ring-2 focus:ring-foreground"
                  placeholder="Ваше сообщение"
                />
                <Button className="w-full bg-foreground hover:bg-muted-foreground">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 bg-foreground text-background p-4 rounded-none shadow-lg">
          <div className="text-sm">
            <p>Товаров в корзине: {totalItems}</p>
            <p className="font-bold">Сумма: {totalPrice.toLocaleString()} ₽</p>
            <Button size="sm" className="mt-2 bg-background text-foreground hover:bg-muted">
              Оформить заказ
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold">MONOCHROME</h3>
              <p className="text-sm text-muted">Минималистичная мода</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-background hover:bg-background hover:text-foreground">
                <Icon name="Instagram" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:bg-background hover:text-foreground">
                <Icon name="Facebook" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:bg-background hover:text-foreground">
                <Icon name="Twitter" size={16} />
              </Button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-background/20 text-center text-sm text-muted">
            © 2025 MONOCHROME. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;