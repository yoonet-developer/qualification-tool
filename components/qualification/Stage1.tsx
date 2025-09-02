'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQualificationStore } from '@/store/qualification-store';
import { 
  BUSINESS_TYPE_OPTIONS, 
  TEAM_SIZE_OPTIONS, 
  TIMELINE_OPTIONS,
  PAIN_POINTS
} from '@/lib/constants';
import { cn, getDynamicPainPoints } from '@/lib/utils';
import { ChevronRight, AlertCircle } from 'lucide-react';

export default function Stage1() {
  const { formData, updateFormData, nextStage } = useQualificationStore();
  const [showRedirect, setShowRedirect] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBusinessTypeSelect = (value: string) => {
    updateFormData({ businessType: value as any });
    setErrors({ ...errors, businessType: '' });
    
    if (value === 'financial') {
      setShowRedirect(true);
    } else {
      setShowRedirect(false);
    }
  };

  const handleTeamSizeSelect = (value: string) => {
    updateFormData({ teamSize: value as any });
    setErrors({ ...errors, teamSize: '' });
  };

  const handlePainPointSelect = (value: string) => {
    updateFormData({ painPoint: value });
    setErrors({ ...errors, painPoint: '' });
  };

  const handleTimelineSelect = (value: string) => {
    updateFormData({ timeline: value as any });
    setErrors({ ...errors, timeline: '' });
  };

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.businessType) {
      newErrors.businessType = 'Please select your business type';
    }
    if (!formData.teamSize) {
      newErrors.teamSize = 'Please select your team size';
    }
    if (!formData.painPoint) {
      newErrors.painPoint = 'Please select your main pain point';
    }
    if (!formData.timeline) {
      newErrors.timeline = 'Please select your timeline';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    nextStage();
  };

  const painPoints = formData.businessType 
    ? getDynamicPainPoints(formData.businessType)
    : PAIN_POINTS.default;

  return (
    <div className="space-y-8">
      {showRedirect && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-amber-900">
              We specialise in healthcare, digital, and creative businesses. 
              For financial services support, we recommend exploring specialised providers.
            </p>
          </div>
        </motion.div>
      )}

      {/* Question 1: Business Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What type of business are you running?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BUSINESS_TYPE_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBusinessTypeSelect(option.value)}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-all",
                formData.businessType === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{option.icon}</span>
                <span className="flex-1 font-medium text-gray-900">
                  {option.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
        {errors.businessType && (
          <p className="text-sm text-red-600">{errors.businessType}</p>
        )}
      </div>

      {/* Question 2: Team Size */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Where are you at in your business journey?
        </h3>
        <div className="space-y-3">
          {TEAM_SIZE_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleTeamSizeSelect(option.value)}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.teamSize === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{option.icon}</span>
                <span className="flex-1 text-gray-900">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
        {errors.teamSize && (
          <p className="text-sm text-red-600">{errors.teamSize}</p>
        )}
      </div>

      {/* Question 3: Pain Point */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What's eating up most of your time right now?
        </h3>
        <div className="space-y-3">
          {painPoints.map((point) => (
            <motion.button
              key={point}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handlePainPointSelect(point)}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.painPoint === point
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{point}</span>
            </motion.button>
          ))}
        </div>
        {errors.painPoint && (
          <p className="text-sm text-red-600">{errors.painPoint}</p>
        )}
      </div>

      {/* Question 4: Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          When are you looking to bring on support?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIMELINE_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTimelineSelect(option.value)}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-all",
                formData.timeline === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{option.icon}</span>
                <span className="flex-1 text-gray-900">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
        {errors.timeline && (
          <p className="text-sm text-red-600">{errors.timeline}</p>
        )}
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={validateAndProceed}
        className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        disabled={showRedirect}
      >
        Continue
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}