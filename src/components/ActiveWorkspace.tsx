import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  MapPin, 
  Sparkles, 
  Compass, 
  Heart, 
  Calendar as CalendarIcon, 
  BookOpen, 
  MessageCircle,
  Clock, 
  CheckCircle, 
  ChevronRight, 
  Camera, 
  Moon, 
  Feather, 
  ArrowLeft,
  HelpCircle,
  Copy,
  Volume2,
  VolumeX,
  Plus
} from 'lucide-react';
import { Plant, BitacoraEntry, UserProgress } from '../types';
import { PLANTS_DATA } from '../plantsData';
import MeditationsPlayer from './MeditationsPlayer';

interface ActiveWorkspaceProps {
  userName: string;
  onExit: () => void;
}

export default function ActiveWorkspace({ userName, onExit }: ActiveWorkspaceProps) {
  // Restore state from localStorage or initialize defaults
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(`refugio_verde_progress_${userName}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      selectedPlantIds: ['lavanda'], // Pre-selected Lavanda by default
      intention: 'Calma',
      whyRefugio: '',
      activeModuleId: 'm1',
      completedTaskIds: [],
      bitacora: {
        m1: { id: 'm1', moduleId: 'm1', date: new Date().toLocaleDateString(), promptQuestion: '¿Por qué decidí crear mi Refugio Verde y qué deseo cultivar hoy en mi vida?', userAnswer: '' },
        m2: { id: 'm2', moduleId: 'm2', date: new Date().toLocaleDateString(), promptQuestion: '¿Por qué elegí estas plantas aliadas y qué representan para mí?', userAnswer: '' },
        m3: { id: 'm3', moduleId: 'm3', date: new Date().toLocaleDateString(), promptQuestion: '¿Cómo me siento al observar mi nuevo refugio físico y estar en contacto con él?', userAnswer: '' },
        m4: { id: 'm4', moduleId: 'm4', date: new Date().toLocaleDateString(), promptQuestion: '¿Qué cambios voy notando en mis plantas y en mi propio mundo interior al sostener este ritmo diario?', userAnswer: '' },
        m5: { id: 'm5', moduleId: 'm5', date: new Date().toLocaleDateString(), promptQuestion: '¿Qué ha cambiado en mí desde que comenzó este viaje de 30 días y qué deseo seguir cultivando?', userAnswer: '' },
      },
      spaceDesign: {
        photoUrl: undefined,
        decorations: ['Piedras energéticas'],
        notes: '',
        lightLevel: 'medium',
        spotType: 'window',
      },
      currentDay: 1,
      meditationsCompletedCount: 0,
    };
  });

  // UI state variables
  const [selectedSpecPlant, setSelectedSpecPlant] = useState<Plant | null>(PLANTS_DATA[0]);
  const [veronicaReflection, setVeronicaReflection] = useState<string>('');
  const [isConsultingVeronica, setIsConsultingVeronica] = useState(false);
  const [veronicaError, setVeronicaError] = useState<string>('');

  // Breathing meditation ritual variables
  const [isMeditating, setIsMeditating] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'prepare'>('prepare');
  const [meditationSeconds, setMeditationSeconds] = useState(60);
  const [meditationMessage, setMeditationMessage] = useState('Prepárate para conectar...');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Simulated visual elements
  const [customPhotoInput, setCustomPhotoInput] = useState<string>('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Auto-save changes to localStorage
  useEffect(() => {
    localStorage.setItem(`refugio_verde_progress_${userName}`, JSON.stringify(progress));
  }, [progress, userName]);

  // Breathing meditation cycle effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let secondsTimer: NodeJS.Timeout;

    if (isMeditating) {
      // Game-like procedural timer
      secondsTimer = setInterval(() => {
        setMeditationSeconds((prev) => {
          if (prev <= 1) {
            setIsMeditating(false);
            setBreathPhase('prepare');
            setProgress(p => ({
              ...p,
              meditationsCompletedCount: p.meditationsCompletedCount + 1,
              currentDay: Math.min(30, p.currentDay + 1)
            }));
            setMeditationMessage('¡Ritual completado! Día avanzado en tu bitácora.');
            playChime(523.25, 'sine', 0.8, 1.5); // Final chime
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      const breathingSequence = () => {
        // Alquimia Verde Breathing: 4s inhale, 4s hold, 4s exhale
        setBreathPhase('inhale');
        setMeditationMessage('Inhala profundamente... Siente cómo entra la energía vital 🌱');
        playChime(261.63, 'triangle', 0.2, 0.4); // C4

        timer = setTimeout(() => {
          setBreathPhase('hold');
          setMeditationMessage('Sostén la respiración... Siente el pulso de la savia dentro de ti ✨');
          playChime(329.63, 'triangle', 0.2, 0.4); // E4

          timer = setTimeout(() => {
            setBreathPhase('exhale');
            setMeditationMessage('Exhala con lentitud... Suelta tensiones, rigores y prisas 🍂');
            playChime(392.00, 'triangle', 0.2, 0.4); // G4

            timer = setTimeout(() => {
              // Repeat
              breathingSequence();
            }, 4000);
          }, 4000);
        }, 4000);
      };

      breathingSequence();
    } else {
      setBreathPhase('prepare');
    }

    return () => {
      clearTimeout(timer);
      clearInterval(secondsTimer);
    };
  }, [isMeditating]);

  // Browser Sound Synthesizer via Web Audio API 
  const playChime = (frequency: number, type: 'sine' | 'square' | 'triangle' = 'triangle', volume = 0.1, duration = 0.6) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // audio restricted
    }
  };

  // Consult Verónica via secure full-stack Gemini API
  const consultVeronica = async (moduleId: string) => {
    const entry = progress.bitacora[moduleId];
    if (!entry || !entry.userAnswer.trim()) {
      setVeronicaError('Por favor, escribe tus pensamientos primero antes de compartirlos con Verónica.');
      return;
    }

    setIsConsultingVeronica(true);
    setVeronicaError('');
    setVeronicaReflection('');

    const selectedPlantsList = PLANTS_DATA.filter(p => progress.selectedPlantIds.includes(p.id)).map(p => p.name);

    try {
      const response = await fetch('/api/veronica/reflect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          intention: progress.intention,
          whyRefugio: progress.whyRefugio,
          moduleId: moduleId,
          moduleTitle: getModuleTitle(moduleId),
          promptQuestion: entry.promptQuestion,
          userAnswer: entry.userAnswer,
          selectedPlantsNames: selectedPlantsList
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo establecer comunicación.');
      }

      const data = await response.json();
      
      // Update journal state locally
      setProgress(p => {
        const updatedBitacora = { ...p.bitacora };
        updatedBitacora[moduleId].veronicaResponse = data.response;
        return {
          ...p,
          bitacora: updatedBitacora
        };
      });
      
      setVeronicaReflection(data.response);
      setSuccessAnimation(true);
      setTimeout(() => setSuccessAnimation(false), 3000);
      playChime(523.25, 'sine', 0.2, 1); // high chime

    } catch (err: any) {
      console.error(err);
      setVeronicaError('Verónica está meditando o regando el invernadero. Por favor intenta entablar la conversación en unos instantes.');
    } finally {
      setIsConsultingVeronica(false);
    }
  };

  const getModuleTitle = (id: string) => {
    switch(id) {
      case 'm1': return 'Módulo 1 - Despertar 🌱';
      case 'm2': return 'Módulo 2 - Elegir 🌿';
      case 'm3': return 'Módulo 3 - Crear 🪴';
      case 'm4': return 'Módulo 4 - Cultivar 🌸';
      case 'm5': return 'Módulo 5 - Florecer ✨';
      default: return '';
    }
  };

  // Helper to alter selected plant list
  const togglePlantSelection = (plantId: string) => {
    setProgress(p => {
      let ids = [...p.selectedPlantIds];
      if (ids.includes(plantId)) {
        // Keep at least one plant to prevent empty states
        if (ids.length <= 1) return p;
        ids = ids.filter(id => id !== plantId);
      } else {
        if (ids.length >= 6) return p; // max 6
        ids.push(plantId);
      }
      return { ...p, selectedPlantIds: ids };
    });
    playChime(392.00, 'sine', 0.1, 0.3);
  };

  const setJournalText = (moduleId: string, text: string) => {
    setProgress(p => {
      const updated = { ...p.bitacora };
      updated[moduleId] = {
        ...updated[moduleId],
        userAnswer: text
      };
      // For module 1 whyRefugio correlates with whyRefugio general field
      const extra: any = {};
      if (moduleId === 'm1') {
        extra.whyRefugio = text;
      }
      return {
        ...p,
        bitacora: updated,
        ...extra
      };
    });
  };

  const handleTaskToggle = (taskId: string) => {
    setProgress(p => {
      let list = [...p.completedTaskIds];
      if (list.includes(taskId)) {
        list = list.filter(id => id !== taskId);
      } else {
        list.push(taskId);
        playChime(440, 'sine', 0.05, 0.2);
      }
      return { ...p, completedTaskIds: list };
    });
  };

  // Custom photo upload simulation
  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPhotoInput) {
      setProgress(p => ({
        ...p,
        spaceDesign: {
          ...p.spaceDesign,
          photoUrl: customPhotoInput
        }
      }));
      setCustomPhotoInput('');
      playChime(523, 'sine', 0.1, 0.4);
    }
  };

  // Generate dynamic Care Calendar based on active plants
  const generateCaresList = () => {
    const activeId = progress.selectedPlantIds;
    const items: { task: string; frequency: string; plantName: string }[] = [];
    
    activeId.forEach(id => {
      const plant = PLANTS_DATA.find(p => p.id === id);
      if (plant) {
        items.push({
          plantName: plant.name,
          task: `Evaluar humedad del sustrato de tu ${plant.name}. ${plant.care.watering}`,
          frequency: 'Cada 3 días (Menta frecuente, Aloe muy escaso)'
        });
        items.push({
          plantName: plant.name,
          task: `Girar 90° la maceta de ${plant.name} para un crecimiento simétrico buscando la luz (${plant.care.light}).`,
          frequency: 'Semanal'
        });
        items.push({
          plantName: plant.name,
          task: `Observación sutil de hojas de ${plant.name}. Alerta: ${plant.care.alert}`,
          frequency: 'Diario'
        });
      }
    });

    return items;
  };

  // Copy letter to clipboard
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Carta copiada al portapapeles. ¡Consérvala con cariño!');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#2C3E2D] flex flex-col font-sans selection:bg-[#E2ECE3]" id="active-workspace">
      
      {/* Serene Application Top Header */}
      <header className="bg-white border-b border-[#E2ECE3] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onExit}
            className="p-1 px-2.5 rounded-lg border border-[#E2ECE3] hover:bg-[#FAF9F5] text-xs text-[#53735E] transition-all flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver</span>
          </button>
          <div className="w-px h-5 bg-[#E2ECE3]"></div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#427A5B]">Mi Jardín Alquímico</span>
            <h1 className="font-serif text-xl font-bold tracking-tight text-[#1E2E20] flex items-center gap-1">
              Refugio Verde
            </h1>
          </div>
        </div>

        {/* Holistic Progress Metrics bar */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs bg-[#FAF9F5] p-2.5 px-4 rounded-xl border border-[#E2ECE3]">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">Practicante:</span>
            <span className="font-semibold text-[#1E2E20]">{userName}</span>
          </div>
          <div className="w-px h-3 bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#427A5B]" />
            <span>Día del Proceso:</span>
            <span className="font-bold text-[#2D4A30]">{progress.currentDay}/30</span>
          </div>
          <div className="w-px h-3 bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Cultivando:</span>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] rounded-full font-bold uppercase tracking-wider">
              {progress.intention}
            </span>
          </div>
        </div>
      </header>

      {/* Primary Dashboard layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl w-full mx-auto">
        
        {/* Left Side: Method Core Steps Navigation (lg:col-span-3) */}
        <nav className="lg:col-span-3 space-y-3.5">
          <div className="text-xs font-bold uppercase tracking-widest text-[#53735E] px-2 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#427A5B]" />
            <span>El Sendero del Alumno</span>
          </div>

          <div className="space-y-2 bg-white p-3 rounded-2xl border border-[#E2ECE3] shadow-sm">
            {[
              { id: 'm1', number: '01', title: 'DESPERTAR 🌱', desc: 'Define tu vibración' },
              { id: 'm2', number: '02', title: 'ELEGIR 🌿', desc: 'Invoca plantas aliadas' },
              { id: 'm3', number: '03', title: 'CREAR 🪴', desc: 'Prepara tu refugio verde' },
              { id: 'm4', number: '04', title: 'CULTIVAR 🌸', desc: 'Ritual y Cuidados' },
              { id: 'm5', number: '05', title: 'FLORECER ✨', desc: 'La gran transformación' }
            ].map((mod) => {
              const isActive = progress.activeModuleId === mod.id;
              const isWritten = progress.bitacora[mod.id]?.userAnswer.trim().length > 0;
              const isConsulted = !!progress.bitacora[mod.id]?.veronicaResponse;
              
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setProgress(p => ({ ...p, activeModuleId: mod.id }));
                    playChime(329.63, 'sine', 0.05, 0.2);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                    isActive 
                      ? 'bg-[#E2ECE3] border-[#A8C4B5] text-[#1E2E20] font-medium shadow-sm' 
                      : 'bg-transparent border-transparent text-[#53735E] hover:bg-[#FAF9F5] hover:border-gray-100'
                  }`}
                  id={`step-nav-${mod.id}`}
                >
                  <span className={`text-[11px] font-mono font-bold mt-1 shrink-0 ${
                    isActive ? 'text-[#427A5B]' : 'text-gray-400'
                  }`}>
                    {mod.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold uppercase tracking-wider">{mod.title}</h4>
                    <p className="text-[10px] text-gray-400 truncate tracking-tight">{mod.desc}</p>
                    {/* Tiny Status Indicators */}
                    <div className="flex gap-1.5 mt-1.5">
                      {isWritten && (
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 rounded uppercase font-bold tracking-tight">Escrito</span>
                      )}
                      {isConsulted && (
                        <span className="text-[9px] bg-sky-50 text-sky-700 px-1.5 rounded uppercase font-bold tracking-tight">Verónica responde</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A8C4B5]/60 mt-1" />
                </button>
              );
            })}
          </div>

          {/* Quick Shortcuts to Guides Widget */}
          <div className="bg-gradient-to-br from-[#2D4A30] to-[#1E2E20] text-[#E2ECE3] p-5 rounded-2xl shadow-sm space-y-4 border border-[#132014]">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300 flex items-center gap-1 font-mono">
              <Sparkles className="w-3.5 h-3.5" /> BOTIQUÍN REVELADO
            </span>
            <div className="space-y-2">
              <h4 className="font-serif text-lg leading-snug">¿Cuentas con un malestar físico o cansancio mental?</h4>
              <p className="text-[11px] opacity-80 leading-normal font-light">
                Utiliza las propiedades medicinales primorosas de tus plantas elegidas sobre tu piel, sienes o respiración.
              </p>
            </div>
            
            <a 
              href="#botiquin-section" 
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-200 hover:text-white uppercase tracking-wider bg-white/10 p-2 px-3 rounded-lg w-full justify-center transition-colors border border-white/5"
            >
              <span>Ver Remedios Herbales</span>
              <Sprout className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Virtual Private Community Sidebar Widget */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2ECE3] shadow-sm space-y-3.5 text-left">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#427A5B] flex items-center gap-1.5 font-mono">
              👥 COHORT & COMUNIDAD
            </span>
            <div className="space-y-1">
              <h4 className="font-serif text-[13.5px] font-bold text-[#1E2E20] leading-snug">Círculo Privado de Alquimistas</h4>
              <p className="text-[10.5px] text-[#4E5E50] leading-relaxed font-light">
                ¡El hábito de la calma florece cuando se comparte! Comparte inquietudes o fotos del progreso diario en nuestras redes oficiales:
              </p>
            </div>

            <div className="space-y-2 pt-1 font-sans">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#FAF9F5] hover:bg-[#E2ECE3]/40 border border-[#E2ECE3] hover:border-[#BACFBD] rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm select-none">👥</span>
                  <div>
                    <span className="text-[10px] font-bold text-[#1877F2] block leading-none font-mono">1. GRUPO DE FACEBOOK</span>
                    <span className="text-[9px] text-[#4E5E50] font-light">Fotos y bitácoras compartidas</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-[#427A5B] transition-colors">👉</span>
              </a>

              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#FAF9F5] hover:bg-[#E2ECE3]/40 border border-[#E2ECE3] hover:border-[#BACFBD] rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm select-none">✈️</span>
                  <div>
                    <span className="text-[10px] font-bold text-[#0088CC] block leading-none font-mono">2. CANAL DE TELEGRAM</span>
                    <span className="text-[9px] text-[#4E5E50] font-light">Soporte sutil y Alertas de riego</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-[#427A5B] transition-colors">👉</span>
              </a>
            </div>

            <div className="text-[9px] text-[#427A5B] bg-[#E2ECE3]/30 px-2 py-1 rounded-lg text-center font-semibold">
              ✨ 342 herbolistas conectadas en esta luna
            </div>
          </div>
        </nav>

        {/* Center Panel: Active Module Content & Exercises (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6" id="center-panel">
          <AnimatePresence mode="wait">
            
            {/* MODULE 1: DESPERTAR 🌱 */}
            {progress.activeModuleId === 'm1' && (
              <motion.div
                key="m1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#FAF9F5] pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#427A5B]">Módulo 1</span>
                      <h2 className="font-serif text-2xl text-[#1E2E20] font-light">
                        Volver a Despertar 🌱
                      </h2>
                    </div>
                    <span className="text-3xl">🌱</span>
                  </div>

                  <p className="text-xs text-[#53735E] leading-relaxed">
                    Toda transformación comienza cuando escuchamos una necesidad silenciosa: la necesidad de bajar el ritmo, respirar hondo y recuperar la calma. En esta etapa definirás la intención profunda de tu rincón verde de bienestar.
                  </p>

                  {/* Exercise 1: Intention Selector */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#2D4A30] flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>¿Qué necesitas o deseas cultivar hoy en tu vida sutil?</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Calma', 'Energía', 'Bienestar', 'Confianza', 'Conexión'].map((intentOption) => {
                        const isSelected = progress.intention === intentOption;
                        return (
                          <button
                            key={intentOption}
                            onClick={() => {
                              setProgress(p => ({ ...p, intention: intentOption }));
                              playChime(392, 'sine', 0.1, 0.2);
                            }}
                            className={`px-4 py-2 text-xs rounded-xl font-medium border transition-all ${
                              isSelected 
                                ? 'bg-[#2D4A30] text-[#FAF9F5] border-[#2D4A30] shadow-sm' 
                                : 'bg-[#FAF9F5] text-[#53735E] border-[#E2ECE3] hover:border-gray-300'
                            }`}
                          >
                            {intentOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tasks list */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold text-[#53735E] uppercase tracking-wider">Actividades Clave para Despertar:</span>
                    {[
                      { id: 't1_1', label: 'Elegir tu espacio preliminar de bienestar mental.' },
                      { id: 't1_2', label: 'Escribir tu verdadera intención en la Bitácora de Alquimia.' }
                    ].map(task => (
                      <div key={task.id} className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleTaskToggle(task.id)}
                          className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${
                            progress.completedTaskIds.includes(task.id)
                              ? 'bg-[#2D4A30] border-[#2D4A30] text-white'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {progress.completedTaskIds.includes(task.id) && <span className="text-[10px] font-bold">✓</span>}
                        </button>
                        <span className={`text-xs ${progress.completedTaskIds.includes(task.id) ? 'line-through text-gray-400' : 'text-[#4E5E50]'}`}>
                          {task.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bitacora Journal Editor Panel */}
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <h3 className="font-serif text-lg text-[#1E2E20] flex items-center gap-1.5">
                    <Feather className="w-4 h-4 text-[#427A5B]" />
                    <span>Bitácora de Entrada: Despierta tu Intención</span>
                  </h3>
                  
                  <blockquote className="text-xs bg-[#FAF9F5] hover:bg-slate-50 p-4 rounded-xl border border-gray-100 text-[#53735E] italic leading-relaxed">
                    "{progress.bitacora.m1.promptQuestion}"
                  </blockquote>

                  <textarea
                    value={progress.bitacora.m1.userAnswer}
                    onChange={(e) => setJournalText('m1', e.target.value)}
                    placeholder="Escribe tus sinceras reflexiones aquí... Tómate tu tiempo. Sin prisas ni exigencias de redacción..."
                    className="w-full h-36 p-4 text-xs tracking-wide bg-[#FAF9F5] border border-[#D5E1D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D4A30]/10 focus:border-[#2D4A30] text-[#2C3E2D] leading-relaxed resize-none"
                    id="journal-input-m1"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-[#2C3E2D]">Conversar con Verónica</h4>
                      <p className="text-[10px] text-gray-400">Verónica leerá tus intenciones y te guiará sutilmente con un mensaje.</p>
                    </div>
                    <button
                      onClick={() => consultVeronica('m1')}
                      disabled={isConsultingVeronica || !progress.bitacora.m1.userAnswer.trim()}
                      className="px-5 py-2.5 bg-[#2D4A30] hover:bg-[#385B3C] text-white disabled:bg-gray-200 disabled:text-gray-400 rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      {isConsultingVeronica ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Verónica lee...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Entablar Conversación</span>
                        </>
                      )}
                    </button>
                  </div>
                  {veronicaError && (
                    <p className="text-[11px] text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">{veronicaError}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* MODULE 2: ELEGIR 🌿 */}
            {progress.activeModuleId === 'm2' && (
              <motion.div
                key="m2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#FAF9F5] pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#427A5B]">Módulo 2</span>
                      <h2 className="font-serif text-2xl text-[#1E2E20] font-light">
                        Vincularte con las Plantas Aliadas 🌿
                      </h2>
                    </div>
                    <span className="text-3xl">🌿</span>
                  </div>

                  <p className="text-xs text-[#53735E] leading-relaxed">
                    Elegir conscientemente un aliado vivo. No desde la moda estética, sino desde sus propiedades sutiles y vuestras mutuas necesidades. <strong>Selecciona de 3 a 6 plantas de la baraja inferior</strong> para sumarlas a tu rincón de cuidados y habilitar su botiquín medicinal:
                  </p>

                  {/* Mini-grid of all plants with fast toggles and selections */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                    {PLANTS_DATA.map((plant) => {
                      const isSelected = progress.selectedPlantIds.includes(plant.id);
                      return (
                        <div
                          key={plant.id}
                          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between h-40 relative group ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#E2ECE3] to-white border-[#A8C4B5] shadow-xs'
                              : 'bg-white border-[#E2ECE3] hover:border-gray-200'
                          }`}
                        >
                          <div>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500 font-mono text-[9px] uppercase tracking-wide">
                              {plant.emotionalGift.split('y')[0]}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-[#1E2E20] mt-1.5">{plant.name}</h4>
                            <span className="text-[10px] text-gray-400 italic block">{plant.scientificName}</span>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Spec button */}
                            <button
                              onClick={() => setSelectedSpecPlant(plant)}
                              className="text-[10px] underline font-medium text-[#427A5B] hover:text-[#2D4A30]"
                            >
                              Ver Ficha Sutil
                            </button>
                            
                            {/* Toggle Selector Button */}
                            <button
                              onClick={() => togglePlantSelection(plant.id)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center border text-[11px] font-bold ${
                                isSelected
                                  ? 'bg-[#2D4A30] border-[#2D4A30] text-[#FAF9F5]'
                                  : 'border-gray-300 text-gray-400 hover:border-gray-400'
                              }`}
                            >
                              {isSelected ? '✓' : '+'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tasks */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-[#53735E] uppercase tracking-wider">Actividades Clave para Elegir:</span>
                    {[
                      { id: 't2_1', label: 'Elegir conscientemente al menos 3 plantas con las que sientas una afinidad sutil.' },
                      { id: 't2_2', label: 'Declarar en tu bitácora por qué has elegido estas plantas aliadas.' }
                    ].map(task => (
                      <div key={task.id} className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleTaskToggle(task.id)}
                          className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${
                            progress.completedTaskIds.includes(task.id)
                              ? 'bg-[#2D4A30] border-[#2D4A30] text-white'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {progress.completedTaskIds.includes(task.id) && <span className="text-[10px] font-bold">✓</span>}
                        </button>
                        <span className={`text-xs ${progress.completedTaskIds.includes(task.id) ? 'line-through text-gray-400' : 'text-[#4E5E50]'}`}>
                          {task.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allied Plant detail viewer card (Expanded below grid if selected) */}
                {selectedSpecPlant && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-3xl border border-amber-200/50 bg-amber-50/11 shadow-xs space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#427A5B] font-mono bg-[#E2ECE3] px-2.5 py-0.5 rounded-full">
                          Ficha Botánica y Espiritual
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#2D4A30] mt-1.5">
                          {selectedSpecPlant.name} <span className="text-xs font-sans text-gray-400 font-normal italic">({selectedSpecPlant.scientificName})</span>
                        </h3>
                        <p className="text-xs text-[#E07A5F] font-bold tracking-wide mt-1">Regalo emocional sutil: {selectedSpecPlant.emotionalGift}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedSpecPlant(null)} 
                        className="text-xs text-gray-400 hover:text-[#2D4A30]"
                      >
                        Ocultar x
                      </button>
                    </div>

                    <p className="text-xs text-[#53735E] italic leading-relaxed bg-white p-3.5 rounded-xl border border-[#E2ECE3]/40">
                      "{selectedSpecPlant.philosophy}"
                    </p>

                    {selectedSpecPlant.humanSpirit && (
                      <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-amber-100/40 text-xs">
                        <strong className="text-[10px] uppercase font-mono tracking-wide text-[#E07A5F] block mb-1">
                          Tu Diferencial Humano & Vínculo Sutil:
                        </strong>
                        <p className="text-[#355B39] font-serif italic text-xs leading-relaxed">
                          "{selectedSpecPlant.humanSpirit}"
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                      <div className="space-y-2 bg-white/70 p-3.5 rounded-xl border border-gray-100">
                        <h4 className="font-bold uppercase text-[10px] tracking-wider text-[#2D4A30]">⚡ CUIDADOS CONSCIENTES:</h4>
                        {selectedSpecPlant.reciprocalCare && (
                          <p className="text-[11px] text-[#4E5E50] leading-relaxed mb-2 font-mono text-[10px] text-[#427A5B]">
                            <strong>Amor mutuo:</strong> {selectedSpecPlant.reciprocalCare}
                          </p>
                        )}
                        <p className="text-[11px] text-[#4E5E50]"><strong>💦 Riego:</strong> {selectedSpecPlant.care.watering}</p>
                        <p className="text-[11px] text-[#4E5E50]"><strong>☀️ Luz:</strong> {selectedSpecPlant.care.light}</p>
                        <p className="text-[11px] text-[#4E5E50]"><strong>🌱 Tierra:</strong> {selectedSpecPlant.care.soil}</p>
                        <p className="p-2 bg-red-50 text-[10px] rounded text-red-700 italic border border-red-100/30">🚨 Alerta: {selectedSpecPlant.care.alert}</p>
                      </div>

                      <div className="space-y-2 bg-white/70 p-3.5 rounded-xl border border-gray-100">
                        <h4 className="font-bold uppercase text-[10px] tracking-wider text-[#2D4A30]">PROPIEDADES ALQUÍMICAS:</h4>
                        <ul className="list-disc list-inside text-[11px] text-[#4E5E50] space-y-1">
                          {selectedSpecPlant.benefits.map((b, i) => (
                            <li key={i} className="list-none flex gap-1.5 items-start">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {selectedSpecPlant.lifeIntegration && (
                      <div className="bg-gradient-to-br from-[#E2ECE3]/30 to-[#FAF9F5] p-4 rounded-2xl border border-[#E2ECE3] space-y-2 text-left">
                        <h4 className="font-serif text-sm font-bold text-[#1E2E20] flex items-center gap-1.5 border-b border-[#E2ECE3] pb-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                          {selectedSpecPlant.lifeIntegration.practicalExample}
                        </h4>
                        <p className="text-xs text-[#53735E] leading-relaxed">
                          {selectedSpecPlant.lifeIntegration.intro}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#427A5B] block">
                            PASO A PASO EN TU RINCÓN VERDE:
                          </span>
                          <ol className="space-y-1.5 text-[11px] text-[#4E5E50]">
                            {selectedSpecPlant.lifeIntegration.stepByStep.map((step, stepIdx) => (
                              <li key={stepIdx} className="leading-relaxed flex gap-2 items-start">
                                <span className="font-mono font-bold text-[#355B39] bg-[#E2ECE3] w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                  {stepIdx+1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Bitacora */}
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <h3 className="font-serif text-lg text-[#1E2E20] flex items-center gap-1.5">
                    <Feather className="w-4 h-4 text-[#427A5B]" />
                    <span>Bitácora de Entrada: Vínculo con tus Aliadas</span>
                  </h3>

                  <blockquote className="text-xs bg-[#FAF9F5] p-4 rounded-xl border border-gray-100 text-[#53735E] italic">
                    "{progress.bitacora.m2.promptQuestion}"
                  </blockquote>

                  <textarea
                    value={progress.bitacora.m2.userAnswer}
                    onChange={(e) => setJournalText('m2', e.target.value)}
                    placeholder="Describe por qué te llaman la atención estas plantas sutiles, qué vibración deseas que aporten en tu día..."
                    className="w-full h-36 p-4 text-xs tracking-wide bg-[#FAF9F5] border border-[#D5E1D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D4A30]/10 focus:border-[#2D4A30] text-[#2C3E2D] leading-relaxed resize-none"
                    id="journal-input-m2"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-[#2C3E2D]">Conversar con Verónica</h4>
                      <p className="text-[10px] text-gray-400">Verónica te dará su visión holística de tu escuadrón botánico.</p>
                    </div>
                    <button
                      onClick={() => consultVeronica('m2')}
                      disabled={isConsultingVeronica || !progress.bitacora.m2.userAnswer.trim()}
                      className="px-5 py-2.5 bg-[#2D4A30] hover:bg-[#385B3C] text-white disabled:bg-gray-200 disabled:text-gray-400 rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      {isConsultingVeronica ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Verónica lee...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Entablar Conversación</span>
                        </>
                      )}
                    </button>
                  </div>
                  {veronicaError && (
                    <p className="text-[11px] text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">{veronicaError}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* MODULE 3: CREAR 🪴 */}
            {progress.activeModuleId === 'm3' && (
              <motion.div
                key="m3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#FAF9F5] pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#427A5B]">Módulo 3</span>
                      <h2 className="font-serif text-2xl text-[#1E2E20] font-light">
                        Crear tu Refugio Verde Físico 🪴
                      </h2>
                    </div>
                    <span className="text-3xl">🪴</span>
                  </div>

                  <p className="text-xs text-[#53735E] leading-relaxed">
                    Es momento de consagrar un rincón. Un refugio verde. Aunque poseas poco espacio o casi nada de experiencia previa, acondicionar la luz, ventilación y armonía visual te invita a centrar tu atención.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                    
                    {/* Spot configurations form */}
                    <div className="space-y-3.5 p-4 bg-[#FAF9F5] rounded-2xl border border-[#E2ECE3]">
                      <h4 className="font-bold text-[#2D4A30] uppercase text-[10px] tracking-wider flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> CONFIGURACIÓN DEL ESPACIO
                      </h4>

                      <div className="space-y-1">
                        <label className="text-gray-500 text-[11px]">Tipo de rincón natural:</label>
                        <select
                          value={progress.spaceDesign.spotType}
                          onChange={(e: any) => setProgress(p => ({
                            ...p,
                            spaceDesign: { ...p.spaceDesign, spotType: e.target.value }
                          }))}
                          className="w-full p-2 bg-white border border-[#C5DCD0]/60 rounded-lg font-medium text-[#2C3E2D]"
                        >
                          <option value="window">Una ventana templada</option>
                          <option value="balcony">Un balcón abierto</option>
                          <option value="shelf">Una repisa o estantería especial</option>
                          <option value="table">Mesa auxiliar junto a tu lectura o escritorio</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-500 text-[11px]">Nivel de luz natural disponible:</label>
                        <select
                          value={progress.spaceDesign.lightLevel}
                          onChange={(e: any) => setProgress(p => ({
                            ...p,
                            spaceDesign: { ...p.spaceDesign, lightLevel: e.target.value }
                          }))}
                          className="w-full p-2 bg-white border border-[#C5DCD0]/60 rounded-lg font-medium text-[#2C3E2D]"
                        >
                          <option value="high">Luz intensa (sol directo de frente)</option>
                          <option value="medium">Luz media tamizada</option>
                          <option value="low">Sombra protectora o luz tenue</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-500 text-[11px]">Elementos decorativos armónicos:</label>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['Piedras energéticas', 'Vela sutil', 'Bitácora a la mano', 'Sahumerios de lavanda', 'Texturas de mimbre'].map(dec => {
                            const isIncluded = progress.spaceDesign.decorations.includes(dec);
                            return (
                              <button
                                key={dec}
                                onClick={() => setProgress(p => {
                                  let list = [...p.spaceDesign.decorations];
                                  if (list.includes(dec)) {
                                    list = list.filter(item => item !== dec);
                                  } else {
                                    list.push(dec);
                                  }
                                  return { ...p, spaceDesign: { ...p.spaceDesign, decorations: list } };
                                })}
                                className={`px-2.5 py-1 rounded text-[10px] font-medium border ${
                                  isIncluded
                                    ? 'bg-emerald-100 border-[#A8C4B5] text-[#2D4A30]'
                                    : 'bg-white border-gray-200 text-gray-500'
                                }`}
                              >
                                {dec}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Photo Uploader Simulator */}
                    <div className="flex flex-col justify-between p-4 bg-white rounded-2xl border border-[#E2ECE3]">
                      <div>
                        <h4 className="font-bold text-[#2D4A30] uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5" /> REGISTRAR TU REFUGIO VERDE
                        </h4>
                        <p className="text-[11px] text-gray-400 mb-3 leading-normal">
                          Añade una foto de tu rincón para ver el "antes y después". Si juegas en la maqueta, introduce un URL de imagen de planta o déjalo vacío para ilustrar tu refugio verde.
                        </p>
                      </div>

                      {progress.spaceDesign.photoUrl ? (
                        <div className="space-y-2">
                          <img
                            src={progress.spaceDesign.photoUrl}
                            alt="Tu rincón de plantas"
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            onClick={() => setProgress(p => ({
                              ...p,
                              spaceDesign: { ...p.spaceDesign, photoUrl: undefined }
                            }))}
                            className="text-[10px] text-red-500 hover:underline"
                          >
                            Eliminar foto x
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handlePhotoSubmit} className="space-y-2">
                          <input
                            type="text"
                            placeholder="Introduce URL de imagen, e.g. un enlace..."
                            value={customPhotoInput}
                            onChange={(e) => setCustomPhotoInput(e.target.value)}
                            className="w-full p-2 bg-[#FAF9F5] border border-gray-200 rounded-lg text-[10px]"
                          />
                          <button
                            type="submit"
                            className="w-full py-2 bg-[#FAF9F5] text-[#2C3E2D] border border-gray-300 rounded-lg hover:border-[#2D4A30] text-[10px] font-medium flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Confirmar Imagen</span>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-[#53735E] uppercase tracking-wider">Actividades Clave para Crear:</span>
                    {[
                      { id: 't3_1', label: 'Elegir tu maceta con adecuado orificio de drenaje.' },
                      { id: 't3_2', label: 'Acomodar tus plantas aliadas en orden según su requerimiento lumínico.' }
                    ].map(task => (
                      <div key={task.id} className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleTaskToggle(task.id)}
                          className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${
                            progress.completedTaskIds.includes(task.id)
                              ? 'bg-[#2D4A30] border-[#2D4A30] text-white'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {progress.completedTaskIds.includes(task.id) && <span className="text-[10px] font-bold">✓</span>}
                        </button>
                        <span className={`text-xs ${progress.completedTaskIds.includes(task.id) ? 'line-through text-gray-400' : 'text-[#4E5E50]'}`}>
                          {task.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bitacora */}
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <h3 className="font-serif text-lg text-[#1E2E20] flex items-center gap-1.5">
                    <Feather className="w-4 h-4 text-[#427A5B]" />
                    <span>Bitácora de Entrada: Siente tu Espacio</span>
                  </h3>

                  <blockquote className="text-xs bg-[#FAF9F5] p-4 rounded-xl border border-gray-100 text-[#53735E] italic">
                    "{progress.bitacora.m3.promptQuestion}"
                  </blockquote>

                  <textarea
                    value={progress.bitacora.m3.userAnswer}
                    onChange={(e) => setJournalText('m3', e.target.value)}
                    placeholder="¿Qué sensaciones tienes al observar este refugio verde nacer? ¿Sientes que cambia el aire de tu habitación?"
                    className="w-full h-36 p-4 text-xs tracking-wide bg-[#FAF9F5] border border-[#D5E1D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D4A30]/10 focus:border-[#2D4A30] text-[#2C3E2D] leading-relaxed resize-none"
                    id="journal-input-m3"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-[#2C3E2D]">Conversar con Verónica</h4>
                      <p className="text-[10px] text-gray-400">Verónica te dará su apreciación sobre la conformación de tu templo.</p>
                    </div>
                    <button
                      onClick={() => consultVeronica('m3')}
                      disabled={isConsultingVeronica || !progress.bitacora.m3.userAnswer.trim()}
                      className="px-5 py-2.5 bg-[#2D4A30] hover:bg-[#385B3C] text-white disabled:bg-gray-200 disabled:text-gray-400 rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      {isConsultingVeronica ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Verónica lee...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Entablar Conversación</span>
                        </>
                      )}
                    </button>
                  </div>
                  {veronicaError && (
                    <p className="text-[11px] text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">{veronicaError}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* MODULE 4: CULTIVAR 🌸 */}
            {progress.activeModuleId === 'm4' && (
              <motion.div
                key="m4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Embedded Guided Meditations player */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 px-1 pb-1">
                    <span className="text-xl">🧘</span>
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#427A5B] block">OBSEQUIO ADICIONAL INTEGRADO</span>
                      <h4 className="font-serif text-lg text-[#1E2E20] font-bold">Tus Meditaciones Guiadas de Respiración Alquímica</h4>
                    </div>
                  </div>
                  <MeditationsPlayer />
                </div>
                {/* 5-Min Interactive Ritual Widget */}
                <div className="bg-gradient-to-br from-[#1E2E20] to-[#2D4A30] text-[#FAF9F5] p-6 rounded-3xl shadow-md space-y-4 border border-[#132014]">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 font-mono">EJERCICIO DE RESPIRACIÓN Y PRESENCIA</span>
                      <h3 className="font-serif text-xl">El Ritual de los 5 Minutos™</h3>
                    </div>
                    
                    {/* Audio enable button */}
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] text-white flex items-center gap-1 transition-all"
                    >
                      {soundEnabled ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>Sonido: ON</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                          <span>Sonido: OFF</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-[#C5DCD0] font-light leading-relaxed">
                    Un hábito sin culpa. Observar tu planta, respirar profundo, conectar con su aroma e integrarte al momento presente. Presiona el botón para dar inicio a un ciclo guiado de centramiento de un minuto.
                  </p>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center py-8 space-y-4">
                    
                    {/* Breathing circle pulse graphic */}
                    <div className="relative flex items-center justify-center">
                      <AnimatePresence mode="popLayout">
                        {isMeditating && (
                          <motion.div
                            key={breathPhase}
                            initial={{ scale: breathPhase === 'inhale' ? 0.7 : 1.3 }}
                            animate={{ 
                              scale: breathPhase === 'inhale' ? 1.35 : breathPhase === 'hold' ? 1.35 : 0.8,
                              opacity: [0.6, 1, 0.6] 
                            }}
                            transition={{ 
                              duration: 4, 
                              ease: "easeInOut",
                              repeat: breathPhase === 'hold' ? Infinity : 0
                            }}
                            className={`w-32 h-32 rounded-full absolute mix-blend-screen opacity-15 blur-xs ${
                              breathPhase === 'inhale' 
                                ? 'bg-[#9FE2BF]' 
                                : breathPhase === 'hold' 
                                ? 'bg-[#A6C4FF]' 
                                : 'bg-[#E07A5F]'
                            }`}
                          />
                        )}
                      </AnimatePresence>
                      
                      <div className="w-24 h-24 rounded-full border border-white/10 flex flex-col items-center justify-center text-center z-10 bg-[#1E2E20] shadow-md">
                        {isMeditating ? (
                          <>
                            <span className="text-[10px] text-amber-300 font-mono font-bold uppercase tracking-widest">{breathPhase}</span>
                            <span className="text-2xl font-bold font-mono mt-1">{meditationSeconds}s</span>
                          </>
                        ) : (
                          <Sprout className="w-8 h-8 text-amber-300 animate-bounce" />
                        )}
                      </div>
                    </div>

                    <div className="text-center space-y-1 max-w-sm">
                      <p className="text-xs font-semibold text-amber-200">{meditationMessage}</p>
                      <p className="text-[10px] text-gray-400 italic">Rituales completados esta semana: {progress.meditationsCompletedCount}</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsMeditating(!isMeditating);
                        if(!isMeditating) {
                          setMeditationSeconds(60);
                          playChime(440, 'sine', 0.2, 0.8);
                        }
                      }}
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        isMeditating
                          ? 'bg-rose-600 text-white hover:bg-rose-700'
                          : 'bg-amber-300 text-black hover:bg-amber-400'
                      }`}
                    >
                      {isMeditating ? 'Detener Ritual' : 'Iniciar Conexión Diaria (60s)'}
                    </button>
                  </div>
                </div>

                {/* CARE CALENDAR - CUSTOM SPECIFIC TO PLANTS CHOSEN */}
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#427A5B] font-mono">Herramienta Bonus 3</span>
                      <h3 className="font-serif text-lg text-[#1E2E20]">Tu Calendario de Cuidados Conscientes</h3>
                    </div>
                    <CalendarIcon className="w-5 h-5 text-[#427A5B]" />
                  </div>

                  <p className="text-xs text-[#53735E] leading-normal">
                    La gente tiene temor de olvidar. Este calendario sutil calcula lo que tus aliadas elegidas necesitan hoy, para que cuides sin abrumarte ni sentir culpa:
                  </p>

                  <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 bg-[#FAF9F5]/40 text-xs text-[#4E5E50]" id="custom-care-calendar">
                    {generateCaresList().map((item, idx) => (
                      <div key={idx} className="p-3.5 flex items-start gap-3 hover:bg-white transition-colors">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          className="mt-0.5 rounded text-[#2D4A30] focus:ring-[#2D4A30]"
                          onChange={() => playChime(523, 'sine', 0.05, 0.15)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#2C3E2D]">{item.task}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] bg-[#E2ECE3] text-[#2D4A30] px-1.5 rounded font-bold uppercase tracking-wide">
                              {item.plantName}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono italic">Frecuencia: {item.frequency}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tasks */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-[#53735E] uppercase tracking-wider">Actividades Clave para Cultivar:</span>
                    {[
                      { id: 't4_1', label: 'Humedecer la tierra con cuidado solo cuando el calendario lo estipule.' },
                      { id: 't4_2', label: 'Escribir tus observaciones diarias en tu bitácora.' }
                    ].map(task => (
                      <div key={task.id} className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleTaskToggle(task.id)}
                          className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${
                            progress.completedTaskIds.includes(task.id)
                              ? 'bg-[#2D4A30] border-[#2D4A30] text-white'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {progress.completedTaskIds.includes(task.id) && <span className="text-[10px] font-bold">✓</span>}
                        </button>
                        <span className={`text-xs ${progress.completedTaskIds.includes(task.id) ? 'line-through text-gray-400' : 'text-[#4E5E50]'}`}>
                          {task.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bitacora */}
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <h3 className="font-serif text-lg text-[#1E2E20] flex items-center gap-1.5">
                    <Feather className="w-4 h-4 text-[#427A5B]" />
                    <span>Bitácora de Entrada: Observa los Cambios</span>
                  </h3>

                  <blockquote className="text-xs bg-[#FAF9F5] p-4 rounded-xl border border-gray-100 text-[#53735E] italic">
                    "{progress.bitacora.m4.promptQuestion}"
                  </blockquote>

                  <textarea
                    value={progress.bitacora.m4.userAnswer}
                    onChange={(e) => setJournalText('m4', e.target.value)}
                    placeholder="¿Has notado alguna hoja nueva? ¿Cómo se siente dedicar 5 minutos únicamente a observar y respirar?"
                    className="w-full h-36 p-4 text-xs tracking-wide bg-[#FAF9F5] border border-[#D5E1D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D4A30]/10 focus:border-[#2D4A30] text-[#2C3E2D] leading-relaxed resize-none"
                    id="journal-input-m4"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-[#2C3E2D]">Conversar con Verónica</h4>
                      <p className="text-[10px] text-gray-400">Verónica leerá tus ritmos cotidianos con compasión.</p>
                    </div>
                    <button
                      onClick={() => consultVeronica('m4')}
                      disabled={isConsultingVeronica || !progress.bitacora.m4.userAnswer.trim()}
                      className="px-5 py-2.5 bg-[#2D4A30] hover:bg-[#385B3C] text-white disabled:bg-gray-200 disabled:text-gray-400 rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      {isConsultingVeronica ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Verónica lee...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Entablar Conversación</span>
                        </>
                      )}
                    </button>
                  </div>
                  {veronicaError && (
                    <p className="text-[11px] text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">{veronicaError}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* MODULE 5: FLORECER ✨ */}
            {progress.activeModuleId === 'm5' && (
              <motion.div
                key="m5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#FAF9F5] pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#427A5B]">Módulo 5</span>
                      <h2 className="font-serif text-2xl text-[#1E2E20] font-light">
                        Celebrar tu Florecimiento ✨
                      </h2>
                    </div>
                    <span className="text-3xl">✨</span>
                  </div>

                  <p className="text-xs text-[#53735E] leading-relaxed">
                    Toda planta florece cuando recibe el cuidado oportuno. Las personas también. En esta última etapa culminarás el viaje contemplando tu rincón antes y después, y consolidando el compromiso amoroso de continuar cuidándote.
                  </p>

                  <div className="bg-amber-50/11 border border-amber-200/50 p-5 rounded-2xl text-xs text-[#2D4A30] space-y-3">
                    <h4 className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Feather className="w-4 h-4 text-[#A08848]" />
                      <span>Carta Especial para tu Yo del Futuro</span>
                    </h4>
                    <p className="text-[11px] text-[#4E5E50] leading-normal font-light">
                      Verónica aconseja redactar una pequeña epístola con tus compromisos de autocompasión y calidez. Hemos estructurado una plantilla sutil basada en tus vivencias de estos 30 días:
                    </p>
                    
                    <div className="bg-white border text-[11px] border-[#E2ECE3] p-4 rounded-xl leading-relaxed italic text-gray-600 block shadow-2xs font-mono relative">
                      <button 
                        onClick={() => handleCopyToClipboard(`Carta de Refugio Verde para ${userName}:\nQuerida de cara al futuro. Hoy cierro un viaje de 30 días cultivando la intención de ${progress.intention}. He constatado que al regar y sostener la vida, también florecía en mí la paciencia. Me comprometo a pausar, respirar hondo con mis plantas aliadas, y recordar siempre que el crecimiento ocurre paso a paso, hoja a hoja.`)}
                        className="absolute top-2 right-2 p-1.5 bg-gray-50 hover:bg-gray-100 rounded text-gray-400"
                        title="Copiar carta"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <p>
                        "Querida {userName} de cara al futuro. Hoy cierro un viaje de 30 días cultivando la intención de <strong>{progress.intention}</strong>. he constatado que al regar y sostener la vida física en mi ventana, también florecía en mí la paciencia. Me comprometo a pausar por lo menos 5 minutos diarios, contemplar mis plantas aliadas, y recordar siempre que mi crecimiento sutil ocurre paso a paso, hoja a hoja."
                      </p>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-[#53735E] uppercase tracking-wider">Actividades para tu Ceremonia:</span>
                    {[
                      { id: 't5_1', label: 'Escribir tu reflexión final y carta de futuro.' },
                      { id: 't5_2', label: 'Ofrecer una pizca de agua y gratitud a cada una de tus plantas aliadas.' }
                    ].map(task => (
                      <div key={task.id} className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleTaskToggle(task.id)}
                          className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${
                            progress.completedTaskIds.includes(task.id)
                              ? 'bg-[#2D4A30] border-[#2D4A30] text-white'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {progress.completedTaskIds.includes(task.id) && <span className="text-[10px] font-bold">✓</span>}
                        </button>
                        <span className={`text-xs ${progress.completedTaskIds.includes(task.id) ? 'line-through text-gray-400' : 'text-[#4E5E50]'}`}>
                          {task.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bitacora */}
                <div className="bg-white p-6 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4">
                  <h3 className="font-serif text-lg text-[#1E2E20] flex items-center gap-1.5">
                    <Feather className="w-4 h-4 text-[#427A5B]" />
                    <span>Bitácora de Entrada: Reflexión de Cierre</span>
                  </h3>

                  <blockquote className="text-xs bg-[#FAF9F5] p-4 rounded-xl border border-gray-100 text-[#53735E] italic">
                    "{progress.bitacora.m5.promptQuestion}"
                  </blockquote>

                  <textarea
                    value={progress.bitacora.m5.userAnswer}
                    onChange={(e) => setJournalText('m5', e.target.value)}
                    placeholder="Escribe libremente... ¿Qué ha florecido verdaderamente en ti en este periodo?"
                    className="w-full h-36 p-4 text-xs tracking-wide bg-[#FAF9F5] border border-[#D5E1D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D4A30]/10 focus:border-[#2D4A30] text-[#2C3E2D] leading-relaxed resize-none"
                    id="journal-input-m5"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-[#2C3E2D]">Conversar con Verónica</h4>
                      <p className="text-[10px] text-gray-400">Verónica coronará tu proceso con una bendición final.</p>
                    </div>
                    <button
                      onClick={() => consultVeronica('m5')}
                      disabled={isConsultingVeronica || !progress.bitacora.m5.userAnswer.trim()}
                      className="px-5 py-2.5 bg-[#2D4A30] hover:bg-[#385B3C] text-white disabled:bg-gray-200 disabled:text-gray-400 rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      {isConsultingVeronica ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Verónica lee...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Entablar Conversación</span>
                        </>
                      )}
                    </button>
                  </div>
                  {veronicaError && (
                    <p className="text-[11px] text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">{veronicaError}</p>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Side: The Living Diary Cabinet & Botiquín (lg:col-span-3) */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Active Plant Remedies: Botiquín Verde (Bonus 4) */}
          <div className="bg-white p-5 rounded-3xl border border-[#E2ECE3] shadow-sm space-y-4" id="botiquin-section">
            <div className="flex gap-1.5 items-center justify-between border-b border-[#FAF9F5] pb-2.5">
              <span className="text-[10px] font-bold tracking-widest text-[#427A5B] uppercase font-mono">
                Botiquín Verde Activo
              </span>
              <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                {progress.selectedPlantIds.length} Recetarios
              </span>
            </div>

            <p className="text-[11px] text-gray-400 leading-normal">
              Recetas y usos prácticos desbloqueados según las plantas que estás cuidando:
            </p>

            <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
              {progress.selectedPlantIds.map(plantId => {
                const plant = PLANTS_DATA.find(p => p.id === plantId);
                if (!plant) return null;
                return (
                  <div key={plantId} className="bg-[#FAF9F5] p-3 rounded-xl border border-[#E2ECE3]/60 space-y-2">
                    <h5 className="text-[11px] font-bold text-[#1E2E20] flex items-center gap-1">
                      <Sprout className="w-3 h-3 text-[#427A5B]" />
                      <span>{plant.name}</span>
                    </h5>
                    <div className="space-y-1.5">
                      {plant.botiquin.uses.map((use, i) => (
                        <div key={i} className="text-[10px] text-[#4E5E50] border-l border-[#2D4A30]/20 pl-2">
                          <strong className="text-[#2D4A30] uppercase text-[8px] tracking-wide block">{use.type}</strong>
                          <span className="leading-normal">{use.instructions}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verónica's Living Letters (Gemini continuous dialogue chest) */}
          <div className="bg-[#FAF9F5] p-5 rounded-3xl border border-amber-200/40 relative space-y-4">
            <div className="absolute top-0 right-10 w-2 h-2 rounded-full bg-amber-400 animate-ping"></div>
            
            <h4 className="font-serif text-[#2D4A30] text-sm font-semibold flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>Cartas sutiles de Verónica</span>
            </h4>

            <div className="min-h-40 max-h-96 overflow-y-auto pr-1 space-y-4">
              {/* Show most recent reflection on top */}
              {progress.bitacora[progress.activeModuleId]?.veronicaResponse ? (
                <div className="bg-white p-4 rounded-xl border border-[#E2ECE3] space-y-3 shadow-3xs">
                  <span className="text-[8px] font-mono font-bold tracking-widest text-[#427A5B]/80 uppercase bg-[#E2ECE3]/50 px-2 py-0.5 rounded">
                    CONVERSACIÓN {getModuleTitle(progress.activeModuleId).split('-')[0]}
                  </span>
                  <div className="text-[11px] text-[#2C3E2D] leading-relaxed italic whitespace-pre-line font-serif">
                    {progress.bitacora[progress.activeModuleId].veronicaResponse}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400 space-y-2.5">
                  <Feather className="w-6 h-6 text-gray-300 mx-auto stroke-[1.2]" />
                  <p className="text-[11px] font-light leading-relaxed px-4">
                    "Escribe en tu bitácora para este módulo y presiona el botón <strong>Entablar Conversación</strong>. Te contestaré detallando la química sutil de tu momento."
                  </p>
                </div>
              )}

              {/* Show older responses if they exist */}
              {Object.keys(progress.bitacora).map(mid => {
                // Skips current because we already show it on top
                if (mid === progress.activeModuleId) return null;
                const entry = progress.bitacora[mid];
                if (!entry.veronicaResponse) return null;
                
                return (
                  <div key={mid} className="bg-white/50 p-4 rounded-xl border border-gray-100 space-y-2">
                    <span className="text-[8px] font-mono font-bold text-gray-400 uppercase">
                      Archivo: {getModuleTitle(mid).split('-')[0]}
                    </span>
                    <div className="text-[10px] text-gray-500 line-clamp-3 italic whitespace-pre-line leading-relaxed font-serif">
                      {entry.veronicaResponse}
                    </div>
                    <button
                      onClick={() => setProgress(p => ({ ...p, activeModuleId: mid }))}
                      className="text-[10px] text-[#427A5B] font-semibold hover:underline"
                    >
                      Ver respuesta completa
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
        
      </main>

      {/* Decorative Brand Bottom Banner */}
      <footer className="bg-white border-t border-[#E2ECE3] py-4 text-center mt-auto">
        <p className="text-[10px] text-gray-400 italic">
          "Donde sanar es crecer." · Refugio Verde™ desarrollado para la comunidad alquímica.
        </p>
      </footer>
    </div>
  );
}
