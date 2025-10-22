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
  Camera,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  Coins,
  Trophy,
  Leaf,
  CheckCircle,
  Star
} from 'lucide-react';

export function Profile({ onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'enduser@123',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    location: 'New York, NY',
    joinDate: '2023-06-15'
  });
  const [editData, setEditData] = useState(profileData);

  const stats = {
    totalRecycled: 50,
    greenCoins: 1200,
    co2Saved: 200,
    rank: 'Eco Warrior',
    level: 5,
    nextLevelCoins: 150
  };

  const achievements = [
    { name: 'First Recycle', icon: Star, completed: true },
    { name: '10kg Champion', icon: Star, completed: true },
    { name: 'Week Streak', icon: Star, completed: false },
    { name: '100 Items', icon: Star, completed: false }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
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
            <h1 className="text-green-800 dark:text-green-200 font-semibold">My Profile</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Picture & Basic Info */}
        <Card className="border-green-200 dark:border-green-700">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-green-600 dark:text-green-400" />
                  )}
                </div>

                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Name & Level */}
              <div className="text-center">
                <h2 className="text-green-800 dark:text-green-200 font-semibold text-xl">
                  {profileData.name}
                </h2>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <span className="text-green-600 dark:text-green-400 text-sm">{stats.rank}</span>
                  <span className="text-green-400 dark:text-green-500">•</span>
                  <span className="text-green-600 dark:text-green-400 text-sm">Level {stats.level}</span>
                </div>
              </div>

              {/* Level Progress */}
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-xs text-green-600 dark:text-green-400 mb-1">
                  <span>Level {stats.level}</span>
                  <span>{stats.nextLevelCoins} to Level {stats.level + 1}</span>
                </div>
                <div className="w-full bg-green-100 dark:bg-green-900 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: '70%' }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-green-200 dark:border-green-700 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.greenCoins.toLocaleString()}</p>
              <p className="text-green-100 text-sm">GreenCoins</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-700 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-4 text-center">
              <Leaf className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalRecycled}kg</p>
              <p className="text-blue-100 text-sm">Recycled</p>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-green-700 dark:text-green-300">Full Name</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-green-700 dark:text-green-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-green-700 dark:text-green-300">Phone</Label>
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="dob" className="text-green-700 dark:text-green-300">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={editData.dateOfBirth}
                    onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-green-700 dark:text-green-300">Location</Label>
                  <Input
                    id="location"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200">{profileData.email}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200">{profileData.phone}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200">
                    {new Date(profileData.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200">{profileData.location}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-2 transition-all ${achievement.completed
                      ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700'
                      : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    <achievement.icon
                      className={`w-5 h-5 ${achievement.completed
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400 dark:text-gray-600'
                        }`}
                    />
                    <span className={`text-sm ${achievement.completed
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-gray-600 dark:text-gray-400'
                      }`}>
                      {achievement.name}
                    </span>
                  </div>
                  {achievement.completed && (
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="border-green-200 dark:border-green-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <Leaf className="w-5 h-5 mr-2" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.co2Saved}kg</p>
              <p className="text-green-700 dark:text-green-300 text-sm">CO₂ Emissions Saved</p>
              <p className="text-green-600 dark:text-green-400 text-xs mt-2">
                Equivalent to planting 3 trees 🌱
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Profile.propTypes = { onBack: PropTypes.func };
