'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function PromptOptimizer() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [outputPrompt, setOutputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [category, setCategory] = useState('general');
  const [tone, setTone] = useState('professional');

  const categories = [
    { id: 'general', label: 'General', icon: '📝' },
    { id: 'creative', label: 'Creative Writing', icon: '✨' },
    { id: 'technical', label: 'Technical', icon: '⚙️' },
    { id: 'marketing', label: 'Marketing', icon: '📢' },
    { id: 'academic', label: 'Academic', icon: '📚' },
    { id: 'coding', label: 'Coding', icon: '💻' }
  ];

  const tones = [
    { id: 'professional', label: 'Professional' },
    { id: 'casual', label: 'Casual' },
    { id: 'formal', label: 'Formal' },
    { id: 'friendly', label: 'Friendly' }
  ];

  const handleOptimize = async () => {
    if (!inputPrompt.trim()) {
      toast.error('Please enter a prompt to optimize');
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate optimized output
    const optimized = `[Optimized for ${category} - ${tone} tone]

${inputPrompt}

Additional context:
- Please provide detailed and comprehensive responses
- Use clear and structured formatting
- Include relevant examples where appropriate
- Ensure accuracy and factual correctness

Output format:
- Use bullet points for lists
- Include headers for different sections
- Provide a summary at the end if applicable`;

    setOutputPrompt(optimized);
    setIsProcessing(false);
    toast.success('Prompt optimized successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputPrompt);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setInputPrompt('');
    setOutputPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prompt Optimizer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your AI prompts for better, more accurate results with intelligent optimization.
          </p>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                      category === cat.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tone</h3>
              <div className="flex flex-wrap gap-3">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      tone === t.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Original Prompt</h3>
              <span className="text-sm text-gray-500">{inputPrompt.length} characters</span>
            </div>
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full h-80 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleOptimize}
                disabled={isProcessing || !inputPrompt.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Optimizing...
                  </span>
                ) : (
                  'Optimize Prompt'
                )}
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Clear
              </button>
            </div>
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Optimized Prompt</h3>
              {outputPrompt && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              )}
            </div>
            <div className="w-full h-80 p-4 border border-gray-200 rounded-xl bg-gray-50 overflow-auto">
              {outputPrompt ? (
                <pre className="text-gray-800 whitespace-pre-wrap font-sans">{outputPrompt}</pre>
              ) : (
                <p className="text-gray-400 italic">Optimized prompt will appear here...</p>
              )}
            </div>
            {outputPrompt && (
              <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-2 text-purple-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Prompt optimized!</span>
                </div>
                <p className="text-sm text-purple-600 mt-1">
                  Your prompt has been enhanced with context, formatting, and clarity improvements.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Examples Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Example Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Blog Post', prompt: 'Write a blog post about sustainable living' },
              { title: 'Code Review', prompt: 'Review this Python function for best practices' },
              { title: 'Marketing Copy', prompt: 'Create ad copy for a new fitness app' },
              { title: 'Technical Doc', prompt: 'Explain how REST APIs work' }
            ].map((example) => (
              <button
                key={example.title}
                onClick={() => setInputPrompt(example.prompt)}
                className="text-left p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200"
              >
                <h4 className="font-semibold text-gray-900 mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600">{example.prompt}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
