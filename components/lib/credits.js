// lib/credits.js
import { useState, useEffect } from 'react';

const CREDITS_KEY = 'user_credits';
const INITIAL_CREDITS = 0; // Pas de crédit gratuit

export function getCredits() {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(CREDITS_KEY);
  return stored ? parseInt(stored, 10) : INITIAL_CREDITS;
}

export function setCredits(value) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CREDITS_KEY, value.toString());
  }
}

export function useCredits() {
  const [credits, setLocalCredits] = useState(getCredits());

  useEffect(() => {
    const stored = getCredits();
    setLocalCredits(stored);
  }, []);

  const updateCredits = (newValue) => {
    setCredits(newValue);
    setLocalCredits(newValue);
  };

  return [credits, updateCredits];
}
