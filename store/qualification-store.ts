import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormData, QualificationResponse } from '@/lib/types';

interface QualificationState {
  currentStage: number;
  formData: FormData;
  responses: QualificationResponse[];
  sessionId: string;
  startedAt: Date;
  lastActive: Date;
  
  // Actions
  updateFormData: (data: Partial<FormData>) => void;
  addResponse: (response: QualificationResponse) => void;
  nextStage: () => void;
  previousStage: () => void;
  resetQualification: () => void;
  setStage: (stage: number) => void;
}

export const useQualificationStore = create<QualificationState>()(
  persist(
    (set) => ({
      currentStage: 1,
      formData: {},
      responses: [],
      sessionId: generateSessionId(),
      startedAt: new Date(),
      lastActive: new Date(),

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
          lastActive: new Date(),
        })),

      addResponse: (response) =>
        set((state) => ({
          responses: [...state.responses, response],
          lastActive: new Date(),
        })),

      nextStage: () =>
        set((state) => ({
          currentStage: Math.min(state.currentStage + 1, 4),
          lastActive: new Date(),
        })),

      previousStage: () =>
        set((state) => ({
          currentStage: Math.max(state.currentStage - 1, 1),
          lastActive: new Date(),
        })),

      setStage: (stage) =>
        set(() => ({
          currentStage: stage,
          lastActive: new Date(),
        })),

      resetQualification: () =>
        set(() => ({
          currentStage: 1,
          formData: {},
          responses: [],
          sessionId: generateSessionId(),
          startedAt: new Date(),
          lastActive: new Date(),
        })),
    }),
    {
      name: 'yoonet-qualification',
      partialize: (state) => ({
        currentStage: state.currentStage,
        formData: state.formData,
        responses: state.responses,
        sessionId: state.sessionId,
      }),
    }
  )
);

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}