import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (articleId: string) => {
    if (!cartItems.includes(articleId)) {
      setCartItems([...cartItems, articleId]);
    }
  };

  const removeFromCart = (articleId: string) => {
    setCartItems(cartItems.filter(id => id !== articleId));
  };

  const newsArticles = [
    {
      id: '1',
      title: 'Новая транспортная развязка открыта в центре города',
      summary: 'Масштабный инфраструктурный проект завершён досрочно',
      category: 'Транспорт',
      date: '30 июля 2025',
      readTime: '3 мин'
    },
    {
      id: '2',
      title: 'Цифровая трансформация городских услуг',
      summary: 'Внедрение новых технологий упростит взаимодействие с администрацией',
      category: 'Технологии',
      date: '29 июля 2025',
      readTime: '5 мин'
    },
    {
      id: '3',
      title: 'Экологические инициативы района',
      summary: 'Запуск программы по озеленению и улучшению экологии',
      category: 'Экология',
      date: '28 июля 2025',
      readTime: '4 мин'
    }
  ];

  const categories = [
    { name: 'Новости', count: 156, icon: 'Newspaper' },
    { name: 'Транспорт', count: 43, icon: 'Car' },
    { name: 'Экология', count: 28, icon: 'Leaf' },
    { name: 'Технологии', count: 31, icon: 'Smartphone' },
    { name: 'Образование', count: 19, icon: 'GraduationCap' },
    { name: 'Здравоохранение', count: 22, icon: 'Heart' }
  ];

  const filteredArticles = newsArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">Питерский Щит</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#news" className="text-foreground hover:text-primary transition-colors">Главная</a>
                <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">Контакты</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск новостей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button variant="outline" size="sm" className="relative">
                <Icon name="ShoppingCart" size={16} />
                <span className="ml-2">Сохранённое</span>
                {cartItems.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Информационный портал города
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Актуальные новости, события и официальная информация для жителей и гостей города
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">
                <Icon name="Newspaper" size={20} className="mr-2" />
                Читать новости
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Bell" size={20} className="mr-2" />
                Подписаться на уведомления
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main News Section */}
      <section id="news" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Главные новости</h2>
            <Button variant="outline">
              <Icon name="Filter" size={16} className="mr-2" />
              Фильтры
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => 
                        cartItems.includes(article.id) 
                          ? removeFromCart(article.id)
                          : addToCart(article.id)
                      }
                    >
                      <Icon 
                        name={cartItems.includes(article.id) ? "BookmarkCheck" : "Bookmark"} 
                        size={16} 
                        className={cartItems.includes(article.id) ? "text-primary" : "text-muted-foreground"}
                      />
                    </Button>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.summary}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <Button className="w-full mt-4">
                    Читать далее
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Каталог разделов</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-md transition-all cursor-pointer hover:bg-primary/5">
                <CardContent className="p-6 text-center">
                  <Icon name={category.icon as any} size={32} className="mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} материалов</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-6">Контактная информация</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <span>г. Санкт-Петербург, Невский проспект, 1</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <span>+7 (812) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span>info@pitershield.ru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <span>Пн-Пт: 9:00-18:00</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Обратная связь</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input placeholder="Email" type="email" />
                <textarea 
                  className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ваше сообщение"
                />
                <Button className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить сообщение
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Питерский Щит</h3>
              <p className="text-sm text-muted-foreground">Информационный портал города</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Facebook" size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Twitter" size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Instagram" size={16} />
              </Button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
            © 2025 Питерский Щит. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;