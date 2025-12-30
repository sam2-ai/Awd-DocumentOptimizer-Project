'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AiHumanizer() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [humanizationLevel, setHumanizationLevel] = useState('balanced');

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to humanize');
      return;
    }

    if (inputText.length < 50) {
      toast.error('Please enter at least 50 characters');
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate humanized output
    const humanized = inputText
      .replace(/Additionally,/g, 'Also,')
      .replace(/Furthermore,/g, 'Plus,')
      .replace(/In conclusion,/g, 'To wrap up,')
      .replace(/It is important to note that/g, 'Keep in mind that')
      .replace(/utilize/g, 'use')
      .replace(/implement/g, 'put in place')
      .replace(/facilitate/g, 'help with')
      .replace(/Subsequently,/g, 'Then,')
      .replace(/Consequently,/g, 'So,')
      .replace(/Nevertheless,/g, 'Still,');

    setOutputText(humanized);
    setIsProcessing(false);
    toast.success('Text humanized successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Text Humanizer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform AI-generated content into natural, human-like text that bypasses detection algorithms.
          </p>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Humanization Level</h3>
          <div className="flex flex-wrap gap-4">
            {['light', 'balanced', 'aggressive'].map((level) => (
              <button
                key={level}
                onClick={() => setHumanizationLevel(level)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  humanizationLevel === level
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            {humanizationLevel === 'light' && 'Minimal changes, preserves most of the original structure.'}
            {humanizationLevel === 'balanced' && 'Moderate changes for natural flow while maintaining meaning.'}
            {humanizationLevel === 'aggressive' && 'Maximum humanization, significantly restructures the text.'}
          </p>
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
              <h3 className="text-lg font-semibold text-gray-900">Input Text</h3>
              <span className="text-sm text-gray-500">{inputText.length} characters</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here..."
              className="w-full h-80 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleHumanize}
                disabled={isProcessing || !inputText.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Humanizing...
                  </span>
                ) : (
                  'Humanize Text'
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
              <h3 className="text-lg font-semibold text-gray-900">Humanized Output</h3>
              {outputText && (
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
              {outputText ? (
                <p className="text-gray-800 whitespace-pre-wrap">{outputText}</p>
              ) : (
                <p className="text-gray-400 italic">Humanized text will appear here...</p>
              )}
            </div>
            {outputText && (
              <div className="mt-4 p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Text humanized successfully!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Your text has been transformed to appear more natural and human-written.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Tips for Best Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Use Complete Paragraphs</h4>
                <p className="text-sm text-gray-600">Provide full paragraphs for better context understanding.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Review the Output</h4>
                <p className="text-sm text-gray-600">Always review and make minor adjustments if needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Adjust Settings</h4>
                <p className="text-sm text-gray-600">Try different humanization levels for optimal results.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
