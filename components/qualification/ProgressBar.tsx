'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStage: number;
  totalStages: number;
}

export default function ProgressBar({ currentStage, totalStages }: ProgressBarProps) {
  const stages = [
    'Quick Start',
    'Your Needs',
    'Cultural Fit',
    'Final Details',
    'Results'
  ];

  const getStageStatus = (stageIndex: number) => {
    if (stageIndex < currentStage) return 'completed';
    if (stageIndex === currentStage) return 'current';
    return 'upcoming';
  };

  const progressPercentage = ((currentStage - 1) / (totalStages - 1)) * 100;

  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStage} of {totalStages}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
          />
        </div>
        <p className="text-center text-sm font-medium text-gray-700 mt-2">
          {stages[currentStage - 1]}
        </p>
      </div>

      {/* Desktop Progress Steps */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between relative">
          {/* Progress Line Background */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          
          {/* Animated Progress Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute top-5 left-0 h-0.5 bg-blue-600 -z-10"
          />

          {/* Stage Indicators */}
          {stages.slice(0, totalStages).map((stage, index) => {
            const status = getStageStatus(index + 1);
            const stageNumber = index + 1;

            return (
              <div
                key={stageNumber}
                className="flex flex-col items-center relative"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: status === 'current' ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    ${status === 'completed' 
                      ? 'bg-blue-600 text-white' 
                      : status === 'current'
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stageNumber
                  )}
                </motion.div>
                <span 
                  className={`
                    mt-2 text-xs font-medium text-center max-w-[80px]
                    ${status === 'current' ? 'text-blue-600' : 'text-gray-500'}
                  `}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Estimate */}
      {currentStage < totalStages && (
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            About {3 - Math.floor((currentStage - 1) * 0.7)} minutes remaining
          </p>
        </div>
      )}
    </div>
  );
}