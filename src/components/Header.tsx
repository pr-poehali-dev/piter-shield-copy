import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalItems: number;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  totalItems,
  children 
}) => {
  return (
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
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative border-foreground">
                  <Icon name="ShoppingBag" size={16} />
                  <span className="ml-2">Корзина</span>
                  {totalItems > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-foreground text-background">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              {children}
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;