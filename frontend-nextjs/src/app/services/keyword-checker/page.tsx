'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface KeywordResult {
  keyword: string;
  count: number;
  density: number;
}

interface AnalysisResults {
  totalWords: number;
  uniqueWords: number;
  topKeywords: KeywordResult[];
  targetKeywordDensity: number | null;
  suggestions: string[];
}

export default function KeywordChecker() {
  const [inputText, setInputText] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeKeywords = async () => {
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

    // Calculate word frequencies
    const words = inputText.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const totalWords = words.length;
    const wordFreq: { [key: string]: number } = {};
    
    // Common stop words to exclude
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'this', 'that', 'these', 'those', 'it', 'its', 'as', 'if', 'then', 'than', 'so', 'such', 'no', 'not', 'only', 'own', 'same', 'too', 'very', 'just', 'also', 'now', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'any', 'many', 'much', 'your', 'you', 'we', 'they', 'he', 'she', 'i', 'me', 'my', 'our', 'their', 'his', 'her']);

    words.forEach(word => {
      if (word.length > 2 && !stopWords.has(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    // Sort by frequency and get top keywords
    const sortedKeywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: Math.round((count / totalWords) * 10000) / 100
      }));

    // Calculate target keyword density if provided
    let targetKeywordDensity = null;
    if (targetKeyword.trim()) {
      const targetCount = (inputText.toLowerCase().match(new RegExp(`\\b${targetKeyword.toLowerCase()}\\b`, 'g')) || []).length;
      targetKeywordDensity = Math.round((targetCount / totalWords) * 10000) / 100;
    }

    // Generate suggestions
    const suggestions: string[] = [];
    if (targetKeywordDensity !== null) {
      if (targetKeywordDensity < 1) {
        suggestions.push(`Consider increasing the usage of "${targetKeyword}" for better SEO.`);
      } else if (targetKeywordDensity > 3) {
        suggestions.push(`The keyword "${targetKeyword}" might be overused. Consider reducing it to avoid keyword stuffing.`);
      } else {
        suggestions.push(`Good keyword density for "${targetKeyword}"!`);
      }
    }
    if (sortedKeywords.length > 0 && sortedKeywords[0].density > 4) {
      suggestions.push('Some keywords appear very frequently. Ensure natural language flow.');
    }
    if (suggestions.length === 0) {
      suggestions.push('Your content has a good keyword distribution.');
    }

    setResults({
      totalWords,
      uniqueWords: Object.keys(wordFreq).length,
      topKeywords: sortedKeywords,
      targetKeywordDensity,
      suggestions
    });

    setIsAnalyzing(false);
    toast.success('Analysis complete!');
  };

  const handleClear = () => {
    setInputText('');
    setTargetKeyword('');
    setResults(null);
  };

  const getDensityColor = (density: number) => {
    if (density >= 1 && density <= 3) return 'bg-green-100 text-green-700';
    if (density > 3) return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Keyword Density Checker</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze keyword density and optimize your content for better SEO performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Target Keyword */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Keyword (Optional)</h3>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder="Enter your target keyword..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-sm text-gray-500 mt-2">
                Enter a specific keyword to check its density in your content.
              </p>
            </div>

            {/* Text Input */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Content</h3>
                <span className="text-sm text-gray-500">{inputText.split(/\s+/).filter(w => w).length} words</span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your content here to analyze keyword density..."
                className="w-full h-72 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={analyzeKeywords}
                  disabled={isAnalyzing || !inputText.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    'Analyze Keywords'
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  Clear
                </button>
              </div>
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
                {/* Stats Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">{results.totalWords}</div>
                    <div className="text-sm text-gray-600">Total Words</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">{results.uniqueWords}</div>
                    <div className="text-sm text-gray-600">Unique Keywords</div>
                  </div>
                </div>

                {/* Target Keyword Result */}
                {results.targetKeywordDensity !== null && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Keyword Analysis</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-900">&quot;{targetKeyword}&quot;</div>
                        <div className="text-sm text-gray-600">Target Keyword</div>
                      </div>
                      <div className={`px-4 py-2 rounded-lg font-bold ${getDensityColor(results.targetKeywordDensity)}`}>
                        {results.targetKeywordDensity}%
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Keywords */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Keywords</h3>
                  <div className="space-y-3">
                    {results.topKeywords.map((kw, index) => (
                      <div key={kw.keyword} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{kw.keyword}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{kw.count}x</span>
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getDensityColor(kw.density)}`}>
                            {kw.density}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Suggestions</h3>
                  <ul className="space-y-3">
                    {results.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
                <p className="text-gray-600">Enter your content and click &quot;Analyze Keywords&quot; to see keyword density metrics.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Density Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Keyword Density Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-yellow-600 font-bold">{'<1%'}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Under-optimized</h4>
              <p className="text-sm text-gray-600">Consider using your target keyword more frequently for better SEO.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold">1-3%</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Optimal Range</h4>
              <p className="text-sm text-gray-600">This is the ideal keyword density for most content types.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-red-600 font-bold">{'>3%'}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Over-optimized</h4>
              <p className="text-sm text-gray-600">May be flagged as keyword stuffing. Reduce usage for natural flow.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
