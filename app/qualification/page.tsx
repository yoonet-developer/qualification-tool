'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQualificationStore } from '@/store/qualification-store';
import Stage1 from '@/components/qualification/Stage1';
import Stage2 from '@/components/qualification/Stage2';
import Stage3 from '@/components/qualification/Stage3';
import Stage4 from '@/components/qualification/Stage4';
import Results from '@/components/qualification/Results';
import ProgressBar from '@/components/qualification/ProgressBar';
import { ArrowLeft, Shield, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function QualificationPage() {
  const { currentStage, formData } = useQualificationStore();

  useEffect(() => {
    // Track page view or analytics here
    console.log('Current stage:', currentStage);
    console.log('Form data:', formData);
  }, [currentStage, formData]);

  const renderStage = () => {
    switch (currentStage) {
      case 1:
        return <Stage1 />;
      case 2:
        return <Stage2 />;
      case 3:
        return <Stage3 />;
      case 4:
        return <Stage4 />;
      case 5:
        return <Results />;
      default:
        return <Stage1 />;
    }
  };

  const getStageTitle = () => {
    switch (currentStage) {
      case 1:
        return 'Let\'s get to know your business';
      case 2:
        return 'Understanding your specific needs';
      case 3:
        return 'Finding the right cultural fit';
      case 4:
        return 'Final details to perfect your solution';
      case 5:
        return 'Your personalized recommendation';
      default:
        return 'Qualification';
    }
  };

  const getStageSubtitle = () => {
    switch (currentStage) {
      case 1:
        return 'This will only take 3 minutes and helps us design the perfect solution for you';
      case 2:
        return 'Your industry expertise matters - we match you with specialists who understand your world';
      case 3:
        return 'We believe in partnerships, not transactions - let\'s make sure we\'re aligned';
      case 4:
        return 'Almost there! Just a few practical details to finalize your custom solution';
      case 5:
        return 'Based on your responses, here\'s how we can transform your business';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Yoonet</span>
            </Link>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  200+ Clients
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  90% Retention
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ProgressBar currentStage={currentStage} totalStages={5} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stage Title */}
        <motion.div
          key={`title-${currentStage}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {getStageTitle()}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {getStageSubtitle()}
          </p>
        </motion.div>

        {/* Stage Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>

        {/* Trust Badge */}
        {currentStage < 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-sm text-gray-500"
          >
            <p>
              🔒 Your information is secure and will never be shared
            </p>
            <p className="mt-2">
              We're not the cheapest, we're the most invested - in your success and our community
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2024 Yoonet. Building better teams in Balanga.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </a>
              <a href="tel:1300966638" className="text-gray-600 hover:text-gray-900">
                1300 YOONET
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}