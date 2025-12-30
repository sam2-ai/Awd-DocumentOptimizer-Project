'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

const usageData = [
  { name: 'Mon', humanizer: 12, prompt: 8, readability: 5, keyword: 3 },
  { name: 'Tue', humanizer: 19, prompt: 12, readability: 8, keyword: 6 },
  { name: 'Wed', humanizer: 15, prompt: 10, readability: 12, keyword: 4 },
  { name: 'Thu', humanizer: 22, prompt: 15, readability: 9, keyword: 8 },
  { name: 'Fri', humanizer: 28, prompt: 18, readability: 14, keyword: 10 },
  { name: 'Sat', humanizer: 18, prompt: 9, readability: 6, keyword: 5 },
  { name: 'Sun', humanizer: 14, prompt: 7, readability: 4, keyword: 3 },
];

const recentActivity = [
  { id: 1, type: 'humanizer', title: 'Blog post humanized', time: '2 hours ago', status: 'completed' },
  { id: 2, type: 'prompt', title: 'Marketing prompt optimized', time: '4 hours ago', status: 'completed' },
  { id: 3, type: 'readability', title: 'Article analyzed', time: '6 hours ago', status: 'completed' },
  { id: 4, type: 'keyword', title: 'SEO keywords checked', time: '1 day ago', status: 'completed' },
  { id: 5, type: 'humanizer', title: 'Product description', time: '1 day ago', status: 'completed' },
];

function DashboardContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDocuments: 0,
    humanizedTexts: 0,
    optimizedPrompts: 0,
    analyzedDocs: 0
  });

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalDocuments: 128,
        humanizedTexts: 45,
        optimizedPrompts: 32,
        analyzedDocs: 51
      });
    }, 500);
  }, []);

  const quickActions = [
    {
      title: 'AI Humanizer',
      description: 'Transform AI text to human-like content',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      link: '/services/humanizer',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Prompt Optimizer',
      description: 'Enhance your AI prompts',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      link: '/services/prompt-optimizer',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Readability Analyzer',
      description: 'Check content readability',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/services/readability',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Keyword Checker',
      description: 'Analyze keyword density',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      link: '/services/keyword-checker',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const statCards = [
    { label: 'Total Documents', value: stats.totalDocuments, icon: '📄', color: 'bg-blue-500' },
    { label: 'Humanized Texts', value: stats.humanizedTexts, icon: '🤖', color: 'bg-purple-500' },
    { label: 'Optimized Prompts', value: stats.optimizedPrompts, icon: '✨', color: 'bg-green-500' },
    { label: 'Analyzed Docs', value: stats.analyzedDocs, icon: '📊', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || user?.name || 'User'}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here&apos;s what&apos;s happening with your documents today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.link}
                className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Usage Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Usage</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line type="monotone" dataKey="humanizer" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                  <Line type="monotone" dataKey="prompt" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                  <Line type="monotone" dataKey="readability" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Service Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Service Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="humanizer" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="prompt" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="readability" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="keyword" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'humanizer' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'prompt' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'readability' ? 'bg-green-100 text-green-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {activity.type === 'humanizer' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )}
                    {activity.type === 'prompt' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    )}
                    {activity.type === 'readability' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {activity.type === 'keyword' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
