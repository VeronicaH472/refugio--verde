import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Compass, Wind, Sunset, Sun } from 'lucide-react';

interface Meditation {
  id: string;
  title: string;
  theme: string;
  desc: string;
  plantRef: string;
  icon: string;
  iconBg: string; // colors that match the plant
  soundType: 'sine' | 'triangle' | 'sawtooth';
  frequencies: number[]; // chord representation
  instruction: string;
}

const MEDITATIONS: Meditation[] = [
  {
    id: 'tierra',
    title: 'Meditación 1: Enraizamiento de Tierra',
    theme: 'Para descender la mente y conectar con el aquí y el ahora.',
    desc: 'Un bálsamo para desactivar el cortisol e integrar tu presencia con tu entorno.',
    plantRef: 'Inspirada en el aroma de la Lavanda 🌸',
    icon: '🌸',
    iconBg: 'bg-[#EDE7F6] text-[#673AB7]',
    soundType: 'triangle',
    frequencies: [261.63, 329.63, 392.00], // C4 major: C4, E4, G4 - grounding, peaceful
    instruction: 'Siente tus pies enraizados con firmeza espiritual en la tierra húmeda. Observa el espacio que habitas sin prisa.'
  },
  {
    id: 'fuego',
    title: 'Meditación 2: Foco Solar Activo',
    theme: 'Para despejar la bruma mental y canalizar tu fuego creador.',
    desc: 'Un ritual vigorizante y claro para despertar tu foco consciente sin ansiedad.',
    plantRef: 'Inspirada en el vigor del Romero 🌿',
    icon: '🌿',
    iconBg: 'bg-[#EBF5EE] text-[#2D4A30]',
    soundType: 'sine',
    frequencies: [293.66, 369.99, 440.00], // D4 major: D4, F#4, A4 - solar, focused, active
    instruction: 'Siente el calor de cada respiración expandirse como rayos de sol en tu pecho, dándote claridad ejecutiva y templanza.'
  },
  {
    id: 'viento',
    title: 'Meditación 3: Viento de Purificación',
    theme: 'Para soltar culpas, rigores ajenos y drenar pensamientos densos.',
    desc: 'Espacio de purificación somática para vaciar la mente cargada de la jornada.',
    plantRef: 'Inspirada en la frescura de la Menta 🍃',
    icon: '🍃',
    iconBg: 'bg-[#E0F2F1] text-[#009688]',
    soundType: 'sine',
    frequencies: [329.63, 415.30, 493.88], // E4 major: E4, G#4, B4 - ethereal, expansive, refreshing
    instruction: 'Imagina una brisa fresca recorriendo tus tensiones. Suelta todo lo que pesa con la misma naturalidad que una planta libera su follaje.'
  }
];

export default function MeditationsPlayer() {
  const [activeSession, setActiveSession] = useState<Meditation>(MEDITATIONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'holdFull' | 'exhale' | 'holdEmpty'>('inhale');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.15);
  
  // Timing variables
  const CYCLE_LENGTH = 16; // 4s inhale, 4s hold, 4s exhale, 4s hold
  const phaseSeconds = (secondsElapsed % 4) + 1;

  // Web Audio Context & Synthesizer refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  // Determine current phase
  useEffect(() => {
    if (!isPlaying) return;

    const currentCycleSec = secondsElapsed % CYCLE_LENGTH;
    let currentPhase: 'inhale' | 'holdFull' | 'exhale' | 'holdEmpty' = 'inhale';

    if (currentCycleSec < 4) {
      currentPhase = 'inhale';
    } else if (currentCycleSec < 8) {
      currentPhase = 'holdFull';
    } else if (currentCycleSec < 12) {
      currentPhase = 'exhale';
    } else {
      currentPhase = 'holdEmpty';
    }

    setBreathPhase(currentPhase);
    handleAudioModulation(currentPhase);
  }, [secondsElapsed, isPlaying]);

  // Main countdown ticker
  useEffect(() => {
    let ticker: NodeJS.Timeout;

    if (isPlaying) {
      ticker = setInterval(() => {
        setSecondsElapsed((prev) => {
          const nextVal = prev + 1;
          // Play a transitional cue on phase boundaries (every 4 seconds)
          if (nextVal % 4 === 0) {
            playBoundaryTone();
          }
          return nextVal;
        });
      }, 1000);
    }

    return () => clearInterval(ticker);
  }, [isPlaying, activeSession]);

  // Handle play / pause toggle & Web Audio Initialization
  const togglePlay = () => {
    if (!isPlaying) {
      initAudioEngine();
      setIsPlaying(true);
      playBoundaryTone();
    } else {
      stopAudioEngine();
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setSecondsElapsed(0);
    setBreathPhase('inhale');
    stopAudioEngine();
    setIsPlaying(false);
  };

  const selectSession = (session: Meditation) => {
    setActiveSession(session);
    setSecondsElapsed(0);
    setBreathPhase('inhale');
    if (isPlaying) {
      stopAudioEngine();
      // Restart with new parameters
      setTimeout(() => {
        initAudioEngine();
        playBoundaryTone();
      }, 50);
    }
  };

  // 4-times (Box) boundaries tone: play a beautiful soothing bell
  const playBoundaryTone = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      if (!audioCtxRef.current) audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = ctx.createDelay();
      const feedback = ctx.createGain();

      // Soft high crystal chime: uses the primary frequency of active meditation + octave
      const baseFreq = activeSession.frequencies[0] * 2; // high octave
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.type = 'sine';

      gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

      // Simple delay structure to make it feel echoey and spiritual
      delay.delayTime.value = 0.35;
      feedback.gain.value = 0.3;

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Create feedback loop
      gain.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  };

  // Initialize continuous humming synth pad (Drones representing the earth or breeze)
  const initAudioEngine = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      // Ensure context is not suspended
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, ctx.currentTime);
      filterRef.current = filter;

      // Create main gain
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(volume * 0.2, ctx.currentTime);
      mainGainRef.current = mainGain;

      // Base oscillator (Low drone)
      const osc = ctx.createOscillator();
      osc.type = activeSession.soundType;
      // Root frequency of current session
      osc.frequency.setValueAtTime(activeSession.frequencies[0] / 2, ctx.currentTime); // low octave
      oscRef.current = osc;

      // Soft LFO (Low Frequency Oscillator) to filter cut so it swells organically like breathing
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.125, ctx.currentTime); // very slow 8s cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(80, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfoRef.current = lfo;

      // Connect nodes
      osc.connect(filter);
      filter.connect(mainGain);
      mainGain.connect(ctx.destination);

      // Start sounds
      osc.start();
      lfo.start();
    } catch (e) {
      console.warn('Synth init failed:', e);
    }
  };

  // Modulate drone sounds in sync with breathing phase
  const handleAudioModulation = (phase: 'inhale' | 'holdFull' | 'exhale' | 'holdEmpty') => {
    if (!soundEnabled || !mainGainRef.current || !filterRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    try {
      if (phase === 'inhale') {
        // swell volume and filter cutoff up
        mainGainRef.current.gain.linearRampToValueAtTime(volume * 0.5, ctx.currentTime + 3.8);
        filterRef.current.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 3.8);
      } else if (phase === 'holdFull') {
        // hold thick and rich
        mainGainRef.current.gain.linearRampToValueAtTime(volume * 0.5, ctx.currentTime + 3.8);
        filterRef.current.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 3.8);
      } else if (phase === 'exhale') {
        // decay volume and cutoff down
        mainGainRef.current.gain.linearRampToValueAtTime(volume * 0.1, ctx.currentTime + 3.8);
        filterRef.current.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 3.8);
      } else {
        // hold quiet
        mainGainRef.current.gain.linearRampToValueAtTime(volume * 0.05, ctx.currentTime + 3.8);
        filterRef.current.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 3.8);
      }
    } catch (e) {
      // safe bypass
    }
  };

  const stopAudioEngine = () => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (lfoRef.current) {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
        lfoRef.current = null;
      }
      mainGainRef.current = null;
      filterRef.current = null;
    } catch (e) {
      // safe bypass
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAudioEngine();
    };
  }, []);

  const getPhaseColorClass = () => {
    switch(breathPhase) {
      case 'inhale': return 'text-[#427A5B] bg-[#E2ECE3] border-[#BACFBD]';
      case 'holdFull': return 'text-sky-700 bg-sky-50 border-sky-200';
      case 'exhale': return 'text-[#E07A5F] bg-[#FDF0EC] border-[#F1C5B9]';
      case 'holdEmpty': return 'text-purple-700 bg-purple-50 border-purple-200';
    }
  };

  const getPhaseLabelEs = () => {
    switch(breathPhase) {
      case 'inhale': return 'INHALAR 🌬️';
      case 'holdFull': return 'RETENER LLENO 🌟';
      case 'exhale': return 'EXHALAR 🍃';
      case 'holdEmpty': return 'RETENER VACÍO ❄️';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E2ECE3] p-5 shadow-xs space-y-6 text-left" id="meditations-player-showcase">
      {/* Short technique description */}
      <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#BACFBD]/40 space-y-2.5">
        <h6 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#2D4A30] flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#E07A5F] animate-spin" style={{ animationDuration: '20s' }} /> RELAJACIÓN EN 4 TIEMPOS (BOX BREATHING)
        </h6>
        <p className="text-[11px] text-[#4E5E50] leading-relaxed">
          Esta práctica de coherencia es el pilar central del programa. <strong>Inhala por 4 segundos, sostén por 4, exhala por 4 y descansa en vacío absoluto por otros 4</strong>. Visualiza el ciclo dinámico de tu refugio verde botánico para desarmar la prisa:
        </p>

        {/* 4 Steps visual aid grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 text-center font-sans">
          {[
            { tag: '01. Inhalar 🌬️', seconds: '4 segundos', desc: 'Asimilar fuerza' },
            { tag: '02. Retener lleno 🌟', seconds: '4 segundos', desc: 'Distribuir savia' },
            { tag: '03. Exhalar 🍃', seconds: '4 segundos', desc: 'Soltar rigideces' },
            { tag: '04. Retener vacío ❄️', seconds: '4 segundos', desc: 'Raíz en silencio' }
          ].map((st, i) => (
            <div key={i} className="p-2 bg-white rounded-xl border border-gray-100 flex flex-col justify-center items-center">
              <span className="text-[10px] font-bold text-[#2D4A30] block">{st.tag}</span>
              <span className="text-[9px] text-[#E07A5F] font-semibold">{st.seconds}</span>
              <span className="text-[7.5px] text-gray-400 font-light block">{st.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Select meditation sessions list */}
      <div className="space-y-2.5">
        <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#2D4A30] block">Escoge tu Sesión de Conexión (Menos de 5 minutos):</strong>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {MEDITATIONS.map((session) => {
            const isSelected = activeSession.id === session.id;
            return (
              <button
                key={session.id}
                type="button"
                onClick={() => selectSession(session)}
                className={`p-3 rounded-2xl text-left border cursor-pointer transition-all duration-300 focus:outline-none flex flex-col justify-between h-[105px] ${
                  isSelected 
                    ? 'bg-white border-[#2D4A30] shadow-sm ring-1 ring-[#2D4A30]/30' 
                    : 'bg-[#FAF9F5] border-[#E2ECE3]/80 hover:bg-white hover:border-[#D5E1D6]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs select-none ${session.iconBg}`}>
                      {session.icon}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#E07A5F]">TEMA {session.id.toUpperCase()}</span>
                  </div>
                  <h6 className="text-[10.5px] font-bold text-[#1E2E20] leading-tight mt-1 group-hover:text-amber-800 transition-colors">
                    {session.title.replace('Meditación ', 'N°')}
                  </h6>
                  <p className="text-[9px] text-gray-400 font-light leading-snug mt-0.5 line-clamp-2">
                    {session.theme}
                  </p>
                </div>
                <span className="text-[8px] italic text-[#427A5B] font-medium leading-none mt-1">
                  {session.plantRef}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Central Audio Player View */}
      <div className="bg-[#FAF9F5] border border-[#E2ECE3] rounded-2xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* Visual Breathing Loop Circle (Box Breathing guide) cols 5 */}
        <div className="md:col-span-5 flex flex-col items-center justify-center py-2 h-full">
          <div className="relative flex items-center justify-center w-36 h-36">
            
            {/* Box Breathing graphic outline */}
            <div className="absolute inset-0 border border-dashed border-[#BACFBD]/50 rounded-2xl w-full h-full" />
            
            {/* Soft scale breath pulse overlay background */}
            <AnimatePresence mode="popLayout">
              {isPlaying && (
                <motion.div
                  key={breathPhase}
                  initial={{ scale: breathPhase === 'inhale' ? 0.8 : breathPhase === 'holdFull' ? 1.35 : 1.35 }}
                  animate={{ 
                    scale: breathPhase === 'inhale' ? 1.35 : breathPhase === 'holdFull' ? 1.35 : breathPhase === 'exhale' ? 0.8 : 0.8,
                    opacity: breathPhase === 'holdFull' || breathPhase === 'holdEmpty' ? [0.2, 0.4, 0.2] : 0.35,
                    borderRadius: ["20%", "30%", "20%"]
                  }}
                  transition={{ 
                    duration: 4, 
                    ease: "easeInOut",
                    repeat: breathPhase === 'holdFull' || breathPhase === 'holdEmpty' ? Infinity : 0
                  }}
                  className={`absolute inset-3 blur-xs opacity-20 ${
                    breathPhase === 'inhale' 
                      ? 'bg-[#9FE2BF]' 
                      : breathPhase === 'holdFull' 
                      ? 'bg-[#A6C4FF]' 
                      : breathPhase === 'exhale' 
                      ? 'bg-[#F1C5B9]' 
                      : 'bg-purple-200'
                  }`}
                />
              )}
            </AnimatePresence>

            {/* Main Interactive Circle */}
            <div className="w-28 h-28 rounded-full border border-[#E2ECE3] shadow-inner bg-white flex flex-col items-center justify-center text-center z-10 transition-colors duration-300">
              {isPlaying ? (
                <div className="space-y-1">
                  <span className="text-[8.5px] font-bold text-gray-400 font-mono tracking-widest uppercase block">TRANSICIÓN</span>
                  <div className="font-serif text-[#1E2E20] font-bold text-3xl leading-none">
                    {phaseSeconds}
                    <span className="text-xs text-gray-400 font-mono font-light">/4s</span>
                  </div>
                  <span className="text-[7.5px] uppercase tracking-wider font-mono text-[#E07A5F] px-1 bg-[#FDF0EC] rounded">
                    Mins: {Math.floor(secondsElapsed / 60)}:{(secondsElapsed % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-3xl select-none animate-pulse">{activeSession.icon}</span>
                  <span className="text-[9px] font-bold text-[#427A5B] font-mono tracking-wider mt-1.5 uppercase">LISTO</span>
                </div>
              )}
            </div>
            
            {/* Direct quadrant pointers */}
            <div className={`absolute top-2 font-mono text-[7px] font-bold leading-none ${breathPhase === 'holdFull' ? 'text-[#3B82F6]' : 'text-gray-300'}`}>RETIENE L.</div>
            <div className={`absolute bottom-2 font-mono text-[7px] font-bold leading-none ${breathPhase === 'holdEmpty' ? 'text-purple-500' : 'text-gray-300'}`}>RETIENE V.</div>
            <div className={`absolute left-2 font-mono text-[7px] font-bold leading-none origin-center -rotate-90 ${breathPhase === 'exhale' ? 'text-[#E07A5F]' : 'text-gray-300'}`}>EXHALAR</div>
            <div className={`absolute right-2 font-mono text-[7px] font-bold leading-none origin-center rotate-90 ${breathPhase === 'inhale' ? 'text-[#427A5B]' : 'text-gray-300'}`}>INHALAR</div>
          </div>
        </div>

        {/* Player Controls & Session Details: cols 7 */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F] bg-[#FAF3F0] px-2 py-0.5 rounded-full inline-block">
              {activeSession.plantRef}
            </span>
            <h4 className="font-serif text-base font-bold text-[#1E2E20] leading-tight mt-1.5">
              {activeSession.title}
            </h4>
            <p className="text-[11px] text-gray-500 font-light leading-relaxed mt-1">
              {activeSession.desc}
            </p>
          </div>

          {/* Current Dynamic Phase Box */}
          <div className="space-y-1.5">
            <span className="text-[8.5px] uppercase tracking-wider font-mono font-bold text-[#2D4A30] block">INDICACIÓN EN TIEMPO REAL:</span>
            <div className={`p-3 rounded-xl text-left border text-xs font-semibold leading-relaxed flex items-start gap-2 transition-all duration-300 ${isPlaying ? getPhaseColorClass() : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
              <span className="text-base select-none mt-0.5">{isPlaying ? '🧘' : '🌾'}</span>
              <div className="space-y-0.5 transition-all">
                <span className="block text-[10.5px] uppercase tracking-wide font-bold">
                  {isPlaying ? getPhaseLabelEs() : 'PULSA REPRODUCIR PARA DAR INICIO'}
                </span>
                <span className="text-[10px] font-normal leading-relaxed text-gray-500 block">
                  {isPlaying ? activeSession.instruction : 'Un viaje sensorial de respiración cíclica de 4 minutos para sintonizar con los latidos de tus aliadas.'}
                </span>
              </div>
            </div>
          </div>

          {/* Player controls bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              type="button"
              className={`px-4.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none shadow-xs ${
                isPlaying 
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100/60' 
                  : 'bg-[#2D4A30] border-[#1D3220] text-[#FAF9F5] hover:bg-[#3E6242] active:translate-y-0.5'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Coadyuvar Pausa</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                  <span>Reproducir Audio</span>
                </>
              )}
            </button>

            {/* Restart Button */}
            <button
              onClick={handleReset}
              type="button"
              className="p-2 border border-[#E2ECE3] hover:bg-white rounded-xl text-gray-400 hover:text-gray-600 transition-all cursor-pointer focus:outline-none"
              title="Reiniciar reproducción"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="flex-1" />

            {/* Soundtrack Controls */}
            <div className="flex items-center gap-2 text-xs bg-white border border-[#E2ECE3] px-3 py-1.5 rounded-xl font-sans">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                type="button"
                className="text-[#427A5B] hover:text-[#2D4A30] transition-transform cursor-pointer focus:outline-none"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              <div className="flex items-center gap-1">
                <input
                  type="range"
                  min={0.01}
                  max={0.5}
                  step={0.01}
                  value={volume}
                  onChange={(e) => {
                    const nextVol = Number(e.target.value);
                    setVolume(nextVol);
                    if (mainGainRef.current && audioCtxRef.current) {
                      mainGainRef.current.gain.setValueAtTime(nextVol * (breathPhase === 'inhale' || breathPhase === 'holdFull' ? 0.5 : 0.1), audioCtxRef.current.currentTime);
                    }
                  }}
                  disabled={!soundEnabled}
                  className="w-14 h-1 bg-[#E2ECE3] rounded-lg accent-[#427A5B] disabled:opacity-30 cursor-pointer"
                />
                <span className="text-[8.5px] text-gray-400 font-mono w-4 font-bold">{(Math.round(volume * 200))}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer advice */}
      <div className="text-[10.5px] text-gray-400 leading-normal italic text-left flex gap-1.5 items-start">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
        <span>
          <strong>Fisiología de la Calma:</strong> Al practicar el rito de los 4 tiempos, estimulas directamente tu nervio vago. Esto induce un cese inmediato del estado de emergencia biológica (lucha o huida), regulando la frecuencia cardíaca y permitiendo que te apertures espiritualmente ante la signatura botánica. No necesitas audífonos especiales, el sintetizador emite frecuencias Alfa terapéuticas directamente.
        </span>
      </div>
    </div>
  );
}
