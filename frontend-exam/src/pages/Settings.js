import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Settings as SettingsIcon, Bell, Shield, Globe, Trash2, Save, RotateCcw, Lock, Moon, Mail, MessageSquare, Tag } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [promotions, setPromotions] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');
  const [timeZone, setTimeZone] = useState('America/New_York');
  const [activeTab, setActiveTab] = useState('general');

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setNewsletter(false);
    setDarkMode(false);
    setEmailNotifications(true);
    setSmsNotifications(false);
    setPromotions(true);
    setTwoFactor(false);
    setLanguage('English');
    setCurrency('USD');
    setTimeZone('America/New_York');
  };

  const handleChangePassword = () => {
    alert('Password change feature not implemented');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion feature not implemented');
    }
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
    </label>
  );

  const SettingItem = ({ icon: Icon, label, description, children }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-4 flex-1">
        {Icon && (
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
        )}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-900 mb-1">{label}</label>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-1">
              {tabs.map(tab => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <TabIcon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
                  <div className="space-y-4">
                    <SettingItem
                      icon={Bell}
                      label="Enable Notifications"
                      description="Receive notifications about your orders and updates"
                    >
                      <ToggleSwitch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                    </SettingItem>

                    <SettingItem
                      icon={Mail}
                      label="Subscribe to Newsletter"
                      description="Get the latest news, updates, and special offers"
                    >
                      <ToggleSwitch checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                    </SettingItem>

                    <SettingItem
                      icon={Moon}
                      label="Dark Mode"
                      description="Switch to dark theme for better viewing at night"
                    >
                      <ToggleSwitch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
                    </SettingItem>
                  </div>
                </div>
              )}

              {/* Notification Preferences */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    <SettingItem
                      icon={Mail}
                      label="Email Notifications"
                      description="Receive order updates and promotions via email"
                    >
                      <ToggleSwitch checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
                    </SettingItem>

                    <SettingItem
                      icon={MessageSquare}
                      label="SMS Notifications"
                      description="Get order updates via text message"
                    >
                      <ToggleSwitch checked={smsNotifications} onChange={(e) => setSmsNotifications(e.target.checked)} />
                    </SettingItem>

                    <SettingItem
                      icon={Tag}
                      label="Promotional Offers"
                      description="Receive exclusive deals and discounts"
                    >
                      <ToggleSwitch checked={promotions} onChange={(e) => setPromotions(e.target.checked)} />
                    </SettingItem>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-4">
                    <SettingItem
                      icon={Shield}
                      label="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                    >
                      <ToggleSwitch checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} />
                    </SettingItem>

                    <SettingItem
                      icon={Lock}
                      label="Change Password"
                      description="Update your account password"
                    >
                      <button
                        onClick={handleChangePassword}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700"
                      >
                        Change
                      </button>
                    </SettingItem>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
                  <div className="space-y-4">
                    <SettingItem
                      icon={Globe}
                      label="Language"
                      description="Select your preferred language"
                    >
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white min-w-[150px]"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </SettingItem>

                    <SettingItem
                      icon={SettingsIcon}
                      label="Currency"
                      description="Choose your preferred currency"
                    >
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white min-w-[150px]"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                      </select>
                    </SettingItem>

                    <SettingItem
                      icon={SettingsIcon}
                      label="Time Zone"
                      description="Set your local time zone"
                    >
                      <select
                        value={timeZone}
                        onChange={(e) => setTimeZone(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white min-w-[200px]"
                      >
                        <option value="America/New_York">Eastern Time (US & Canada)</option>
                        <option value="America/Chicago">Central Time (US & Canada)</option>
                        <option value="America/Denver">Mountain Time (US & Canada)</option>
                        <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                      </select>
                    </SettingItem>
                  </div>
                </div>
              )}

              {/* Danger Zone */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-900 mb-1">Danger Zone</h3>
                      <p className="text-sm text-red-700 mb-4">
                        Permanently delete your account and all data. This action cannot be undone.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  <Save className="w-5 h-5" />
                  Save All Settings
                </button>
                <button
                  onClick={handleResetSettings}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;