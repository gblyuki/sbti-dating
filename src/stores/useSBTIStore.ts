import { create } from 'zustand';
import type { SBTIResult } from '@/types';
import { SBTI_TYPES, COMPATIBILITY_MATRIX } from '@/constants/sbti';

interface SBTIState {
  currentQuestion: number;
  answers: Record<number, string>;
  result: SBTIResult | null;
  isTestCompleted: boolean;
  isLoading: boolean;
  setAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitTest: () => void;
  resetTest: () => void;
  calculateResult: () => SBTIResult;
}

export const useSBTIStore = create<SBTIState>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  result: null,
  isTestCompleted: false,
  isLoading: false,

  setAnswer: (questionId: number, answer: string) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer }
    }));
  },

  nextQuestion: () => {
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, 11)
    }));
  },

  prevQuestion: () => {
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0)
    }));
  },

  submitTest: () => {
    const result = get().calculateResult();
    set({
      result,
      isTestCompleted: true,
      isLoading: false
    });
  },

  resetTest: () => {
    set({
      currentQuestion: 0,
      answers: {},
      result: null,
      isTestCompleted: false,
      isLoading: false
    });
  },

  calculateResult: () => {
    const { answers } = get();
    const dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    Object.entries(answers).forEach(([_, answer]) => {
      dimensions[answer as keyof typeof dimensions] += 1;
    });

    const type = [
      dimensions.E >= dimensions.I ? 'E' : 'I',
      dimensions.S >= dimensions.N ? 'S' : 'N',
      dimensions.T >= dimensions.F ? 'T' : 'F',
      dimensions.J >= dimensions.P ? 'J' : 'P'
    ].join('');

    const baseResult = SBTI_TYPES[type];
    const totalEI = dimensions.E + dimensions.I || 1;
    const totalSN = dimensions.S + dimensions.N || 1;
    const totalTF = dimensions.T + dimensions.F || 1;
    const totalJP = dimensions.J + dimensions.P || 1;

    return {
      ...baseResult,
      scores: {
        ei: Math.round((dimensions.E / totalEI) * 100),
        sn: Math.round((dimensions.S / totalSN) * 100),
        tf: Math.round((dimensions.T / totalTF) * 100),
        jp: Math.round((dimensions.J / totalJP) * 100)
      }
    };
  }
}));

export const calculateCompatibility = (type1: string, type2: string): number => {
  const baseScore = COMPATIBILITY_MATRIX[type1]?.[type2] || 50;
  const randomFactor = Math.random() * 10 - 5;
  return Math.min(100, Math.max(0, Math.round(baseScore + randomFactor)));
};
