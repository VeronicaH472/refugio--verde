/**
 * Refugio Verde - TypeScript Interfaces and Types
 */

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  emotionalGift: string; // e.g., "Calma", "Claridad"
  philosophy: string;     // More human, soulful story of the plant
  benefits: string[];
  care: {
    watering: string;
    light: string;
    soil: string;
    alert: string;
  };
  botiquin: {
    title: string;
    uses: {
      type: 'Infusión' | 'Aroma' | 'Compresa' | 'Tradicional';
      instructions: string;
    }[];
  };
  // Expanded human fields for Bono 2
  humanSpirit?: string;    // E.g. "Te ayuda a crear espacios de calma..."
  reciprocalCare?: string; // E.g. "Que respetes su compostura, drenando bien..."
  lifeIntegration?: {
    intro: string;
    practicalExample: string;
    stepByStep: string[];
  };
}

export interface BitacoraEntry {
  id: string;
  moduleId: string;
  date: string;
  promptQuestion: string;
  userAnswer: string;
  veronicaResponse?: string;
}

export interface InteractiveTask {
  id: string;
  label: string;
  completed: boolean;
  day: number;
}

export interface UserProgress {
  selectedPlantIds: string[];
  intention: string; // e.g., "Calma", "Energía", "Bienestar", "Confianza", "Conexión"
  whyRefugio: string;
  activeModuleId: string;
  completedTaskIds: string[];
  bitacora: { [moduleId: string]: BitacoraEntry };
  spaceDesign: {
    photoUrl?: string;
    decorations: string[];
    notes: string;
    lightLevel: 'low' | 'medium' | 'high';
    spotType: 'window' | 'balcony' | 'shelf' | 'table';
  };
  currentDay: number;
  meditationsCompletedCount: number;
}
