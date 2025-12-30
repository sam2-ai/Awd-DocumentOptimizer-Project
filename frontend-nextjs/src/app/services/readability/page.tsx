'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ReadabilityResults {
  fleschScore: number;
  gradeLevel: string;
  readingTime: string;
  wordCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  complexWords: number;
  suggestions: string[];
}

export default function ReadabilityAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<ReadabilityResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    if (inputText.split(' ').length < 20) {
      toast.error('Please enter at least 20 words for accurate analysis');
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Calculate basic metrics
    const words = inputText.trim().split(/\s+/);
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const wordCount = words.length;
    const sentenceCount = sentences.length;
    const avgWordsPerSentence = Math.round(wordCount / sentenceCount * 10) / 10;
    
    // Simulate Flesch score (simplified)
    const fleschScore = Math.min(100, Math.max(0, 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * 1.5)));
    
    // Determine grade level
    let gradeLevel = '';
    if (fleschScore >= 90) gradeLevel = '5th Grade';
    else if (fleschScore >= 80) gradeLevel = '6th Grade';
    else if (fleschScore >= 70) gradeLevel = '7th Grade';
    else if (fleschScore >= 60) gradeLevel = '8th-9th Grade';
    else if (fleschScore >= 50) gradeLevel = '10th-12th Grade';
    else if (fleschScore >= 30) gradeLevel = 'College';
    else gradeLevel = 'College Graduate';

    // Calculate reading time (average 200 words per minute)
    const readingMinutes = Math.ceil(wordCount / 200);
    const readingTime = readingMinutes === 1 ? '1 minute' : `${readingMinutes} minutes`;

    // Generate suggestions
    const suggestions: string[] = [];
    if (avgWordsPerSentence > 20) {
      suggestions.push('Consider breaking up longer sentences for better readability.');
    }
    if (fleschScore < 60) {
      suggestions.push('Try using simpler words and shorter sentences.');
    }
    if (wordCount < 100) {
      suggestions.push('Consider adding more content for a comprehensive piece.');
    }
    if (suggestions.length === 0) {
      suggestions.push('Great job! Your text has good readability.');
    }

    setResults({
      fleschScore: Math.round(fleschScore),
      gradeLevel,
      readingTime,
      wordCount,
      sentenceCount,
      avgWordsPerSentence,
      avgSyllablesPerWord: 1.5,
      complexWords: Math.round(wordCount * 0.1),
      suggestions
    });

    setIsAnalyzing(false);
    toast.success('Analysis complete!');
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const handleClear = () => {
    setInputText('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Readability Analyzer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze your content&apos;s readability and get actionable suggestions for improvement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Text</h3>
              <span className="text-sm text-gray-500">{inputText.split(/\s+/).filter(w => w).length} words</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here to analyze its readability..."
              className="w-full h-96 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={analyzeText}
                disabled={isAnalyzing || !inputText.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Readability'
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

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {results ? (
              <>
                {/* Main Score */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Readability Score</h3>
                  <div className="flex items-center justify-center">
                    <div className={`w-32 h-32 rounded-full ${getScoreBgColor(results.fleschScore)} flex items-center justify-center`}>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${getScoreColor(results.fleschScore)}`}>
                          {results.fleschScore}
                        </div>
                        <div className="text-sm text-gray-600">Flesch Score</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                      {results.gradeLevel} Reading Level
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">{results.wordCount}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">{results.sentenceCount}</div>
                    <div className="text-sm text-gray-600">Sentences</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">{results.avgWordsPerSentence}</div>
                    <div className="text-sm text-gray-600">Avg Words/Sentence</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">{results.readingTime}</div>
                    <div className="text-sm text-gray-600">Reading Time</div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestions</h3>
                  <ul className="space-y-3">
                    {results.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
                <p className="text-gray-600">Enter your text and click &quot;Analyze Readability&quot; to see detailed metrics.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Score Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Flesch Reading Ease Score Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { range: '90-100', level: '5th Grade', desc: 'Very Easy' },
              { range: '80-89', level: '6th Grade', desc: 'Easy' },
              { range: '70-79', level: '7th Grade', desc: 'Fairly Easy' },
              { range: '60-69', level: '8th-9th', desc: 'Standard' },
              { range: '50-59', level: '10th-12th', desc: 'Fairly Difficult' },
              { range: '0-49', level: 'College+', desc: 'Difficult' }
            ].map((item) => (
              <div key={item.range} className="bg-white rounded-xl p-4 text-center shadow">
                <div className="font-bold text-gray-900">{item.range}</div>
                <div className="text-sm text-gray-600">{item.level}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
