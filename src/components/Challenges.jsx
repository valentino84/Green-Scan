import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { ThemeToggle } from './ThemeToggle';
import PropTypes from 'prop-types';
import {
  ArrowLeft,
  Trophy,
  Target,
  Calendar,
  Users,
  Flame,
  Star,
  Award,
  CheckCircle,
  Clock,
  Coins,
  Leaf,
  Recycle,
  TreePine,
  Droplets,
  Zap,
  Globe,
  TrendingUp
} from 'lucide-react';

export function Challenges({ onBack }) {
  const [activeTab, setActiveTab] = useState('active');
  const [userLevel] = useState(12);
  const [userXP] = useState(2850);
  const [nextLevelXP] = useState(3000);

  const challenges = [
    {
      id: 1,
      title: "Daily Recycler",
      description: "Recycle at least 1 item today",
      type: 'daily',
      progress: 1,
      target: 1,
      reward: 10,
      icon: Trophy,
      difficulty: 'easy',
      timeLeft: "6h 23m",
      completed: true
    },
    {
      id: 2,
      title: "Weekly Warrior",
      description: "Recycle 15 items this week",
      type: 'weekly',
      progress: 5,
      target: 15,
      reward: 50,
      icon: Trophy,
      difficulty: 'medium',
      timeLeft: "3d 12h",
      completed: false
    },
    {
      id: 3,
      title: "Plastic Eliminator",
      description: "Recycle 5kg of plastic this month",
      type: 'monthly',
      progress: 2,
      target: 5,
      reward: 100,
      icon: Trophy,
      difficulty: 'hard',
      timeLeft: "18d 5h",
      completed: false
    },
    {
      id: 4,
      title: "Earth Day Challenge",
      description: "Join 1000 users in recycling 100 items",
      type: 'special',
      progress: 50,
      target: 100,
      reward: 200,
      icon: Trophy,
      difficulty: 'hard',
      timeLeft: "22d 8h",
      completed: false,
      participants: 847
    },
    {
      id: 5,
      title: "Streak Master",
      description: "Maintain a 7-day recycling streak",
      type: 'weekly',
      progress: 3,
      target: 7,
      reward: 70,
      icon: Trophy,
      difficulty: 'medium',
      timeLeft: "4d 2h",
      completed: false
    },
    {
      id: 6,
      title: "Community Leader",
      description: "Help 3 neighbors start recycling",
      type: 'monthly',
      progress: 1,
      target: 3,
      reward: 120,
      icon: Trophy,
      difficulty: 'hard',
      timeLeft: "25d 10h",
      completed: false
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first recycling task",
      icon: Trophy,
      earnedDate: "2024-01-10",
      completed: true,
      rarity: 'common'
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Complete all daily challenges for a week",
      icon: Trophy,
      earnedDate: "2024-01-15",
      completed: true,
      rarity: 'rare'
    },
    {
      id: 3,
      title: "Eco Champion",
      description: "Recycle 100kg of materials",
      icon: Trophy,
      completed: false,
      rarity: 'epic'
    },
    {
      id: 4,
      title: "Planet Saver",
      description: "Prevent 1 ton of CO₂ emissions",
      icon: Trophy,
      completed: false,
      rarity: 'legendary'
    },
    {
      id: 5,
      title: "Streak Legend",
      description: "Maintain a 30-day recycling streak",
      icon: Trophy,
      completed: false,
      rarity: 'epic'
    },
    {
      id: 6,
      title: "Community Builder",
      description: "Help 10 people start recycling",
      icon: Trophy,
      completed: false,
      rarity: 'rare'
    }
  ];

  const activeChallenges = challenges.filter(c => !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    return Trophy; // placeholder icon for all types
  };

  const handleJoinChallenge = (challengeId) => {
    console.log('Joining challenge:', challengeId);
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
            <h1 className="text-green-800 dark:text-green-200 font-semibold">Challenges</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* User Level & Progress */}
        <Card className="border-green-200 dark:border-green-700 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-green-100 text-sm">Your Level</p>
                <p className="text-2xl font-bold">Level {userLevel}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Trophy className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-green-100">
                <span>{userXP} XP</span>
                <span>{nextLevelXP} XP</span>
              </div>
              <div className="w-full bg-green-400 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userXP / nextLevelXP) * 100}%` }}
                />
              </div>
              <p className="text-green-100 text-xs">
                {nextLevelXP - userXP} XP to Level {userLevel + 1}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex bg-green-100 dark:bg-green-900 rounded-lg p-1">
          <Button
            variant={activeTab === 'active' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('active')}
            className="flex-1"
          >
            Active ({activeChallenges.length})
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('completed')}
            className="flex-1"
          >
            Completed ({completedChallenges.length})
          </Button>
          <Button
            variant={activeTab === 'achievements' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('achievements')}
            className="flex-1"
          >
            Achievements
          </Button>
        </div>

        {/* Active Challenges */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeChallenges.map((challenge, index) => {
              const TypeIcon = getTypeIcon(challenge.type);
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-green-200 dark:border-green-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                              <challenge.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h3 className="text-green-800 dark:text-green-200 font-semibold">
                                {challenge.title}
                              </h3>
                              <p className="text-green-600 dark:text-green-400 text-sm">
                                {challenge.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                              <Coins className="w-4 h-4" />
                              <span className="font-medium">{challenge.reward}</span>
                            </div>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-700 dark:text-green-300">
                              {challenge.progress}/{challenge.target}
                              {challenge.type === 'monthly' && challenge.progress < challenge.target ? ' kg' : ''}
                            </span>
                            <span className="text-green-600 dark:text-green-400">
                              {Math.round((challenge.progress / challenge.target) * 100)}%
                            </span>
                          </div>
                          <Progress
                            value={(challenge.progress / challenge.target) * 100}
                            className="h-2"
                          />
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </span>
                            <span className="flex items-center text-green-600 dark:text-green-400 text-xs">
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {challenge.type}
                            </span>
                            {challenge.participants && (
                              <span className="flex items-center text-blue-600 dark:text-blue-400 text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                {challenge.participants}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center text-green-500 dark:text-green-500 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {challenge.timeLeft}
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button
                          onClick={() => handleJoinChallenge(challenge.id)}
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                        >
                          <Target className="w-4 h-4 mr-2" />
                          Continue Challenge
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {activeChallenges.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-green-300 dark:text-green-600 mx-auto mb-3" />
                <p className="text-green-600 dark:text-green-400 mb-2">No active challenges</p>
                <p className="text-green-500 dark:text-green-500 text-sm">
                  Complete current challenges to unlock new ones
                </p>
              </div>
            )}
          </div>
        )}

        {/* Completed Challenges */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-green-800 dark:text-green-200 font-semibold">
                            {challenge.title}
                          </h3>
                          <p className="text-green-600 dark:text-green-400 text-sm">
                            Completed • Earned {challenge.reward} coins
                          </p>
                        </div>
                      </div>

                      <div className="text-green-500 dark:text-green-400">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {completedChallenges.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-300 dark:text-green-600 mx-auto mb-3" />
                <p className="text-green-600 dark:text-green-400 mb-2">No completed challenges yet</p>
                <p className="text-green-500 dark:text-green-500 text-sm">
                  Start with the active challenges above
                </p>
              </div>
            )}
          </div>
        )}

        {/* Achievements */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-green-200 dark:border-green-700 ${achievement.completed
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'opacity-75'
                  }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${achievement.completed
                            ? 'bg-green-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                          }`}>
                          <achievement.icon className={`w-5 h-5 ${achievement.completed
                              ? 'text-white'
                              : 'text-gray-500 dark:text-gray-400'
                            }`} />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${achievement.completed
                              ? 'text-green-800 dark:text-green-200'
                              : 'text-gray-600 dark:text-gray-400'
                            }`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-sm ${achievement.completed
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-500 dark:text-gray-500'
                            }`}>
                            {achievement.description}
                          </p>
                          {achievement.earnedDate && (
                            <p className="text-green-500 dark:text-green-500 text-xs">
                              Earned on {achievement.earnedDate}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </span>
                        {achievement.completed && (
                          <div className="mt-1">
                            <Award className="w-5 h-5 text-yellow-500 mx-auto" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard Teaser */}
        <Card className="border-green-200 dark:border-green-700 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h4 className="text-green-800 dark:text-green-200 font-medium mb-1">
              Join the Global Leaderboard
            </h4>
            <p className="text-green-600 dark:text-green-400 text-sm mb-3">
              Compete with recyclers worldwide and climb the ranks
            </p>
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
              View Leaderboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Challenges.propTypes = { onBack: PropTypes.any };
