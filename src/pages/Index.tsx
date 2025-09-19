import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const products: Product[] = [
    { id: 1, name: 'Холодильник Samsung RB37', price: 89990, originalPrice: 99990, image: 'img/20e4b785-6907-4d62-95c1-fc81873b8668.jpg', rating: 4.8, reviews: 124, category: 'Холодильники', badge: 'Хит продаж' },
    { id: 2, name: 'Стиральная машина LG F4V5', price: 45990, image: 'img/20e4b785-6907-4d62-95c1-fc81873b8668.jpg', rating: 4.7, reviews: 89, category: 'Стиральные машины' },
    { id: 3, name: 'Микроволновка Panasonic NN', price: 12990, originalPrice: 15990, image: 'img/20e4b785-6907-4d62-95c1-fc81873b8668.jpg', rating: 4.6, reviews: 156, category: 'Микроволновки', badge: 'Скидка' },
    { id: 4, name: 'Посудомойка Bosch SMS24', price: 32990, image: 'img/20e4b785-6907-4d62-95c1-fc81873b8668.jpg', rating: 4.9, reviews: 67, category: 'Посудомойки' },
  ];

  const reviews = [
    { id: 1, author: 'Анна К.', rating: 5, text: 'Отличный холодильник! Очень тихий и просторный.', product: 'Холодильник Samsung RB37' },
    { id: 2, author: 'Михаил С.', rating: 4, text: 'Стиральная машина работает без нареканий уже полгода.', product: 'Стиральная машина LG F4V5' },
    { id: 3, author: 'Елена Д.', rating: 5, text: 'Быстрая доставка, качественная техника. Рекомендую!', product: 'Микроволновка Panasonic' },
  ];

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const addToCompare = (product: Product) => {
    if (compareItems.length < 3 && !compareItems.find(item => item.id === product.id)) {
      setCompareItems(prev => [...prev, product]);
    }
  };

  const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-coral-mint rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">ТехноМир</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Доставка</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Гарантия</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Акции</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </div>

            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative hover-scale">
                    <Icon name="Scale" size={20} />
                    {compareItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {compareItems.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Сравнение товаров</SheetTitle>
                    <SheetDescription>
                      Сравните характеристики выбранных товаров
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {compareItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-primary font-bold">{item.price.toLocaleString()} ₽</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCompareItems(prev => prev.filter(i => i.id !== item.id))}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="relative hover-scale gradient-coral-mint">
                    <Icon name="ShoppingCart" size={20} />
                    {cartItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      Ваши выбранные товары
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    {cartItems.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                              <p className="text-primary font-bold">{(item.price * item.quantity).toLocaleString()} ₽</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold">Итого:</span>
                            <span className="font-bold text-lg text-primary">{totalCartPrice.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full gradient-coral-mint hover-scale">
                            Оформить заказ
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Лучшая <span className="text-gradient">бытовая техника</span>
              <br />для вашего дома
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Широкий ассортимент качественной техники от ведущих производителей. 
              Быстрая доставка, гарантия качества и лучшие цены.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-coral-mint hover-scale text-lg px-8">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="hover-scale text-lg px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                Консультация
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 gradient-coral-mint rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">Доставим в день заказа</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 gradient-coral-mint rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">До 5 лет гарантии</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 gradient-coral-mint rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Поддержка 24/7</h3>
              <p className="text-muted-foreground">Помощь в любое время</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 gradient-coral-mint rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={32} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Удобная оплата</h3>
              <p className="text-muted-foreground">Рассрочка 0%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Популярные <span className="text-gradient">товары</span>
          </h2>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="fridge">Холодильники</TabsTrigger>
              <TabsTrigger value="washing">Стиральные</TabsTrigger>
              <TabsTrigger value="micro">Микроволновки</TabsTrigger>
              <TabsTrigger value="dish">Посудомойки</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <Card key={product.id} className="hover-scale animate-fade-in group">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {product.badge && (
                        <Badge className="absolute top-2 left-2 gradient-coral-mint">
                          {product.badge}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => addToCompare(product)}
                      >
                        <Icon name="Scale" size={16} />
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="Star" 
                              size={16} 
                              className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                          {product.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              {product.originalPrice.toLocaleString()} ₽
                            </p>
                          )}
                        </div>
                      </div>
                      <Button 
                        className="w-full gradient-coral-mint hover-scale"
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Отзывы <span className="text-gradient">покупателей</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <Card key={review.id} className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={16} 
                          className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <CardDescription>{review.product}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-coral-mint rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">ТехноМир</h3>
              </div>
              <p className="text-gray-400">Лучшая бытовая техника для вашего комфорта</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Холодильники</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Стиральные машины</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Микроволновки</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Посудомойки</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Акции</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@technomir.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Техническая, 1
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ТехноМир. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;