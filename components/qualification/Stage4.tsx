'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQualificationStore } from '@/store/qualification-store';
import {
  WORKING_HOURS_OPTIONS,
  STARTING_TEAM_OPTIONS,
  BUDGET_REALITY_OPTIONS
} from '@/lib/constants';
import { cn, getSkillPriorities, formatCurrency } from '@/lib/utils';
import { ChevronRight, ChevronLeft, Info } from 'lucide-react';

export default function Stage4() {
  const { formData, updateFormData, nextStage, previousStage } = useQualificationStore();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    formData.skillPriority || []
  );
  const [contactInfo, setContactInfo] = useState({
    name: formData.name || '',
    email: formData.email || '',
    phone: formData.phone || '',
    company: formData.company || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const skillOptions = getSkillPriorities(formData.businessType || 'default');

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      const updated = selectedSkills.filter(s => s !== skill);
      setSelectedSkills(updated);
      updateFormData({ skillPriority: updated });
    } else if (selectedSkills.length < 3) {
      const updated = [...selectedSkills, skill];
      setSelectedSkills(updated);
      updateFormData({ skillPriority: updated });
    }
  };

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {};

    if (!contactInfo.name) {
      newErrors.name = 'Please enter your name';
    }
    if (!contactInfo.email) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!contactInfo.company) {
      newErrors.company = 'Please enter your company name';
    }
    if (selectedSkills.length === 0) {
      newErrors.skills = 'Please select at least one skill priority';
    }
    if (!formData.workingHours) {
      newErrors.workingHours = 'Please select your working hours preference';
    }
    if (!formData.teamSizeNeeded) {
      newErrors.teamSize = 'Please select your initial team size';
    }
    if (!formData.budgetReality) {
      newErrors.budget = 'Please select your budget expectation';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFormData({
      ...contactInfo,
      skillPriority: selectedSkills
    });
    nextStage();
  };

  return (
    <div className="space-y-8">
      {/* Working Hours */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          When do you need support?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WORKING_HOURS_OPTIONS.map((hours) => (
            <motion.button
              key={hours}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                updateFormData({ workingHours: hours as any });
                setErrors({ ...errors, workingHours: '' });
              }}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-all",
                formData.workingHours === hours
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{hours}</span>
            </motion.button>
          ))}
        </div>
        {errors.workingHours && (
          <p className="text-sm text-red-600">{errors.workingHours}</p>
        )}
      </div>

      {/* Starting Team Size */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          How many people do you need initially?
        </h3>
        <div className="space-y-3">
          {STARTING_TEAM_OPTIONS.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                updateFormData({ teamSizeNeeded: size });
                setErrors({ ...errors, teamSize: '' });
              }}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.teamSizeNeeded === size
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{size}</span>
            </motion.button>
          ))}
        </div>
        {errors.teamSize && (
          <p className="text-sm text-red-600">{errors.teamSize}</p>
        )}
      </div>

      {/* Skill Priority */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What skills are absolutely essential? (Choose up to 3)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skillOptions.map((skill) => (
            <motion.button
              key={skill}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSkillToggle(skill)}
              disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 3}
              className={cn(
                "p-3 rounded-lg border-2 text-left transition-all",
                selectedSkills.includes(skill)
                  ? "border-blue-600 bg-blue-50"
                  : selectedSkills.length >= 3
                  ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{skill}</span>
            </motion.button>
          ))}
        </div>
        {errors.skills && (
          <p className="text-sm text-red-600">{errors.skills}</p>
        )}
        <p className="text-sm text-gray-600">
          Selected: {selectedSkills.length}/3
        </p>
      </div>

      {/* Budget Reality Check */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Investment in quality offshore talent
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-blue-900">
              Quality offshore talent typically costs {formatCurrency(1700)} - {formatCurrency(2500)} per month for specialized roles. 
              This includes incorporated business protection, dedicated support, and long-term team members who know your business.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {BUDGET_REALITY_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                updateFormData({ budgetReality: option.value as any });
                setErrors({ ...errors, budget: '' });
              }}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.budgetReality === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{option.label}</span>
            </motion.button>
          ))}
        </div>
        {errors.budget && (
          <p className="text-sm text-red-600">{errors.budget}</p>
        )}
        
        {formData.budgetReality === 'under-1000' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-lg p-4"
          >
            <p className="text-sm text-amber-900">
              <strong>Important:</strong> Unincorporated operators at this price point leave you exposed to legal liability, 
              have no backup coverage, and typically result in high turnover costs. Consider the total cost of ownership, not just monthly fees.
            </p>
          </motion.div>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Let's connect! Tell us who you are
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => {
                setContactInfo({ ...contactInfo, name: e.target.value });
                setErrors({ ...errors, name: '' });
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => {
                setContactInfo({ ...contactInfo, email: e.target.value });
                setErrors({ ...errors, email: '' });
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="john@company.com.au"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              value={contactInfo.company}
              onChange={(e) => {
                setContactInfo({ ...contactInfo, company: e.target.value });
                setErrors({ ...errors, company: '' });
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="ABC Healthcare"
            />
            {errors.company && (
              <p className="text-sm text-red-600 mt-1">{errors.company}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => {
                setContactInfo({ ...contactInfo, phone: e.target.value });
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="0400 000 000"
            />
          </div>
        </div>
      </div>

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
          className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          See Your Results
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}