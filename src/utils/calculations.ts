import type { Stage } from '../types';
import { TRIP_INFO } from '../config/constants';

// ============================================
// PAÍSES - Extraer países únicos de las stages
// ============================================
export function extractCountries(stages: Stage[]): string[] {
  const countries = new Set(stages.map(s => s.country));
  return Array.from(countries);
}

export function countCountries(stages: Stage[]): number {
  return extractCountries(stages).length;
}

// ============================================
// KM - Calcular kilómetros restantes
// ============================================
export function calculateRemainingKm(totalKm: number, goalKm: number): number {
  return Math.max(0, goalKm - totalKm);
}

export function calculateProgress(totalKm: number, goalKm: number): number {
  return Math.min(100, Math.round((totalKm / goalKm) * 100));
}

// ============================================
// KM FINANCIADOS - Calcular desde donaciones
// ============================================
export function calculateKmFinanced(totalFunded: number, pricePerKm: number): number {
  return Math.floor(totalFunded / pricePerKm);
}