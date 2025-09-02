'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQualificationStore } from '@/store/qualification-store';
import {
  TEAM_PHILOSOPHY_OPTIONS,
  INVESTMENT_PRIORITIES,
  COMMUNITY_IMPACT_OPTIONS,
  PREVIOUS_EXPERIENCE_OPTIONS
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, GripVertical } from 'lucide-react';

export default function Stage3() {
  const { formData, updateFormData, nextStage, previousStage } = useQualificationStore();
  const [priorityRanking, setPriorityRanking] = useState<string[]>(
    formData.investmentMindset || INVESTMENT_PRIORITIES
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetItem: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetItem) return;

    const newRanking = [...priorityRanking];
    const draggedIndex = newRanking.indexOf(draggedItem);
    const targetIndex = newRanking.indexOf(targetItem);

    newRanking.splice(draggedIndex, 1);
    newRanking.splice(targetIndex, 0, draggedItem);

    setPriorityRanking(newRanking);
    updateFormData({ investmentMindset: newRanking });
    setDraggedItem(null);
  };

  const validateAndProceed = () => {
    nextStage();
  };

  return (
    <div className="space-y-8">
      {/* Team Philosophy */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          How do you think about offshore teams?
        </h3>
        <div className="space-y-3">
          {TEAM_PHILOSOPHY_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateFormData({ teamPhilosophy: option.value })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.teamPhilosophy === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Investment Mindset */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What matters most in an outsourcing partner?
        </h3>
        <p className="text-sm text-gray-600">
          Drag to rank from most important (top) to least important (bottom)
        </p>
        <div className="space-y-2">
          {priorityRanking.map((priority, index) => (
            <motion.div
              key={priority}
              draggable
              onDragStart={(e) => handleDragStart(e, priority)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, priority)}
              whileHover={{ scale: 1.01 }}
              className={cn(
                "p-4 rounded-lg border-2 bg-white cursor-move transition-all flex items-center gap-3",
                draggedItem === priority
                  ? "border-blue-600 opacity-50"
                  : index === 0
                  ? "border-green-500 bg-green-50"
                  : index === priorityRanking.length - 1
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200"
              )}
            >
              <GripVertical className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-gray-900">{priority}</span>
              <span className="text-sm text-gray-500">#{index + 1}</span>
            </motion.div>
          ))}
        </div>
        {priorityRanking[0] === 'Lowest possible price' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-lg p-3"
          >
            <p className="text-sm text-amber-900">
              While price is important, choosing based on cost alone often leads to higher expenses through turnover, training, and quality issues.
            </p>
          </motion.div>
        )}
      </div>

      {/* Community Impact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Did you know your choice of BPO affects real families?
        </h3>
        <p className="text-sm text-gray-600">
          Our team members in Balanga support entire families and contribute to their local community's growth.
        </p>
        <div className="space-y-3">
          {COMMUNITY_IMPACT_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateFormData({ communityImpact: option.value })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.communityImpact === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Previous Experience */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Have you worked with offshore teams before?
        </h3>
        <div className="space-y-3">
          {PREVIOUS_EXPERIENCE_OPTIONS.map((experience) => (
            <motion.button
              key={experience}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                updateFormData({ previousExperience: experience });
                if (experience === 'Currently with another BPO') {
                  // Could trigger additional question about what would make them switch
                }
              }}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.previousExperience === experience
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="text-gray-900">{experience}</span>
            </motion.button>
          ))}
        </div>
        
        {formData.previousExperience === 'Currently with another BPO' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <label className="block text-sm font-medium text-gray-700">
              What would make you consider switching?
            </label>
            <textarea
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              rows={3}
              placeholder="Tell us about your current challenges..."
              onChange={(e) => updateFormData({ switchReason: e.target.value })}
            />
          </motion.div>
        )}
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
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}