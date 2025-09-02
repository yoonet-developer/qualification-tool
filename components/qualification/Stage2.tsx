'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQualificationStore } from '@/store/qualification-store';
import {
  PRACTICE_SYSTEMS,
  COMPLIANCE_CONCERNS,
  PATIENT_VOLUME_OPTIONS,
  PLATFORM_OPTIONS,
  ORDER_VOLUME_OPTIONS,
  BOTTLENECK_OPTIONS,
  SOFTWARE_OPTIONS,
  SERVICE_TYPES,
  PEAK_SEASON_OPTIONS
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

export default function Stage2() {
  const { formData, updateFormData, nextStage, previousStage } = useQualificationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const renderHealthcareQuestions = () => (
    <>
      {/* Practice Management Systems */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Which systems are central to your practice?
        </h3>
        <div className="space-y-3">
          {PRACTICE_SYSTEMS.map((system) => (
            <label
              key={system}
              className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
            >
              <input
                type="checkbox"
                checked={formData.practiceSystem?.includes(system) || false}
                onChange={(e) => {
                  const current = formData.practiceSystem || [];
                  if (e.target.checked) {
                    updateFormData({ practiceSystem: [...current, system] });
                  } else {
                    updateFormData({ 
                      practiceSystem: current.filter(s => s !== system) 
                    });
                  }
                }}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-900">{system}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Compliance Concerns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What keeps you up at night about compliance?
        </h3>
        <div className="space-y-3">
          {COMPLIANCE_CONCERNS.map((concern) => (
            <label
              key={concern}
              className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
            >
              <input
                type="checkbox"
                checked={formData.complianceConcerns?.includes(concern) || false}
                onChange={(e) => {
                  const current = formData.complianceConcerns || [];
                  if (e.target.checked) {
                    updateFormData({ complianceConcerns: [...current, concern] });
                  } else {
                    updateFormData({ 
                      complianceConcerns: current.filter(c => c !== concern) 
                    });
                  }
                }}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-900">{concern}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Patient Volume */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          How many patient interactions per week?
        </h3>
        <div className="space-y-3">
          {PATIENT_VOLUME_OPTIONS.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateFormData({ patientVolume: option })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.patientVolume === option
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{option}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );

  const renderEcommerceQuestions = () => (
    <>
      {/* Platform Complexity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Where does your business live online?
        </h3>
        <div className="space-y-3">
          {PLATFORM_OPTIONS.map((platform) => (
            <motion.button
              key={platform}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateFormData({ platform })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.platform === platform
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{platform}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Order Volume */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What's your current order volume?
        </h3>
        <div className="space-y-3">
          {ORDER_VOLUME_OPTIONS.map((volume) => (
            <motion.button
              key={volume}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateFormData({ orderVolume: volume })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.orderVolume === volume
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{volume}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottleneck */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Where do customers get stuck?
        </h3>
        <div className="space-y-3">
          {BOTTLENECK_OPTIONS.map((bottleneck) => (
            <motion.button
              key={bottleneck}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateFormData({ bottleneck })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.bottleneck === bottleneck
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{bottleneck}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );

  const renderAccountingQuestions = () => (
    <>
      {/* Software Expertise */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Which platforms do you use daily?
        </h3>
        <div className="space-y-3">
          {SOFTWARE_OPTIONS.map((software) => (
            <label
              key={software}
              className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
            >
              <input
                type="checkbox"
                checked={formData.software?.includes(software) || false}
                onChange={(e) => {
                  const current = formData.software || [];
                  if (e.target.checked) {
                    updateFormData({ software: [...current, software] });
                  } else {
                    updateFormData({ 
                      software: current.filter(s => s !== software) 
                    });
                  }
                }}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-900">{software}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Service Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What services do you provide?
        </h3>
        <div className="space-y-3">
          {SERVICE_TYPES.map((service) => (
            <label
              key={service}
              className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
            >
              <input
                type="checkbox"
                checked={formData.serviceTypes?.includes(service) || false}
                onChange={(e) => {
                  const current = formData.serviceTypes || [];
                  if (e.target.checked) {
                    updateFormData({ serviceTypes: [...current, service] });
                  } else {
                    updateFormData({ 
                      serviceTypes: current.filter(s => s !== service) 
                    });
                  }
                }}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-900">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Peak Season Pain */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          How do you handle July to October madness?
        </h3>
        <div className="space-y-3">
          {PEAK_SEASON_OPTIONS.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateFormData({ peakSeasonPain: option })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.peakSeasonPain === option
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{option}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );

  const renderDefaultQuestions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Tell us more about your specific needs
      </h3>
      <p className="text-gray-600">
        Based on your business type, we'll customize our solution for you.
      </p>
    </div>
  );

  const renderQuestions = () => {
    switch (formData.businessType) {
      case 'healthcare':
        return renderHealthcareQuestions();
      case 'ecommerce':
        return renderEcommerceQuestions();
      case 'accounting':
        return renderAccountingQuestions();
      default:
        return renderDefaultQuestions();
    }
  };

  const validateAndProceed = () => {
    nextStage();
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <p className="text-sm text-green-900 flex items-center gap-2">
          <Check className="w-4 h-4" />
          Great! Based on what you've shared, we can definitely help. Let me ask a few more specific questions to design the perfect solution for you...
        </p>
      </motion.div>

      {renderQuestions()}

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={previousStage}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={validateAndProceed}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}