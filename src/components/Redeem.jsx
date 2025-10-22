import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import PropTypes from 'prop-types';
import {
  ArrowLeft,
  Coins,
  Gift,
  Star,
  Sparkles,
  Trophy
} from 'lucide-react';

export function Redeem({ onBack, onGoToEarn }) {
  const [greenCoins] = useState(1250);
  const [selectedCard, setSelectedCard] = useState(null);

  const giftCards = [
    {
      id: 1,
      brand: 'Amazon',
      logo: '🛒',
      denomination: 500,
      coinsRequired: 1000,
      discount: 10,
      category: 'shopping',
      description: 'Shop for everything you need',
      popular: true
    },
    {
      id: 2,
      brand: 'Amazon',
      logo: '🛒',
      denomination: 250,
      coinsRequired: 500,
      discount: 5,
      category: 'shopping',
      description: 'Shop for everything you need'
    },
    {
      id: 3,
      brand: 'Flipkart',
      logo: '🛍️',
      denomination: 500,
      coinsRequired: 1000,
      discount: 15,
      category: 'shopping',
      description: 'India\'s largest online marketplace',
      popular: true
    },
    {
      id: 4,
      brand: 'Croma',
      logo: '📱',
      denomination: 1000,
      coinsRequired: 2000,
      discount: 20,
      category: 'electronics',
      description: 'Electronics & gadgets store'
    }
  ];

  const handleRedeem = (card) => {
    if (greenCoins >= card.coinsRequired) {
      setSelectedCard(card.id);
      alert(`Successfully redeemed ${card.brand} ₹${card.denomination} voucher for ${card.coinsRequired} GreenCoins`);
    } else {
      alert(`You need ${card.coinsRequired - greenCoins} more GreenCoins to redeem this voucher.`);
    }
  };

  const canAfford = (coinsRequired) => greenCoins >= coinsRequired;

  const categoryIcons = {
    shopping: Gift,
    electronics: Gift,
    general: Gift
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo size="small" showText={false} animated={false} />
            <h1 className="text-green-800 dark:text-green-200">Redeem GreenCoins</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Balance Card */}
        <Card className="border-green-200 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardContent className="p-6 text-center">
            <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Coins className="w-8 h-8" />
            </div>
            <p className="text-green-100 text-sm mb-2">Available GreenCoins</p>
            <p className="text-3xl font-bold mb-4">{greenCoins.toLocaleString()}</p>
            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={onGoToEarn}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Earn More Coins
            </Button>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Trophy className="w-5 h-5 text-green-600" />
              <h3 className="text-green-800 dark:text-green-200">How Redemption Works</h3>
            </div>
            <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <li>• Exchange GreenCoins for popular brand vouchers</li>
              <li>• Vouchers are delivered instantly via email</li>
              <li>• Use vouchers online or in-store</li>
              <li>• Earn more coins by recycling with us</li>
            </ul>
          </CardContent>
        </Card>

        {/* Gift Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-green-800 dark:text-green-200">Available Vouchers</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {giftCards.length} Available
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {giftCards.map((card) => {
              const IconComponent = categoryIcons[card.category] || Gift;
              const affordable = canAfford(card.coinsRequired);

              return (
                <Card
                  key={card.id}
                  className={`border-green-200 transition-all duration-200 ${affordable ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'
                    } ${card.popular ? 'ring-2 ring-yellow-300' : ''}`}
                  onClick={() => affordable && handleRedeem(card)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{card.logo}</div>
                        <div>
                          <CardTitle className="text-lg text-green-800 dark:text-green-200">
                            {card.brand}
                          </CardTitle>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            ₹{card.denomination} Voucher
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-1">
                        {card.popular && (
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {card.discount && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                            {card.discount}% Off
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{card.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-green-600" />
                        <span className={`text-sm font-medium ${affordable ? 'text-green-700 dark:text-green-300' : 'text-red-600 dark:text-red-400'
                          }`}>
                          {card.coinsRequired} Coins
                        </span>
                      </div>

                      <Button
                        size="sm"
                        disabled={!affordable}
                        className={affordable ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}
                      >
                        <Gift className="w-3 h-3 mr-1" />
                        {affordable ? 'Redeem' : 'Not Enough'}
                      </Button>
                    </div>

                    {!affordable && (
                      <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                        Need {card.coinsRequired - greenCoins} more coins
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-green-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
          <CardContent className="p-6 text-center">
            <Sparkles className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-green-800 dark:text-green-200 mb-2">Need More Coins?</h3>
            <p className="text-green-600 dark:text-green-400 text-sm mb-4">
              Start recycling today to earn more GreenCoins and unlock amazing rewards
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={onGoToEarn}
            >
              <Coins className="w-4 h-4 mr-2" />
              Start Earning
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Redeem.propTypes = { onBack: PropTypes.any, onGoToEarn: PropTypes.any };
