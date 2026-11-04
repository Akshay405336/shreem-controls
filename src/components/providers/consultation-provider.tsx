"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ConsultationModal } from "@/components/consultation/consultation-modal";
import type { ConsultationContext } from "@/types/consultation";

type ConsultationProviderValue = {
  openConsultation: (context?: ConsultationContext) => void;
  closeConsultation: () => void;
  isOpen: boolean;
  context: ConsultationContext | null;
};

const ConsultationContextReact = createContext<ConsultationProviderValue | null>(
  null,
);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<ConsultationContext | null>(null);

  const openConsultation = useCallback((nextContext?: ConsultationContext) => {
    setContext(nextContext ?? null);
    setIsOpen(true);
  }, []);

  const closeConsultation = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      openConsultation,
      closeConsultation,
      isOpen,
      context,
    }),
    [openConsultation, closeConsultation, isOpen, context],
  );

  return (
    <ConsultationContextReact.Provider value={value}>
      {children}
      <ConsultationModal />
    </ConsultationContextReact.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContextReact);
  if (!context) {
    throw new Error("useConsultation must be used within ConsultationProvider");
  }
  return context;
}
