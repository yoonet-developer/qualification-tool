'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQualificationStore } from '@/store/qualification-store';
import { generateQualificationResult } from '@/lib/scoring';
import { QualificationResult } from '@/lib/types';
import { 
  CheckCircle, 
  Calendar, 
  Download, 
  ArrowRight, 
  Star,
  Users,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

export default function Results() {
  const { formData, resetQualification } = useQualificationStore();
  const [result, setResult] = useState<QualificationResult | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const qualificationResult = generateQualificationResult(formData);
    setResult(qualificationResult);
  }, [formData]);

  if (!result) {
    return <div>Loading results...</div>;
  }

  const handleCTA = () => {
    if (result.ctaAction === 'calendar') {
      setShowCalendar(true);
      // In production, integrate with Calendly or similar
      window.open('https://calendly.com/yoonet/strategy-call', '_blank');
    } else if (result.ctaAction === 'download') {
      // Trigger download of guide
      alert('Download guide functionality would be implemented here');
    } else if (result.ctaAction === 'proposal') {
      // Trigger proposal generation
      alert('Proposal generation would be implemented here');
    }
  };

  const getCategoryColor = () => {
    switch (result.category) {
      case 'hot':
        return 'bg-green-100 border-green-500 text-green-900';
      case 'warm':
        return 'bg-blue-100 border-blue-500 text-blue-900';
      case 'nurture':
        return 'bg-amber-100 border-amber-500 text-amber-900';
      case 'redirect':
        return 'bg-gray-100 border-gray-500 text-gray-900';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-900';
    }
  };

  const renderSuccessMetrics = () => {
    if (result.category !== 'hot' && result.category !== 'warm') return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8"
      >
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900">90%</div>
          <div className="text-sm text-gray-600">Staff Retention Rate</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900">60%</div>
          <div className="text-sm text-gray-600">Admin Time Saved</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Star className="w-12 h-12 text-amber-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900">200+</div>
          <div className="text-sm text-gray-600">Happy ANZ Businesses</div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Score Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${getCategoryColor()}`}>
          <span className="text-sm font-semibold uppercase">
            {result.category === 'hot' ? 'Perfect Match' :
             result.category === 'warm' ? 'Great Fit' :
             result.category === 'nurture' ? 'Learning More' :
             'Alternative Options'}
          </span>
          <span className="text-xs">Score: {result.score}/100</span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl font-bold text-center text-gray-900"
      >
        {result.headline}
      </motion.h2>

      {/* Body Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6 sm:p-8"
      >
        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
          {result.body}
        </div>
      </motion.div>

      {/* Success Metrics */}
      {renderSuccessMetrics()}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recommended Next Steps:
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        {result.ctaText && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTA}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            {result.ctaAction === 'calendar' && <Calendar className="w-5 h-5" />}
            {result.ctaAction === 'download' && <Download className="w-5 h-5" />}
            {result.ctaText}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetQualification}
          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Start Over
        </motion.button>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pt-8 border-t border-gray-200"
      >
        <p className="text-sm text-gray-600 mb-4">
          Trusted by leading Australian and New Zealand businesses
        </p>
        <div className="flex justify-center items-center gap-8 opacity-50">
          {/* In production, add actual client logos here */}
          <div className="w-24 h-12 bg-gray-300 rounded"></div>
          <div className="w-24 h-12 bg-gray-300 rounded"></div>
          <div className="w-24 h-12 bg-gray-300 rounded"></div>
          <div className="w-24 h-12 bg-gray-300 rounded"></div>
        </div>
      </motion.div>

      {/* Contact Support */}
      {result.category === 'hot' || result.category === 'warm' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
        >
          <p className="text-blue-900">
            Questions? Call us directly at{' '}
            <a href="tel:1300966638" className="font-semibold underline">
              1300 YOONET
            </a>{' '}
            or email{' '}
            <a href="mailto:hello@yoonet.com.au" className="font-semibold underline">
              hello@yoonet.com.au
            </a>
          </p>
        </motion.div>
      ) : null}
    </div>
  );
}