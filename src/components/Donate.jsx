import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ThemeToggle } from './ThemeToggle';
import PropTypes from 'prop-types';
import {
  ArrowLeft,
  Heart,
  Coins,
  TreePine,
  Droplets,
  Wind,
  Globe,
  Users,
  CheckCircle,
  Star,
  Award,
  Target
} from 'lucide-react';

export function Donate({ onBack }) {
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState('100');
  const [userCoins] = useState(1250);

  const causes = [
    {
      id: 1,
      name: "Ocean Cleanup",
      description: "Remove plastic waste from oceans worldwide",
      icon: Globe,
      goal: 5000,
      raised: 1200,
      coinsNeeded: 100,
      impact: "1kg of ocean plastic removed",
      color: "blue"
    },
    {
      id: 2,
      name: "Tree Planting",
      description: "Plant trees in deforested areas",
      icon: TreePine,
      goal: 3000,
      raised: 800,
      coinsNeeded: 50,
      impact: "2 trees planted",
      color: "green"
    },
    {
      id: 3,
      name: "Clean Air Initiative",
      description: "Support renewable energy projects",
      icon: Wind,
      goal: 2000,
      raised: 600,
      coinsNeeded: 80,
      impact: "1 day of clean energy for 5 homes",
      color: "sky"
    },
    {
      id: 4,
      name: "Wildlife Conservation",
      description: "Protect endangered species habitats",
      icon: Users,
      goal: 1500,
      raised: 400,
      coinsNeeded: 120,
      impact: "1 square meter of habitat protected",
      color: "emerald"
    },
    {
      id: 5,
      name: "Community Gardens",
      description: "Create urban green spaces",
      icon: Target,
      goal: 1000,
      raised: 300,
      coinsNeeded: 60,
      impact: "1 square foot of community garden",
      color: "lime"
    }
  ];

  const [donations, setDonations] = useState([
    { cause: "Ocean Cleanup", amount: 100, date: "2024-01-15", impact: "2kg plastic removed" },
    { cause: "Tree Planting", amount: 50, date: "2024-01-10", impact: "2 trees planted" },
    { cause: "Clean Air Initiative", amount: 80, date: "2024-01-05", impact: "Clean energy supported" }
  ]);

  const handleDonate = () => {
    if (selectedCause && parseInt(donationAmount) <= userCoins) {
      const cause = causes.find(c => c.id === selectedCause);
      if (cause) {
        setDonations(prev => [{
          cause: cause.name,
          amount: parseInt(donationAmount),
          date: new Date().toISOString().split('T')[0],
          impact: cause.impact
        }, ...prev]);

        setSelectedCause(null);
        setDonationAmount('100');
      }
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'from-blue-500 to-cyan-500 border-blue-200',
      green: 'from-green-500 to-emerald-500 border-green-200',
      sky: 'from-sky-500 to-blue-500 border-sky-200',
      emerald: 'from-emerald-500 to-teal-500 border-emerald-200',
      lime: 'from-lime-500 to-green-500 border-lime-200'
    };
    return colorMap[color] || 'from-green-500 to-emerald-500 border-green-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900 pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-green-800 dark:text-green-200 font-semibold">Donate GreenCoins</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* User Coins */}
        <Card className="border-green-200 dark:border-green-700 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Available GreenCoins</p>
              <p className="text-2xl font-bold">{userCoins.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Coins className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Causes */}
        <div className="space-y-4">
          <h3 className="text-green-800 dark:text-green-200 font-semibold">Support a Cause</h3>
          {causes.map((cause, index) => (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`border-2 transition-all cursor-pointer ${selectedCause === cause.id
                  ? 'border-green-400 dark:border-green-500 shadow-lg'
                  : 'border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600'
                  }`}
                onClick={() => setSelectedCause(cause.id)}
              >
                <CardContent className="p-4 flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${getColorClasses(cause.color)}`}>
                    <cause.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-green-800 dark:text-green-200 font-medium">{cause.name}</h4>
                      <div className="text-right">
                        <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                          {cause.coinsNeeded} coins
                        </p>
                        <p className="text-green-500 dark:text-green-500 text-xs">{cause.impact}</p>
                      </div>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm">{cause.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-green-600 dark:text-green-400">
                        <span>{cause.raised.toLocaleString()} raised</span>
                        <span>{cause.goal.toLocaleString()} goal</span>
                      </div>
                      <div className="w-full bg-green-100 dark:bg-green-900 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Donation Form */}
        {selectedCause && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Make a Donation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount" className="text-green-700 dark:text-green-300">
                    Donation Amount (GreenCoins)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    min="1"
                    max={userCoins}
                    className="mt-1"
                  />
                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">Maximum coins: {userCoins}</p>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[100, 250, 500, 1000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDonationAmount(amount.toString())}
                      disabled={amount > userCoins}
                      className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>

                {parseInt(donationAmount) > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      <strong>Your Impact:</strong><br />
                      With {donationAmount} coins, you'll enable:{' '}
                      {causes.find(c => c.id === selectedCause)?.impact}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleDonate}
                  disabled={!donationAmount || parseInt(donationAmount) > userCoins || parseInt(donationAmount) < 1}
                  className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate {donationAmount} GreenCoins
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recent Donations */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Recent Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {donations.length > 0 ? (
              <div className="space-y-3">
                {donations.map((donation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium">{donation.cause}</p>
                      <p className="text-green-600 dark:text-green-400 text-sm">{donation.impact}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-700 dark:text-green-300 font-medium">{donation.amount} coins</p>
                      <p className="text-green-500 dark:text-green-500 text-xs">{donation.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Heart className="w-12 h-12 text-green-300 dark:text-green-600 mx-auto mb-3" />
                <p className="text-green-600 dark:text-green-400">No donations yet</p>
                <p className="text-green-500 dark:text-green-500 text-sm">Start making a difference today</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Donate.propTypes = { onBack: PropTypes.any };
