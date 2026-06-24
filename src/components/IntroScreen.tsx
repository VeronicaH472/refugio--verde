import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  Check, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  Heart, 
  Compass, 
  ArrowRight,
  User,
  Coffee,
  Calendar,
  Layers,
  Award,
  Leaf,
  Upload,
  Image,
  Wind
} from 'lucide-react';

import bitacoraImg from '../assets/images/bitacora_mockup_1782191544571.jpg';
import guiaImg from '../assets/images/guia_aliadas_mockup_1782191555988.jpg';
import calendarioImg from '../assets/images/calendario_cuidados_mockup_1782191565487.jpg';
import botiquinImg from '../assets/images/botiquin_verde_mockup_1782191576682.jpg';
import comunidadImg from '../assets/images/comunidad_mockup_1782259079777.jpg';
import { PLANTS_DATA } from '../plantsData';
import MeditationsPlayer from './MeditationsPlayer';

interface IntroScreenProps {
  onEnterPortal: (userName: string) => void;
}

const ALQUIMIA_STAGES = [
  {
    step: "01",
    icon: "🌱",
    title: "DESPERTAR",
    quote: "Escuchar el llamado interior y sembrar tu propósito sutil.",
    essence: "Toda transformación empieza reconociendo dónde estamos. En esta etapa inicial, pasas de la inercia y la prisa mental a crear un espacio consciente de receptividad en tu vida cotidiana.",
    valueTitle: "El Valor Real: Romper el Ciclo de la Prisa",
    valueDesc: "No se trata simplemente de comprar una maceta protectora para adornar una mesa. El verdadero valor radica en fundar un rincón que declare formalmente: 'Este espacio de mi casa es inmune a la prisa y la autoexigencia'. Aprenderás a ver el cansancio como tierra que clama por nutrientes, transformando el cuidado de la tierra en un canal de autoescucha.",
    ritualTitle: "El Ritual Práctico: Tu Declaración de Intención",
    ritualSteps: [
      "Elige un rincón físico inicial en tu hogar que reciba luz natural indirecta.",
      "Identifica tu estado mental actual (Estrés, Dispersión, Rutina rígida).",
      "Elige un 'ancla de intención' inicial para tu rincón (Calma, Claridad o Confianza).",
      "Escribe tu primera intención en la Bitácora sutil integrada para activar tu alianza con la naturaleza."
    ],
    extraBenefit: "Alivio mental inmediato: El solo acto de designar un lugar exclusivo para pausar reduce de inmediato la carga cognitiva diaria."
  },
  {
    step: "02",
    icon: "🌿",
    title: "ELEGIR",
    quote: "Sintonizar con la sabiduría y signaturas de tus aliadas verdes.",
    essence: "No llenamos nuestra casa de plantas basadas únicamente en tendencias estéticas. Aprendemos a entablar un diálogo vibracional, vinculándonos con especies cuyas cualidades biológicas y energéticas equilibran nuestra energía.",
    valueTitle: "El Valor Real: Conectar con la Signatura de la Planta",
    valueDesc: "Descubre que las plantas son arquetipos vivos: la Lavanda no es solo aromática, expande tu respiración y tranquiliza los pensamientos obsesivos; el Romero no solo condimenta, activa la sangre, promueve la retención mental y fortalece la disciplina; la Menta refresca los conductos cognitivos y ayuda a romper bloqueos creativos; el Aloe enseña a estructurar límites saludables protegiendo tu suavidad interna.",
    ritualTitle: "El Ritual Práctico: El Test de Afinidad Herbal",
    ritualSteps: [
      "Explora el Herbario Alquímico digital de 6 aliadas básicas con sus virtudes biológicas y metafísicas.",
      "Identifica cuál de ellas resuena con tu estado metabólico o psicoemocional actual.",
      "Establece una alianza consciente con una sola planta para iniciar tu rito de 30 días sin abrumarte.",
      "Sintoniza las condiciones de luz de tu hogar con los requerimientos botánicos de tu aliada seleccionada."
    ],
    extraBenefit: "Claridad botánica: Evitas perder dinero en plantas incompatibles creando una afinidad duradera y amorosa desde el primer momento."
  },
  {
    step: "03",
    icon: "🪴",
    title: "CREAR",
    quote: "Consagrar y acondicionar tu refugio verde de presencia y paz.",
    essence: "El rincón que habitas por fuera alimenta el rincón que habitas por dentro. Crear tu templo verde es el acto físico de dar forma a tu decisión de cuidarte.",
    valueTitle: "El Valor Real: Crear Territorio de Belleza Sencilla",
    valueDesc: "Tener un refugio verde no requiere terrazas monumentales. El valor asombroso de acondicionar una repisa, una mesa o una repisa con madera pura, barro y piedras de río es que cada elemento actúa como un ancla multisensorial. El cerebro asocia la visión de estos materiales nobles con la relajación profunda y la seguridad somática.",
    ritualTitle: "El Ritual Práctico: Construcción del Altar Botánico",
    ritualSteps: [
      "Limpia físicamente el área designada liberándola de objetos de trabajo, cables o pendientes diarios.",
      "Selecciona macetas de barro cocido o terracota que permitan transpirar adecuadamente al sustrato.",
      "Agrega elementos que nutran los 5 sentidos: un cuarzo o piedra de río, un sahumerio natural y un espacio para tu té.",
      "Posiciona tu planta cuidando que el flujo de aire y luz sean gentiles para su nueva residencia."
    ],
    extraBenefit: "Un oasis privado: Moldearás un espacio inmune al caos exterior que te abraza visualmente cada mañana al depertar."
  },
  {
    step: "04",
    icon: "🌸",
    title: "CULTIVAR",
    quote: "La meditación del agua y el Ritual de los 5 Minutos de Presencia.",
    essence: "Cultivar es desaprender la prisa del resultado. A través del cuidado botánico aprendemos la paciencia sutil: a diagnosticar la vida hoja por hoja, sintiendo la tierra y sincronizando la respiración.",
    valueTitle: "El Valor Real: El Cuidado como Cuidado Propio",
    valueDesc: "El riego deja de ser una obligación mecánica para transformarse en tu medicina diaria. Al aprender a leer los mensajes sutiles de la planta (puntas marrones por falta de humedad, hojas caídas por exceso de agua), ejercitas una mirada atenta que luego aplicas a tu propio ser. Sintonizas tus niveles de agotamiento antes de llegar al punto de quiebre.",
    ritualTitle: "El Ritual Práctico: El Ritual de los 5 Minutos",
    ritualSteps: [
      "Visita tu rincón cada mañana sin tu teléfono celular durante el Ritual de los 5 Minutos.",
      "Realiza el testeo de la primera falange: introduce tu dedo en el sustrato para comprobar la humedad real antes de regar.",
      "Usa una pequeña jarra para regar con suavidad, visualizando cómo nutres también tus propios propósitos.",
      "Limpia cuidadosamente el follaje con un paño húmedo, sintonizando tu respiración con la exhalación de tus aliadas."
    ],
    extraBenefit: "Calma fisiológica: La observación detallada de la naturaleza ralentiza las ondas cerebrales, induciendo un descanso profundo en segundos."
  },
  {
    step: "05",
    icon: "✨",
    title: "FLORECER",
    quote: "Integrar las lecciones del ciclo y abrir tu botiquín herbolario.",
    essence: "El florecimiento es la culminación de sostener la vida con amor. En este paso final, reconoces que la paz externa cultivada en tu refugio verde se ha mudado de manera permanente dentro de ti.",
    valueTitle: "El Valor Real: La Alquimia Interna Completada",
    valueDesc: "En esta etapa cosechas los frutos somoto-sensoriales de tus 30 días de constancia. No solo tienes plantas vibrantes y saludables; has conquistado un hábito de calma indestructible, una mente centrada y una conexión incondicional con los ciclos naturales. Te reconoces a ti misma como un ser capaz de nutrir, esperar y florecer a tu propio paso.",
    ritualTitle: "El Ritual Práctico: Cosecha Consciente y Botiquín Sutil",
    ritualSteps: [
      "Completa tu última reflexión analítica guiada por los ciclos de crecimiento de tu aliada.",
      "Aprende a realizar podas amables y secado de hojas de lavanda, romero o menta para sahumerios.",
      "Prepara una infusión consciente o baño aromático para consagrar tu transformación somática.",
      "Comparte tus hallazgos, fotos de tu rincón verde y dudas en los encuentros íntimos grupales con Verónica."
    ],
    extraBenefit: "Independencia emocional: Te retiras del programa con herramientas, autodisciplina amorosa y sabiduría botánica para toda la vida."
  }
];

const BONUS_GIFTS = [
  {
    num: "Obsequio 01",
    title: "Bitácora Mi Jardín Alquímico",
    desc: "Un compendio sutil e íntimo diseñado para registrar intenciones, fotos de tus aliadas y tus reflexiones semanales en tu camino hacia la calma.",
    realPurpose: "Tu guardián de constancia silenciosa. No es solo un anotador; es un puente sagrado entre tu mente agitada y tu refugio verde vegetal, diseñado para registrar y anclar tu transformación somática.",
    estimatedValue: "USD 47",
    defaultMockup: bitacoraImg,
    keyFeatures: [
      "Hojas de intención inicial estructuradas por aliada verde.",
      "El Tracker Semanal 'Ritual de los 5 Minutos' para entrenar tu constancia sin culpa.",
      "Fichas de registro fotográfico, crecimiento de hojas y salud botánica.",
      "12 preguntas de introspección profunda al ritmo de las estaciones."
    ]
  },
  {
    num: "Obsequio 02",
    title: "Guía de Plantas para el Bienestar",
    desc: "El alma y cuidados de la lavanda, romero, menta, caléndula, aloe vera y orégano descritos desde la signatura botánica y la medicina integrativa.",
    realPurpose: "Sintonizar con la sabiduría y signatura de tus 6 aliadas básicas. Aprende a descifrar su sabiduría biológica y metafísica para equilibrar tus propios estados físicos y anímicos.",
    estimatedValue: "USD 37",
    defaultMockup: guiaImg,
    keyFeatures: [
      "Monografías completas de lavanda, romero, menta, caléndula, aloe y orégano.",
      "Propiedades botánicas, fitoquímica básica y arquetipos sutiles de sanación.",
      "Fichas de luz, humedad y requerimientos de suelo ideales.",
      "Diagnóstico visual de alertas sutiles (hojas caídas, amarillamiento o puntas secas)."
    ]
  },
  {
    num: "Obsequio 03",
    title: "Calendario de Cuidados Conscientes",
    desc: "Una rejilla visual interactiva y adaptativa para pautas de riego, observación profunda y limpieza consciente sin rigideces.",
    realPurpose: "Establecer un compás rítmico libre de rigidez para tu rincón de paz. Elimina para siempre la culpa del olvido con un compás adaptativo que respeta el ciclo biológico natural de tus plantas.",
    estimatedValue: "USD 29",
    defaultMockup: calendarioImg,
    keyFeatures: [
      "Cronograma dinámico de riego estacional adaptativo (otoño/invierno vs primavera/verano).",
      "Rótulos recortables de cuidado interactivo para tus macetas.",
      "Guía de tareas cíclicas: aireación de sustrato, fertilización sutil y limpieza de follaje.",
      "Sincronización rítmica lunar para podas y trasplantes amables."
    ]
  },
  {
    num: "Obsequio 04",
    title: "Mi Primer Botiquín Verde",
    desc: "Manual herbolario sutil para elaborar infusiones curativas, compresas tibias y baños de vapor medicinales con tu propia cosecha.",
    realPurpose: "Transformar tu rincón en tu medicina diaria. Descubre cómo transformar las hojas recolectadas de tus aliadas en preparaciones físicas y energéticas que calmen tu sistema nervioso.",
    estimatedValue: "USD 39",
    defaultMockup: botiquinImg,
    keyFeatures: [
      "Métodos ancestrales de secado, colgado y conservación hermética sin hongos.",
      "Recetario ilustrado: infusiones relajantes, compresas para el estrés y vahos aclarantes.",
      "Formulación de sahumerios caseros para limpiar y renovar el espacio de trabajo.",
      "Guía de dosificación prudente, precauciones corporales y contraindicaciones."
    ]
  },
  {
    num: "Obsequio 05",
    title: "Meditaciones de Respiración Alquímica",
    desc: "3 meditaciones guiadas sutiles (menos de 5 minutos) en 4 tiempos para anclar tu atención somática y sintonizar tus latidos con tus aliadas.",
    realPurpose: "Apagar el ruido del exterior de manera fulminante. A través de la técnica del Box Breathing sincronizada con las plantas, restablecerás de inmediato la calma de tu sistema nervioso.",
    estimatedValue: "USD 35",
    defaultMockup: botiquinImg,
    keyFeatures: [
      "3 audios temáticos interactivos: Enraizamiento (Tierra), Claridad (Romero) y Purificación (Viento).",
      "Sintetizador de frecuencias Alfa calmante integrado sin necesidad de software externo.",
      "Fisiología del Box Breathing explicada al ritmo de los latidos vegetales.",
      "Cronómetro visual y auditivo sutil para practicar sin esfuerzo."
    ]
  },
  {
    num: "Obsequio 06",
    title: "Comunidad Privada de Alquimistas (Facebook & Telegram)",
    desc: "Soporte diario directo con Verónica y una red activa en nuestros grupos exclusivos para compartir tus fotos, intenciones, progresos y resolver dudas herbolarias con otras almas afines.",
    realPurpose: "El secreto de integrar un hábito es no caminar sola. Siente la cobija de un espacio libre de juicios donde celebrar cada pequeña hoja nueva y sostenernos colectivamente en la práctica de la calma.",
    estimatedValue: "USD 27",
    defaultMockup: comunidadImg,
    keyFeatures: [
      "Grupo de Facebook privado para compartir fotografías del crecimiento y bitácoras rítmicas.",
      "Canal de Telegram con alertas semanales de cuidados lunares y recordatorios sutiles de calma.",
      "Soporte directo para dudas sobre infusiones y alertas de salud de tus aliadas verdes.",
      "Encuentros virtuales sutiles y círculos de palabra periódicos."
    ]
  }
];

export default function IntroScreen({ onEnterPortal }: IntroScreenProps) {
  const [nameInput, setNameInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'promise' | 'method' | 'bonuses'>('promise');
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedGift, setSelectedGift] = useState(0);
  const [customMockups, setCustomMockups] = useState<Record<number, string>>({});
  const [previewPlantId, setPreviewPlantId] = useState('lavanda');
  
  // Interactive Care Calendar States
  const [calendarSubTab, setCalendarSubTab] = useState<'riego' | 'rotulos' | 'tareas' | 'luna'>('riego');
  const [calendarSeason, setCalendarSeason] = useState<'summer' | 'winter'>('summer');
  const [calendarTagPlantId, setCalendarTagPlantId] = useState('lavanda');
  const [calendarMoonPhase, setCalendarMoonPhase] = useState<'new' | 'waxing' | 'full' | 'waning'>('full');

  // Interactive Botiquín Verde States
  const [botiquinSubTab, setBotiquinSubTab] = useState<'secado' | 'recetario' | 'sahumerio' | 'precauciones'>('secado');
  const [botiquinActiveRecipe, setBotiquinActiveRecipe] = useState<'infusion' | 'compresa' | 'vaho'>('infusion');

  // Interactive Bitácora "Mi Jardín Alquímico" States
  const [bitacoraSubTab, setBitacoraSubTab] = useState<'intenciones' | 'tracker' | 'fichas' | 'preguntas'>('intenciones');
  const [bitacoraActivePlant, setBitacoraActivePlant] = useState<string>('lavanda');
  const [bitacoraUserIntention, setBitacoraUserIntention] = useState<Record<string, string>>({
    lavanda: 'Cultivar calma sutil de noche y dormir más relajada.',
    romero: 'Elevar mi concentración matutina frente al ordenador sin ansiedad.',
    menta: 'Refrescar mis ideas durante tardes pesadas y calmar los nervios.',
    calendula: 'Darme ternura y cuidado consciente al sanar heridas.',
    aloe: 'Mantener fuerte mi escudo y mi propio espacio protector sano.',
    oregano: 'Limpiar influencias externas y purificar mis pensamientos densos.'
  });
  const [bitacoraTrackerDays, setBitacoraTrackerDays] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: false, 4: false, 5: false, 6: false, 7: false
  });
  const [bitacoraPhase, setBitacoraPhase] = useState<'semilla' | 'brote' | 'crecimiento' | 'esplendor'>('brote');
  const [bitacoraLeafCount, setBitacoraLeafCount] = useState<number>(6);
  const [bitacoraHealth, setBitacoraHealth] = useState<'vibrante' | 'atencion' | 'sedienta'>('vibrante');
  const [bitacoraDiaryNote, setBitacoraDiaryNote] = useState<string>('Hoy observé sus pequeños brotes verdes saliendo de la tierra. Se siente como un reflejo de mi propia constancia sutil.');
  const [bitacoraActiveSeason, setBitacoraActiveSeason] = useState<'primavera' | 'verano' | 'otono' | 'invierno'>('otono');
  const [bitacoraActiveQuestionIdx, setBitacoraActiveQuestionIdx] = useState<number>(0);
  const [bitacoraQuestionAnswers, setBitacoraQuestionAnswers] = useState<Record<string, string>>({
    'otono-0': 'Me cuesta soltar el perfeccionismo obsesivo con el que abordo mis proyectos profesionales.',
    'primavera-0': 'Quiero sembrar la paciencia profunda y aprender a respetar mis tiempos orgánicos de gestación.',
    'verano-0': 'Deseo celebrar la madurez de mis frutos y poder asolearme sin remordimientos.',
    'invierno-0': 'Abrazo el silencio, la pausa interna y permito que mis raíces se fortalezcan en la oscuridad.'
  });

  const handleMockupChange = (giftIdx: number, file: File) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomMockups(prev => ({
        ...prev,
        [giftIdx]: url
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onEnterPortal(nameInput.trim());
    } else {
      onEnterPortal('Compañera');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#2C3E2D] font-sans antialiased selection:bg-[#E2ECE3]" id="intro">
      {/* Editorial Decorative Top Bar */}
      <div className="bg-[#2D4A30] text-[#FAF9F5] text-center py-2.5 px-4 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>EDICIÓN FUNDADORA — SOLO 10 PLAZAS DISPONIBLES EN TODO EL MUNDO</span>
      </div>

      {/* Serene Hero Header Section */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E2ECE3] border border-[#C5DCD0]/40 rounded-full text-[#2D4A30] text-xs font-medium tracking-wide mb-6">
          <Leaf className="w-3.5 h-3.5 text-[#427A5B]" />
          <span>Refugio Verde de Mi Jardín Alquímico</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-[#1E2E20] leading-none mb-4">
          Refugio Verde
        </h1>
        
        <p className="font-serif italic text-xl md:text-2xl text-[#53735E] max-w-2xl mx-auto leading-relaxed mb-6">
          "Crea un espacio donde tú cuidas las plantas y ellas cuidan de ti."
        </p>
        
        <div className="w-16 h-0.5 bg-[#427A5B]/30 mx-auto mb-8"></div>
        
        <p className="text-base text-[#4E5E50] max-w-2xl mx-auto leading-relaxed mb-10">
          Imagina llegar a casa después de un día intenso y encontrar un pequeño rincón lleno de vida. 
          Un espacio creado por ti. Un lugar donde respirar. Donde bajar el ritmo. 
          Donde volver a conectar contigo misma.
        </p>

        {/* Enter CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          {!showForm ? (
            <button
             onClick={() => window.open('https://mpago.la/1KrwVQP', '_blank')}
              className="w-full sm:w-auto px-8 py-4 bg-[#2D4A30] text-[#FAF9F5] rounded-xl font-medium tracking-wide shadow-md hover:bg-[#385B3C] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 group border border-[#1E2E20]/10"
              id="btn-conectar"
            >
              <span>Comenzar mi Viaje (Inscribirme)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 bg-white p-5 rounded-2xl border border-[#E2ECE3] shadow-sm text-left"
            >
              <label htmlFor="user-name" className="text-xs font-semibold uppercase tracking-wider text-[#53735E]">
                Escribe tu nombre para la bitácora:
              </label>
              <div className="flex gap-2">
                <input
                  id="user-name"
                  type="text"
                  placeholder="Tu nombre aquí..."
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="flex-1 px-4 py-2 bg-[#FAF9F5] border border-[#D5E4DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D4A30]/20 focus:border-[#2D4A30] text-[#2C3E2D] font-medium"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2D4A30] text-[#FAF9F5] rounded-lg text-sm font-medium hover:bg-[#385B3C]"
                >
                  Entrar
                </button>
              </div>
              <p className="text-[10px] text-gray-400 italic">
                Únete como alumna fundadora al portal interactivo de 30 días.
              </p>
            </motion.form>
          )}
          
          <a
            href="#full-info"
            className="w-full sm:w-auto px-6 py-4 bg-transparent border border-[#2D4A30]/20 text-[#2D4A30] rounded-xl font-medium hover:bg-[#2D4A30]/5 transition-colors flex items-center justify-center gap-2"
          >
            Saber más primero
          </a>
        </div>
      </header>

      {/* Introspection Card - Poetic Invitation */}
      <section className="bg-white border-y border-[#E2ECE3] py-16 px-6" id="full-info">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-5">
              <h3 className="font-serif text-3xl font-light text-[#1E2E20] leading-tight">
                ¿Hace cuánto tiempo no te regalas un momento solo para vos?
              </h3>
              <p className="text-sm font-medium text-[#4D6151] tracking-wide uppercase">
                Un momento sin exigencias. Sin prisas. Sin obligaciones. Un momento para respirar profundo, observar, sentir y simplemente estar.
              </p>
              <div className="text-sm text-[#4E5E50] space-y-4 leading-relaxed">
                <p>
                  Vivimos en un mundo que nos empuja constantemente a hacer más, producir más y correr más rápido. Y en medio de ese ritmo acelerado, muchas veces terminamos desconectándonos de algo esencial: nuestra propia naturaleza.
                </p>
                <p>
                  Tal vez has pensado en llenar tu hogar de plantas, e incluso lo intentaste alguna vez... Pero algunas se secaron, otras no prosperaron, y terminaste creyendo que las plantas simplemente no eran para ti. O que de algún modo no poseías esa misteriosa "mano verde".
                </p>
                <p className="font-serif italic text-base text-[#2D4A30]">
                  Permíteme decirte algo: cuidar una planta no es un talento reservado para unos pocos. Es una relación que se aprende. Y mientras aprendemos a cuidar una planta, también aprendemos a cuidarnos mejor a nosotros mismos.
                </p>
              </div>
            </div>
            
            {/* Philosophical Image Frame Graphic / Quote Card */}
            <div className="md:col-span-5 bg-[#FAF9F5] p-8 rounded-3xl border border-[#DADBCE]/60 flex flex-col justify-between aspect-square relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E2ECE3]/40 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <Compass className="w-10 h-10 text-[#427A5B] stroke-[1.2]" />
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#53735E]">La Filosofía</span>
                <blockquote className="font-serif text-xl italic text-[#2D4A30]">
                  "La verdadera alquimia no ocurre en la planta. Ocurre en la persona que aprende a cuidarla."
                </blockquote>
                <div className="pt-2 border-t border-[#D5E4DB] flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-[#3D5240]">Verónica</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Mi Jardín Alquímico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Tabbed Deep-Dive Selector */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-4xl text-center text-[#1E2E20] tracking-tight mb-4">
          Explora la propuesta del programa
        </h2>
        <p className="text-center text-[#53735E] text-sm max-w-xl mx-auto mb-10">
          Navega a través del corazón de Refugio Verde™ para comprender cómo está estructurado este proceso de transformación.
        </p>

        {/* Tab Controls */}
        <div className="flex border-b border-[#D5E4DB] max-w-xl mx-auto mb-12 justify-center" id="tabs">
          <button
            onClick={() => setActiveTab('promise')}
            className={`px-5 py-3 text-xs uppercase font-bold tracking-wider transition-all border-b-2 -mb-px ${
              activeTab === 'promise' 
                ? 'border-[#2D4A30] text-[#2D4A30]' 
                : 'border-transparent text-[#6D8472] hover:text-[#2D4A30]'
            }`}
          >
            La Gran Promesa
          </button>
          <button
            onClick={() => setActiveTab('method')}
            className={`px-5 py-3 text-xs uppercase font-bold tracking-wider transition-all border-b-2 -mb-px ${
              activeTab === 'method' 
                ? 'border-[#2D4A30] text-[#2D4A30]' 
                : 'border-transparent text-[#6D8472] hover:text-[#2D4A30]'
            }`}
          >
            Método Alquimia Verde
          </button>
          <button
            onClick={() => setActiveTab('bonuses')}
            className={`px-5 py-3 text-xs uppercase font-bold tracking-wider transition-all border-b-2 -mb-px ${
              activeTab === 'bonuses' 
                ? 'border-[#2D4A30] text-[#2D4A30]' 
                : 'border-transparent text-[#6D8472] hover:text-[#2D4A30]'
            }`}
          >
            Lo que recibirás
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2ECE3] p-8 md:p-12 shadow-sm min-h-[350px]">
          <AnimatePresence mode="wait">
            {activeTab === 'promise' && (
              <motion.div
                key="promise"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#53735E] mb-3 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4" /> LA PROMESA REVELADORA
                  </h3>
                  <h4 className="font-serif text-3xl font-light text-[#1E2E20] leading-snug mb-5">
                    En 30 días crearás un <span className="font-semibold text-[#2D4A30]">Refugio Verde</span> de calma en tu hogar.
                  </h4>
                  <p className="text-sm text-[#4E5E50] leading-relaxed mb-6">
                    Reducirás el estrés, recuperarás la confianza y volverás a conectar contigo misma.
                    Esto no es jardinería técnica; es una vía de encuentro basada en plantas aliadas sumamente bondadosas —como la lavanda, el romero, la menta, el aloe o la caléndula— elegidas especialmente para florecer bajo tu cuidado sin abrumarte.
                  </p>
                  
                  <div className="bg-[#FAF9F5] p-5 rounded-xl border border-[#E2ECE3] flex gap-3">
                    <HelpCircle className="w-5 h-5 text-[#427A5B] flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-[#2D4A30] uppercase tracking-wide">¿Para quién es?</h5>
                      <p className="text-xs text-[#53735E] mt-1 leading-normal">
                        Para personas cansadas del torbellino diario, que anhelan espacios de calma, creen que "no tienen mano verde" o quieren incorporar naturaleza con propósito a su vida.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-serif text-xl font-medium text-[#1E2E20] pb-2 border-b border-[#D5E4DB]">
                    Beneficios Profundos que Cultivarás:
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { icon: <Clock className="w-4 h-4 text-emerald-600" />, title: "Calma en medio de la rutina", desc: "Aprende a pausar para respirar hondo a través del ritual diario sutil." },
                      { icon: <Heart className="w-4 h-4 text-rose-500" />, title: "Bienestar Emocional", desc: "Encuentra paz y tranquilidad mental mediante la meditación y el diario." },
                      { icon: <Award className="w-4 h-4 text-amber-500" />, title: "Confianza Restauradora", desc: "Saber cuidar la vida te devuelve la certeza en tus propias capacidades." },
                      { icon: <Sparkles className="w-4 h-4 text-purple-500" />, title: "Atención plena", desc: "Observación sutil que alinea tus ciclos con los de tus plantas aliadas." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E2ECE3]/70 flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-[#1E2E20]">{item.title}</h5>
                          <p className="text-xs text-[#53735E]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'method' && (
              <motion.div
                key="method"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto mb-6">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#53735E] mb-2">LAS 5 ETAPAS</h3>
                  <h4 className="font-serif text-3xl font-light text-[#1E2E20]">El Método Alquimia Verde</h4>
                  <p className="text-xs text-[#53735E] mt-2 leading-relaxed">
                    Llevamos tu experiencia de forma amable desde "No sé cuidar plantas y me siento desconectada" hasta "Tengo un rincón verde que me aporta paz y autodisciplina amorosa." Explora cada etapa para ver su desarrollo detallado.
                  </p>
                </div>

                {/* Horizontal Stage Selector */}
                <div className="flex md:grid md:grid-cols-5 gap-2.5 overflow-x-auto pb-3 md:pb-0 scrollbar-none snap-x -mx-4 px-4 md:mx-0 md:px-0">
                  {ALQUIMIA_STAGES.map((stage, idx) => {
                    const isSelected = selectedStage === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedStage(idx)}
                        className={`flex-shrink-0 snap-center min-w-[140px] md:min-w-0 p-3.5 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center gap-1.5 focus:outline-none ${
                          isSelected
                            ? "bg-[#2D4A30] border-[#2D4A30] text-[#FAF9F5] shadow-md scale-102"
                            : "bg-[#F3F5F3] hover:bg-[#E2ECE3]/50 border-[#E2ECE3]/80 text-[#53735E] hover:text-[#2D4A30]"
                        }`}
                      >
                        <span className={`text-[10px] font-mono tracking-wider font-bold ${isSelected ? 'text-[#FAF9F5]/70' : 'text-[#53735E]/60'}`}>
                          ETAPA {stage.step}
                        </span>
                        <span className="text-2xl">{stage.icon}</span>
                        <span className="text-xs font-bold tracking-wide uppercase truncate w-full">{stage.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Stage Detail Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedStage}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="bg-[#FAF9F5] rounded-3xl border border-[#E2ECE3] p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 relative overflow-hidden text-left"
                  >
                    {/* Decorative Background Blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2ECE3]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

                    {/* Column 1: Wisdom & Deep Philosophy */}
                    <div className="md:col-span-7 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E2ECE3] border border-[#C5DCD0]/40 rounded-full text-[#2D4A30] text-[10px] font-semibold uppercase tracking-wider">
                          <span>ETAPA {ALQUIMIA_STAGES[selectedStage].step}</span>
                        </div>
                        
                        <h4 className="font-serif text-3xl md:text-4xl text-[#1E2E20] font-light flex items-center gap-2">
                          <span>{ALQUIMIA_STAGES[selectedStage].icon}</span>
                          <span className="tracking-tight">{ALQUIMIA_STAGES[selectedStage].title}</span>
                        </h4>

                        <p className="font-serif italic text-lg text-[#355B39] border-l-2 border-[#427A5B] pl-4 py-1 leading-relaxed">
                          "{ALQUIMIA_STAGES[selectedStage].quote}"
                        </p>

                        <p className="text-sm text-[#4E5E50] leading-relaxed font-light">
                          {ALQUIMIA_STAGES[selectedStage].essence}
                        </p>
                      </div>

                      <div className="bg-[#E2ECE3]/40 p-5 rounded-2xl border border-[#C5DCD0]/30 space-y-2 mt-4 md:mt-0">
                        <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-[#2D4A30] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          {ALQUIMIA_STAGES[selectedStage].valueTitle}
                        </h5>
                        <p className="text-xs text-[#53735E] leading-relaxed">
                          {ALQUIMIA_STAGES[selectedStage].valueDesc}
                        </p>
                      </div>
                    </div>

                    {/* Column 2: Concrete Practical Deliverables / Actions */}
                    <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-[#E2ECE3]/80 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#E2ECE3] pb-3">
                          <Sprout className="w-4 h-4 text-[#427A5B]" />
                          <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-[#1E2E20]">
                            {ALQUIMIA_STAGES[selectedStage].ritualTitle}
                          </h5>
                        </div>

                        <ul className="space-y-3">
                          {ALQUIMIA_STAGES[selectedStage].ritualSteps.map((stepText, stepIdx) => (
                            <li key={stepIdx} className="flex gap-2.5 items-start">
                              <span className="w-5 h-5 rounded-full bg-[#E2ECE3]/65 text-[#2D4A30] text-[10px] font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                                {stepIdx + 1}
                              </span>
                              <p className="text-xs text-[#53735E] leading-relaxed">
                                {stepText}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E2ECE3]/60 space-y-1.5">
                        <h6 className="text-[10px] font-bold text-[#427A5B] uppercase tracking-wider flex items-center gap-1">
                          <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" /> IMPACTO EN TU BIENESTAR:
                        </h6>
                        <p className="text-xs text-[#4E5E50] leading-relaxed italic">
                          {ALQUIMIA_STAGES[selectedStage].extraBenefit}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'bonuses' && (
              <motion.div
                key="bonuses"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Introduction & Quick Live Bonus Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#2D4A30] text-[#FAF9F5] p-6 md:p-8 rounded-3xl border border-[#1E2E20] shadow-sm">
                  <div className="lg:col-span-7 space-y-3.5">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#A8C4B5] bg-white/10 px-3 py-1 rounded-full">
                      Ecosistema de Regalos & Acompañamiento
                    </span>
                    <h4 className="font-serif text-3xl font-light leading-tight">
                      Herramientas Diseñadas para tu Transformación Humana
                    </h4>
                    <p className="text-xs text-[#E2ECE3] leading-relaxed font-light">
                      Crear este refugio verde requiere guías e instrumentos formulados no desde una perspectiva académica rígida, sino desde lo entrañablemente cotidiano. Cada obsequio tiene un propósito claro para garantizar que no experimentes abrumación y logres constancia amorosa.
                    </p>
                  </div>
                  
                  <div className="lg:col-span-5 bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                    <h5 className="text-xs font-bold text-[#FAF9F5] uppercase tracking-wide flex items-center gap-1.5 border-b border-white/10 pb-2">
                      <Award className="w-4 h-4 text-amber-400" /> BONUS EXCLUSIVO DE ESTA EDICIÓN:
                    </h5>
                    <div>
                      <strong className="text-xs text-amber-300 block mb-0.5">Encuentro grupal en vivo con Verónica</strong>
                      <p className="text-[11px] text-[#E2ECE3] leading-normal font-light">
                        Un espacio grupal online de íntima contención para resolver dudas específicas sobre tu sustrato, plagas y compartir tus fotos de avances.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Bonus Sandbox Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Vertical Selector list */}
                  <div className="lg:col-span-4 flex flex-col gap-3">
                    <h5 className="text-[11px] font-bold text-[#53735E] uppercase tracking-widest px-2 mb-1">
                      Selecciona un Obsequio
                    </h5>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                      {BONUS_GIFTS.map((gift, idx) => {
                        const isSelected = selectedGift === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedGift(idx)}
                            className={`p-4 rounded-2xl text-left border transition-all duration-300 focus:outline-none cursor-pointer group flex flex-col justify-between ${
                              isSelected
                                ? "bg-white border-[#2D4A30] shadow-sm ring-1 ring-[#2D4A30]/30"
                                : "bg-white/60 hover:bg-white border-[#E2ECE3]/80"
                            }`}
                          >
                            <div className="space-y-1.5 w-full">
                              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${
                                isSelected ? "text-[#427A5B]" : "text-[#A8C4B5]"
                              }`}>
                                {gift.num}
                              </span>
                              <h5 className={`text-xs font-bold leading-snug transition-colors ${
                                isSelected ? "text-[#1E2E20]" : "text-[#53735E] group-hover:text-[#2D4A30]"
                              }`}>
                                {gift.title}
                              </h5>
                            </div>
                            <span className="text-[10px] font-semibold text-[#427A5B] mt-3.5 bg-[#E2ECE3]/40 px-2.5 py-0.5 rounded-md self-start">
                              Incluido gratis
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Creative Tip Box for Upload */}
                    <div className="bg-[#FAF9F5] p-4.5 rounded-2xl border border-[#E2ECE3] space-y-2 mt-4 hidden lg:block text-left">
                      <div className="flex items-center gap-1 text-[#427A5B]">
                        <Sparkles className="w-4 h-4 text-[#427A5B]" />
                        <h6 className="text-[11px] font-bold uppercase tracking-wide">¿Tienes tu propio mockup?</h6>
                      </div>
                      <p className="text-[11px] text-[#53735E] leading-relaxed">
                        Puedes arrastrar o seleccionar tu archivo de mockup en el recuadro interactivo de la derecha para ver cómo luce en tiempo real en la página del curso.
                      </p>
                      <div className="text-[10px] text-gray-400 bg-white p-2 rounded-lg border border-[#E2ECE3]/50 leading-normal">
                        <strong>Para guardarlo definitivo:</strong> Pídemelo en el chat o reemplaza los archivos en la carpeta de imágenes del código. ¡Yo me encargo!
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Overview with interactive mockup uploader */}
                  <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedGift}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-3xl border border-[#E2ECE3] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 text-left"
                      >
                        {/* Interactive Visual/Mockup Canvas (Cols 5) */}
                        <div className="md:col-span-5 bg-[#FAF9F5] border-r border-[#E2ECE3] p-5 flex flex-col justify-between space-y-4">
                          <div className="space-y-2.5">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-[#53735E] uppercase block">
                              VISTA DEL RECURSO
                            </span>
                            
                            {/* The Tablet / Book container frame */}
                            <div className="relative aspect-[3/4] bg-white rounded-2xl border border-[#E2ECE3] shadow-inner overflow-hidden group flex items-center justify-center">
                              {selectedGift === 4 ? (
                                <div className="w-full h-full bg-gradient-to-br from-[#1E2E20] to-[#2D4A30] flex flex-col items-center justify-center p-4 relative text-center">
                                  <div className="absolute top-2 left-2 flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                                    <span className="text-[8px] text-emerald-300 font-mono">LIVE SYNTH</span>
                                  </div>
                                  <Compass className="w-10 h-10 text-amber-300 animate-spin mb-2" style={{ animationDuration: '40s' }} />
                                  <h6 className="text-white text-[11px] font-bold font-serif px-2">Meditación Activa de la Savia</h6>
                                  <div className="flex gap-1 items-end h-6 mt-2.5">
                                    <span className="w-1 bg-[#9FE2BF] animate-bounce" style={{ height: '50%', animationDelay: '0.1s' }}></span>
                                    <span className="w-1 bg-[#9FE2BF] animate-bounce" style={{ height: '80%', animationDelay: '0.3s' }}></span>
                                    <span className="w-1 bg-[#9FE2BF] animate-bounce" style={{ height: '35%', animationDelay: '0.2s' }}></span>
                                    <span className="w-1 bg-[#9FE2BF] animate-bounce" style={{ height: '90%', animationDelay: '0.4s' }}></span>
                                    <span className="w-1 bg-[#9FE2BF] animate-bounce" style={{ height: '60%', animationDelay: '0.15s' }}></span>
                                  </div>
                                </div>
                              ) : (
                                <img
                                  src={customMockups[selectedGift] || BONUS_GIFTS[selectedGift].defaultMockup}
                                  alt={BONUS_GIFTS[selectedGift].title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                              {selectedGift !== 0 && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer">
                                  <Upload className="w-6 h-6 text-white animate-bounce" />
                                  <span className="text-[11px] font-semibold text-white">Reemplazar con tu archivo</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleMockupChange(selectedGift, file);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          {selectedGift === 0 ? (
                            <div className="border border-[#BACFBD] bg-[#E2ECE3]/40 p-2.5 rounded-xl flex items-center justify-center gap-2 text-center text-[#2D4A30] font-sans">
                              <span className="text-xs select-none">✨</span>
                              <span className="text-[11px] font-semibold">Diseño oficial confirmado para tu Bitácora</span>
                            </div>
                          ) : (
                            /* Dynamic Custom Mockup Upload Field */
                            <div className="border border-dashed border-[#C5DCD0] bg-[#E2ECE3]/20 hover:bg-[#E2ECE3]/40 p-3 rounded-xl transition-colors relative flex items-center justify-center gap-2 text-center group cursor-pointer overflow-hidden">
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer animate-pulse"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleMockupChange(selectedGift, file);
                                }}
                              />
                              <div className="flex items-center gap-2 text-[#2D4A30] cursor-pointer">
                                <Image className="w-4 h-4 text-[#427A5B]" />
                                <span className="text-xs font-semibold">Cargar Mockup Personalizado (PNG/JPG)</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Detailed Description & Value contents (Cols 7) */}
                        <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#427A5B]">
                                {BONUS_GIFTS[selectedGift].num}
                              </span>
                              <span className="text-xs font-bold text-[#2D4A30] bg-[#E2ECE3] px-2.5 py-0.5 rounded-full">
                                INCLUIDO GRATIS CON TU ACCESO
                              </span>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-serif text-2xl text-[#1E2E20] leading-tight">
                                {BONUS_GIFTS[selectedGift].title}
                              </h4>
                              <p className="text-xs text-[#53735E] leading-relaxed">
                                {BONUS_GIFTS[selectedGift].desc}
                              </p>
                            </div>

                            <div className="space-y-2.5 border-t border-[#E2ECE3] pt-4">
                              <h5 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#1E2E20] flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> El Propósito & Valor Profundo:
                              </h5>
                              <p className="text-xs text-[#4E5E50] leading-relaxed font-light font-serif italic text-[#355B39]">
                                {BONUS_GIFTS[selectedGift].realPurpose}
                              </p>
                            </div>

                            {selectedGift === 1 ? (
                              /* Interactive 6-Aliadas Botanical Guide Preview */
                              <div className="border-t border-[#E2ECE3] pt-4 space-y-4">
                                <h5 className="font-sans text-[10px] font-mono font-bold uppercase tracking-widest text-[#2D4A30] mb-2 flex items-center gap-1">
                                  <BookOpen className="w-3.5 h-3.5 text-[#427A5B]" /> HOJEAR LA GUÍA: LAS 6 ALIADAS PARA TU BIENESTAR
                                </h5>
                                
                                {/* 6 Plant Buttons Horizontal Scrolling Bar */}
                                <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                                  {PLANTS_DATA.map((plant) => {
                                    const isCurrent = previewPlantId === plant.id;
                                    const icon = plant.id === 'lavanda' ? '🌸' : plant.id === 'romero' ? '🌿' : plant.id === 'menta' ? '🍃' : plant.id === 'calendula' ? '🌼' : plant.id === 'aloe' ? '🛡️' : '🌱';
                                    return (
                                      <button
                                        key={plant.id}
                                        type="button"
                                        onClick={() => setPreviewPlantId(plant.id)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all focus:outline-none ${
                                          isCurrent 
                                            ? 'bg-[#2D4A30] text-[#FAF9F5] shadow-xs ring-1 ring-[#1E2E20]' 
                                            : 'bg-[#FAF9F5] border border-[#E2ECE3] text-[#53735E] hover:border-[#D5E1D6] hover:bg-white'
                                        }`}
                                      >
                                        <span className="mr-1">{icon}</span> {plant.name}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Active Plant Human Profile Sheet */}
                                {(() => {
                                  const plant = PLANTS_DATA.find(p => p.id === previewPlantId);
                                  if (!plant) return null;
                                  return (
                                    <div className="bg-[#FAF9F5] rounded-2xl border border-[#E2ECE3] p-4.5 space-y-3.5 text-left transition-all">
                                      {/* Plant Header */}
                                      <div className="flex justify-between items-center border-b border-[#E2ECE3]/60 pb-2">
                                        <div>
                                          <h6 className="font-serif text-lg font-bold text-[#1E2E20] leading-none">
                                            {plant.name}
                                          </h6>
                                          <span className="text-[10px] font-mono text-gray-400 italic">
                                            {plant.scientificName}
                                          </span>
                                        </div>
                                        <span className="text-[10px] font-bold text-[#E07A5F] bg-[#FDF0EC] px-2.5 py-0.5 rounded-full">
                                          {plant.emotionalGift}
                                        </span>
                                      </div>

                                      {/* Human Spirit Differential */}
                                      <div className="space-y-1 bg-white p-3 rounded-xl border border-[#E2ECE3]/40">
                                        <strong className="text-[9px] uppercase tracking-wide font-mono font-bold text-[#427A5B] block">
                                          Tu Diferencial Humano:
                                        </strong>
                                        <p className="text-xs text-[#4E5E50] leading-relaxed italic">
                                          {plant.humanSpirit || plant.philosophy}
                                        </p>
                                      </div>

                                      {/* Dual Care Columns */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
                                        {/* Needs & Basic Care */}
                                        <div className="space-y-2 bg-white/70 p-3 rounded-xl border border-gray-100/50 text-left">
                                          <strong className="text-[9px] uppercase tracking-wide font-mono font-bold text-[#2D4A30] block">
                                            ¿Qué necesita de ti?
                                          </strong>
                                          <p className="text-[11px] text-[#4E5E50] leading-normal font-light">
                                            {plant.reciprocalCare || "Ofrécele abundante luz de mañana y riegos pausados."}
                                          </p>
                                          <div className="pt-2 space-y-1 border-t border-gray-100 font-sans text-[10px] text-gray-500">
                                            <p>💦 <strong>Riego:</strong> {plant.care.watering}</p>
                                            <p>☀️ <strong>Luz:</strong> {plant.care.light}</p>
                                          </div>
                                        </div>

                                        {/* Benefits */}
                                        <div className="space-y-2 bg-white/70 p-3 rounded-xl border border-gray-100/50 flex flex-col justify-between text-left">
                                          <div>
                                            <strong className="text-[9px] uppercase tracking-wide font-mono font-bold text-[#2D4A30] block mb-1">
                                              Beneficios para la Alumna:
                                            </strong>
                                            <ul className="space-y-1">
                                              {plant.benefits.map((b, i) => (
                                                <li key={i} className="text-[11px] text-[#4E5E50] leading-tight flex items-start gap-1">
                                                  <span className="text-emerald-600 mt-0.5 shrink-0">✓</span> {b}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                          <div className="p-1 px-2 bg-amber-50/60 text-[9px] rounded text-amber-800 italic border border-amber-100/30">
                                            🚨 Alerta rincón: {plant.care.alert}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Practical Integration Example */}
                                      {plant.lifeIntegration && (
                                        <div className="bg-white p-3.5 rounded-xl border border-[#E2ECE3] space-y-2 text-left">
                                          <strong className="text-[10px] font-sans uppercase tracking-wide font-bold text-[#2D4A30] flex items-center gap-1 pb-1 border-b border-gray-100">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                            {plant.lifeIntegration.practicalExample}
                                          </strong>
                                          <p className="text-xs text-[#53735E] leading-relaxed font-light">
                                            {plant.lifeIntegration.intro}
                                          </p>
                                          
                                          {/* Step by Step list */}
                                          <div className="space-y-1.5 pt-1.5">
                                            <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#427A5B] block">
                                              ¿Qué hacer paso a paso con ella?
                                            </span>
                                            <ol className="space-y-1.5 text-[11px] text-[#4E5E50]">
                                              {plant.lifeIntegration.stepByStep.map((step, stepIdx) => (
                                                <li key={stepIdx} className="leading-relaxed flex gap-1.5 items-start">
                                                  <span className="font-mono font-bold text-[#355B39] shrink-0 bg-[#E2ECE3] w-4 h-4 rounded-full flex items-center justify-center text-[10px] mt-0.5">
                                                    {stepIdx+1}
                                                  </span>
                                                  <span>{step}</span>
                                                </li>
                                              ))}
                                            </ol>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : selectedGift === 2 ? (
                              /* Interactive Care Calendar Showcase */
                              <div className="border-t border-[#E2ECE3] pt-4 space-y-4">
                                <h5 className="font-sans text-[10px] font-mono font-bold uppercase tracking-widest text-[#2D4A30] mb-2 flex items-center gap-1.5 text-left">
                                  <Calendar className="w-3.5 h-3.5 text-[#427A5B]" /> HOJEAR EL CALENDARIO DE CUIDADOS CONSCIENTES
                                </h5>

                                {/* 4 Calendar Sub Tabs */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                  {[
                                    { id: 'riego', label: 'Riego Estacional', icon: '💦' },
                                    { id: 'rotulos', label: 'Rótulos de Cuidado', icon: '🏷️' },
                                    { id: 'tareas', label: 'Tareas Cíclicas', icon: '🛠️' },
                                    { id: 'luna', label: 'Sintonía Lunar', icon: '🌙' }
                                  ].map((tab) => {
                                    const isActive = calendarSubTab === tab.id;
                                    return (
                                      <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setCalendarSubTab(tab.id as any)}
                                        className={`px-2 py-2 rounded-xl text-[10px] font-semibold transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer focus:outline-none ${
                                          isActive 
                                            ? 'bg-[#2D4A30] text-[#FAF9F5] shadow-xs ring-1 ring-[#1E2E20]' 
                                            : 'bg-[#FAF9F5] border border-[#E2ECE3] text-[#53735E] hover:border-[#D5E1D6] hover:bg-white'
                                        }`}
                                      >
                                        <span className="text-sm">{tab.icon}</span>
                                        <span className="leading-tight">{tab.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Tab Content Area */}
                                <div className="bg-[#FAF9F5] rounded-2xl border border-[#E2ECE3] p-4 text-left space-y-4">
                                  {calendarSubTab === 'riego' && (
                                    <div className="space-y-3.5">
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-white p-3 rounded-xl border border-gray-100/60">
                                        <div>
                                          <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide">
                                            Riego Estacional Adaptativo
                                          </h6>
                                          <p className="text-[11px] text-gray-500 font-light">
                                            Adapta la hidratación al ritmo biológico estacional de tus plantas.
                                          </p>
                                        </div>
                                        {/* Season toggle */}
                                        <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 self-start sm:self-auto">
                                          <button
                                            type="button"
                                            onClick={() => setCalendarSeason('summer')}
                                            className={`px-2 py-1 rounded-md text-[9px] font-medium transition-all cursor-pointer ${
                                              calendarSeason === 'summer' 
                                                ? 'bg-[#2D4A30] text-white font-semibold' 
                                                : 'text-gray-600 hover:text-black font-normal'
                                            }`}
                                          >
                                            ☀️ Primavera / Verano
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setCalendarSeason('winter')}
                                            className={`px-2 py-1 rounded-md text-[9px] font-medium transition-all cursor-pointer ${
                                              calendarSeason === 'winter' 
                                                ? 'bg-[#2D4A30] text-white font-semibold' 
                                                : 'text-gray-600 hover:text-black font-normal'
                                            }`}
                                          >
                                            ❄️ Otoño / Invierno
                                          </button>
                                        </div>
                                      </div>

                                      {/* Season Details and Plant Watering Frequencies */}
                                      <div className="space-y-2">
                                        <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#427A5B] block">
                                          Pautas de riego recomendadas ({calendarSeason === 'summer' ? 'Actividad plena' : 'Reposo sagrado'}):
                                        </strong>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                          {[
                                            { name: 'Lavanda 🌸', summer: 'Cada 8-10 días (dejar secar bien)', winter: 'Cada 20-25 días (ayuno hídrico protector)' },
                                            { name: 'Romero 🌿', summer: 'Cada 10-12 días (regar solo la base)', winter: 'Cada 25-30 días (evitar asfixia radicular)' },
                                            { name: 'Menta 🍃', summer: 'Cada 2-3 días (mantener frescura suave)', winter: 'Cada 7-10 días (reducir pero sin secar del todo)' },
                                            { name: 'Caléndula 🌼', summer: 'Cada 4-5 días (para brotes dorados)', winter: 'Cada 12-15 días (riego matutino)' },
                                            { name: 'Aloe Vera 🛡️', summer: 'Cada 20 días (confiar en su reserva)', winter: 'Cada 45 días o menos (reposo absoluto)' },
                                            { name: 'Orégano 🌱', summer: 'Cada 6-8 días (regar al amanecer)', winter: 'Cada 18-20 días (proteger del encharcado)' }
                                          ].map((plantFreq) => (
                                            <div key={plantFreq.name} className="bg-white p-2.5 rounded-lg border border-[#E2ECE3]/40 flex justify-between items-center text-left">
                                              <span className="font-medium text-[#1E2E20]">{plantFreq.name}</span>
                                              <span className="text-[11px] text-[#427A5B] font-mono font-medium">
                                                {calendarSeason === 'summer' ? plantFreq.summer : plantFreq.winter}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Wisdom Card */}
                                      <div className="p-3 bg-white border border-[#E2ECE3] rounded-xl text-[11px] text-[#4E5E50] font-light flex items-start gap-2">
                                        <span className="text-[#E07A5F]">💡</span>
                                        <div>
                                          <strong>Consejo Alquímico de Verónica:</strong> "Evita las rutinas rígidas y mecánicas. Antes de regar, introduce tu dedo índice en el sustrato. Si se siente húmedo o la tierra se adhiere, tu aliada aún está asimilando; dale tiempo. Si sale limpio y seco, es hora de hidratar."
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {calendarSubTab === 'rotulos' && (
                                    <div className="space-y-4">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide">
                                          Rótulos Recortables Interactivos
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light">
                                          Explora y personaliza las etiquetas de cuidado visual que vas a recortar y colocar en tus macetas.
                                        </p>
                                      </div>

                                      {/* Plant Selector for Tags */}
                                      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                                        {PLANTS_DATA.map((p) => (
                                          <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setCalendarTagPlantId(p.id)}
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap cursor-pointer transition-all ${
                                              calendarTagPlantId === p.id 
                                                ? 'bg-[#2D4A30] text-white font-semibold' 
                                                : 'bg-white border border-gray-200 text-[#53735E]'
                                            }`}
                                          >
                                            {p.name}
                                          </button>
                                        ))}
                                      </div>

                                      {/* Interactive Visual Tag Preview */}
                                      {(() => {
                                        const currentPlant = PLANTS_DATA.find(p => p.id === calendarTagPlantId) || PLANTS_DATA[0];
                                        return (
                                          <div className="space-y-3">
                                            <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#427A5B] block">
                                              Vista previa de Impresión (Doble cara recortable):
                                            </strong>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                              {/* Cara A: Nombre y Espíritu de la Planta */}
                                              <div className="border-2 border-dashed border-[#C4D9C7] bg-white p-3.5 rounded-xl text-center relative overflow-hidden flex flex-col justify-between">
                                                <div className="absolute top-1 right-2 font-mono text-[8px] text-gray-400">CARA ANTERIOR</div>
                                                <div>
                                                  <div className="w-8 h-8 rounded-full bg-[#E2ECE3] mx-auto mb-1.5 flex items-center justify-center text-base">
                                                    {currentPlant.id === 'lavanda' ? '🌸' : currentPlant.id === 'romero' ? '🌿' : currentPlant.id === 'menta' ? '🍃' : currentPlant.id === 'calendula' ? '🌼' : currentPlant.id === 'aloe' ? '🛡️' : '🌱'}
                                                  </div>
                                                  <h6 className="font-serif text-sm font-bold text-[#1E2E20] block leading-tight">{currentPlant.name}</h6>
                                                  <span className="text-[9px] font-mono text-gray-400 block mb-1.5 italic">{currentPlant.scientificName}</span>
                                                  <div className="bg-[#FAF9F5] p-2 rounded-lg border border-gray-100">
                                                    <p className="text-[11px] text-[#4E5E50] leading-relaxed italic">
                                                      "{currentPlant.humanSpirit || currentPlant.philosophy}"
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="mt-2 text-[9px] text-[#E07A5F] font-mono uppercase tracking-wider font-bold">
                                                  ✨ {currentPlant.emotionalGift}
                                                </div>
                                              </div>

                                              {/* Cara B: Instrucciones de Cuidado */}
                                              <div className="border-2 border-dashed border-[#C4D9C7] bg-white p-3.5 rounded-xl relative overflow-hidden flex flex-col justify-between text-left">
                                                <div className="absolute top-1 right-2 font-mono text-[8px] text-gray-400">CARA POSTERIOR</div>
                                                <div>
                                                  <strong className="font-sans text-[10px] font-bold text-[#1E2E20] block border-b border-gray-100 pb-1 mb-2">
                                                    GUÍA DE SUPERVIVENCIA
                                                  </strong>
                                                  <ul className="space-y-1.5 text-[10px] text-[#4E5E50]">
                                                    <li className="flex justify-between">
                                                      <span>💦 Riego:</span>
                                                      <span className="font-mono text-[9px] text-[#2D4A30] font-semibold">{currentPlant.care.watering.split('.')[0]}</span>
                                                    </li>
                                                    <li className="flex justify-between">
                                                      <span>☀️ Luz:</span>
                                                      <span className="font-mono text-[9px] text-[#2D4A30] font-semibold">{currentPlant.care.light.split('.')[0]}</span>
                                                    </li>
                                                    <li className="flex justify-between text-left">
                                                      <span>🌱 Sustrato:</span>
                                                      <span className="font-mono text-[9px] text-[#2D4A30] font-semibold text-right max-w-[125px] truncate">{currentPlant.care.soil.split('.')[0]}</span>
                                                    </li>
                                                  </ul>
                                                </div>
                                                <div className="mt-2 p-1.5 bg-red-50 text-[9px] text-red-700 italic rounded border border-red-100/30">
                                                  ⚠️ {currentPlant.care.alert}
                                                </div>
                                              </div>
                                            </div>

                                            <p className="text-[10px] text-gray-400 text-center italic">
                                              ✂️ El obsequio digital incluye una hoja PDF de alta resolución lista para imprimir, recortar dobles caras e insertar palitos para tus macetas terrenales.
                                            </p>
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  )}

                                  {calendarSubTab === 'tareas' && (
                                    <div className="space-y-3">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide">
                                          Guía de Tareas Cíclicas Conscientes
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light">
                                          Sencillos gestos de sintonía y mantenimiento que oxigenan y purifican tu ecosistema doméstico.
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                        {/* Tarea 1 */}
                                        <div className="bg-white p-3.5 rounded-xl border border-[#E2ECE3] hover:border-[#D5E1D6] transition-all space-y-1.5 text-left">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-sm">💨</span>
                                            <strong className="font-serif text-xs font-bold text-[#1E2E20]">Airear Sustrato</strong>
                                          </div>
                                          <span className="text-[9px] text-gray-400 font-mono block">Frecuencia: Cada 6 Semanas</span>
                                          <p className="text-[11px] text-[#4E5E50] leading-relaxed">
                                            Utiliza un palillo de bambú fino para realizar perforaciones suaves de unos 5 cm en la tierra. Abre canales invisibles que permiten al aire y los nutrientes frescos penetrar directo a la raíz, previniendo asfixias indeseadas.
                                          </p>
                                        </div>

                                        {/* Tarea 2 */}
                                        <div className="bg-white p-3.5 rounded-xl border border-[#E2ECE3] hover:border-[#D5E1D6] transition-all space-y-1.5 text-left">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-sm">✨</span>
                                            <strong className="font-serif text-xs font-bold text-[#1E2E20]">Abono Sutil</strong>
                                          </div>
                                          <span className="text-[9px] text-gray-400 font-mono block">Frecuencia: Luna Creciente</span>
                                          <p className="text-[11px] text-[#4E5E50] leading-relaxed">
                                            Añade una sola cucharada de humus de lombriz en la superficie de la maceta, o complementa diluyendo té de plátano reposado. Esto aporta micronutrientes amables que alimentan la tierra antes que a la planta misma.
                                          </p>
                                        </div>

                                        {/* Tarea 3 */}
                                        <div className="bg-white p-3.5 rounded-xl border border-[#E2ECE3] hover:border-[#D5E1D6] transition-all space-y-1.5 text-left">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-sm">🧼</span>
                                            <strong className="font-serif text-xs font-bold text-[#1E2E20]">Limpiar Follaje</strong>
                                          </div>
                                          <span className="text-[9px] text-gray-400 font-mono block">Frecuencia: Cada 3 Semanas</span>
                                          <p className="text-[11px] text-[#4E5E50] leading-relaxed">
                                            La acumulación de polvo interrumpe la fotosíntesis y el flujo energético. Limpia suavemente con un algodón humedecido con agua templada las hojas carnosas de tu Aloe Vera o brumiza delicadamente por la mañana el follaje de la Menta.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {calendarSubTab === 'luna' && (
                                    <div className="space-y-4">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide">
                                          Sincronización Rítmica Lunar
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light">
                                          Sintoniza tus manos con la atracción gravitacional lunar para optimizar y cuidar la vitalidad de tus aliadas.
                                        </p>
                                      </div>

                                      {/* Interactive Moon Phase Compass UI */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                                        {[
                                          { id: 'new', phase: '🌑 Luna Nueva', title: 'Savia en las Raíces', action: 'Siembras y fertilización profunda', desc: 'La energía desciende al subsuelo terrenal. Evita podas fuertes; es momento para nutrir las profundidades raíces de la Lavanda y el Romero.' },
                                          { id: 'waxing', phase: '🌒 Luna Creciente', title: 'Savia Ascendente', action: 'Trasplantes y esquejes con éxito', desc: 'La savia fluye con fuerza hacia los tallos. Momento de esplendor para mudar plantas de maceta con una recuperación milagrosa y rápida.' },
                                          { id: 'full', phase: '🌕 Luna Llena', title: 'Savia en Hojas y Flores', action: 'Cosecha medicinal máxima', desc: 'Clímax circulatorio de aceites curativos en el follaje. Cosecha tus hojas de lavanda, romero y menta para que tu botiquín sea mil veces más potente.' },
                                          { id: 'waning', phase: '🌘 Luna Menguante', title: 'Savia en Descenso', action: 'Podas de limpieza y saneo', desc: 'La savia disminuye su fuerza superior para regresar a reposo terrenal. Realiza cortes limpios y poda hojas enfermas con mínimo choque o marchitamiento.' }
                                        ].map((moon) => {
                                          const isActive = calendarMoonPhase === moon.id;
                                          return (
                                            <button
                                              key={moon.id}
                                              type="button"
                                              onClick={() => setCalendarMoonPhase(moon.id as any)}
                                              className={`p-3 rounded-xl text-left border transition-all cursor-pointer focus:outline-none ${
                                                isActive 
                                                  ? 'bg-white border-[#2D4A30] ring-1 ring-[#2D4A30]/50 shadow-xs' 
                                                  : 'bg-white/60 border-gray-200/50 hover:bg-white'
                                              }`}
                                            >
                                              <div className="flex justify-between items-center mb-1">
                                                <span className="font-serif text-xs font-bold text-[#1E2E20]">{moon.phase}</span>
                                                <span className="text-[8px] uppercase tracking-wider font-bold font-mono text-[#E07A5F]">{moon.title}</span>
                                              </div>
                                              <span className="text-[10px] font-bold text-[#2D4A30] block mb-1">
                                                🎯 {moon.action}
                                              </span>
                                              <p className="text-[11px] text-[#53735E] leading-normal font-light">
                                                {moon.desc}
                                              </p>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedGift === 3 ? (
                              /* Interactive Botiquín Verde Showcase */
                              <div className="border-t border-[#E2ECE3] pt-4 space-y-4">
                                <h5 className="font-sans text-[10px] font-mono font-bold uppercase tracking-widest text-[#2D4A30] mb-2 flex items-center gap-1.5 text-left">
                                  <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" /> DETALLES DE "MI PRIMER BOTIQUÍN VERDE"
                                </h5>

                                {/* 4 Botiquín Sub-tabs */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-sans">
                                  {[
                                    { id: 'secado', label: 'Secado Ancestral', icon: '🍂' },
                                    { id: 'recetario', label: 'Recetario Sabio', icon: '🍵' },
                                    { id: 'sahumerio', label: 'Sahumerio Casero', icon: '💨' },
                                    { id: 'precauciones', label: 'Dosis & Alertas', icon: '🛡️' }
                                  ].map((tab) => {
                                    const isActive = botiquinSubTab === tab.id;
                                    return (
                                      <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setBotiquinSubTab(tab.id as any)}
                                        className={`px-2 py-2 rounded-xl text-[10px] font-semibold transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer focus:outline-none ${
                                          isActive 
                                            ? 'bg-[#E07A5F] text-[#FAF9F5] shadow-xs ring-1 ring-[#BF5A3F]' 
                                            : 'bg-[#FAF9F5] border border-[#E2ECE3] text-[#53735E] hover:border-[#D5E1D6] hover:bg-white'
                                        }`}
                                      >
                                        <span className="text-sm">{tab.icon}</span>
                                        <span className="leading-tight">{tab.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Tab Content Area */}
                                <div className="bg-[#FAF9F5] rounded-2xl border border-[#E2ECE3] p-4 text-left space-y-4">
                                  {botiquinSubTab === 'secado' && (
                                    <div className="space-y-3.5">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100/60">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide flex items-center gap-1.5">
                                          <span>🍂</span> Métodos Ancestrales de Secado, Colgado y Conservación Hermética
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light mt-0.5">
                                          Conserva tus plantas aromáticas sanas, con sus aceites esenciales intactos y completamente libres de humedad u hongos perjudiciales.
                                        </p>
                                      </div>

                                      {/* Metodos Grid */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                        <div className="bg-white p-3.5 rounded-xl border border-[#E2ECE3]/40 space-y-2">
                                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F] block">TÉCNICA 1: SECADO AL AIRE COLGADO (IDEAL PARA LAVANDA Y ROMERO)</span>
                                          <p className="text-[11px] text-[#4E5E50] leading-relaxed">
                                            Reúne las ramas en ramos pequeños de 5 o 6 tallos para asegurar flujo de aire. Átalos por el extremo inferior con un hilo de cáñamo o algodón.
                                          </p>
                                          <div className="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#E2ECE3] text-[10px] text-gray-500">
                                            <strong>📍 Ubicación:</strong> Un cuarto oscuro, ventilado y con baja humedad ambiente (evitar cocinas y baños).
                                          </div>
                                        </div>

                                        <div className="bg-white p-3.5 rounded-xl border border-[#E2ECE3]/40 space-y-2">
                                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F] block">TÉCNICA 2: REJILLA / PAPEL ABSORBENTE (IDEAL PARA MENTA Y FLORES)</span>
                                          <p className="text-[11px] text-[#4E5E50] leading-relaxed">
                                            Deshoja con cuidado y extiende las hojas o pétalos en una sola capa sobre papel de estraza o una rejilla mosquitera limpia para evitar superposiciones.
                                          </p>
                                          <div className="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#E2ECE3] text-[10px] text-gray-500">
                                            <strong>⏳ Tiempo:</strong> Entre 7 a 14 días. Las hojas deben crujir al tacto, pero conservar su color verde vibrante.
                                          </div>
                                        </div>
                                      </div>

                                      {/* Conservacion hermetica paso a paso */}
                                      <div className="bg-white p-3.5 rounded-xl border border-[#E2ECE3]">
                                        <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#2D4A30] block mb-2">🎁 EL TEST CRUJIENTE & CONSERVACIÓN HERMÉTICA:</strong>
                                        <ol className="space-y-2 text-[11px] text-[#4E5E50] list-decimal list-inside">
                                          <li><strong className="text-[#1E2E20]">El Tacto:</strong> Si la rama se dobla en lugar de partirse con un "crack" seco, aún contiene agua. Espera unos días más.</li>
                                          <li><strong className="text-[#1E2E20]">Deshojado suave:</strong> Desprende las hojas secas con cuidado, descartando las amarillentas o manchadas.</li>
                                          <li><strong className="text-[#1E2E20]">Frasco de Vidrio Ámbar:</strong> Almacena en botes de vidrio oscuro con cierre hermético para proteger los aceites de la luz.</li>
                                          <li><strong className="text-[#1E2E20]">Etiqueta Consciencia:</strong> Coloca fecha de recolección y nombre. Úsalas preferentemente antes de 1 año.</li>
                                        </ol>
                                      </div>
                                    </div>
                                  )}

                                  {botiquinSubTab === 'recetario' && (
                                    <div className="space-y-4">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide">
                                          🍵 Recetario Ilustrado Sutil
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light">
                                          Descubre cómo elaborar tres preparados clásicos curativos paso a paso con dosis precisas.
                                        </p>
                                      </div>

                                      {/* Recipe Switchers */}
                                      <div className="flex gap-1.5 border-b border-gray-200 pb-2 overflow-x-auto">
                                        {[
                                          { id: 'infusion', label: 'Infusión Relajante 🍵', desc: 'Calma mental' },
                                          { id: 'compresa', label: 'Compresa de Romero 🩹', desc: 'Estrés muscular' },
                                          { id: 'vaho', label: 'Baño de Vapor / Vaho 🧖‍♀️', desc: 'Aparato respiratorio' }
                                        ].map((recipe) => (
                                          <button
                                            key={recipe.id}
                                            type="button"
                                            onClick={() => setBotiquinActiveRecipe(recipe.id as any)}
                                            className={`flex-1 min-w-[130px] text-center py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer focus:outline-none ${
                                              botiquinActiveRecipe === recipe.id 
                                                ? 'bg-[#2D4A30] text-[#FAF9F5] font-semibold' 
                                                : 'bg-white border border-gray-200 text-[#53735E] hover:bg-[#FAF9F5]'
                                            }`}
                                          >
                                            <div className="font-bold">{recipe.label}</div>
                                            <div className="text-[8px] opacity-80 font-light font-sans">{recipe.desc}</div>
                                          </button>
                                        ))}
                                      </div>

                                      {/* Recipe Details */}
                                      <div className="bg-white p-4 rounded-xl border border-[#E2ECE3]/60 space-y-3">
                                        {botiquinActiveRecipe === 'infusion' && (
                                          <div className="space-y-2.5">
                                            <div className="flex justify-between items-center pb-1.5 border-b border-dashed border-gray-100">
                                              <strong className="font-serif text-[#1E2E20] text-xs">Infusión "Paz Profunda" de Lavanda & Menta</strong>
                                              <span className="font-serif italic text-[11px] text-[#E07A5F]">Efecto: Relajante Somático</span>
                                            </div>
                                            <p className="text-[11px] text-[#4E5E50] leading-relaxed">
                                              Una combinación perfecta diseñada para calmar el sistema nervioso sobreexcitado, disminuir las pulsaciones del estrés mental y favorecer un sueño reparador y profundo.
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1.5">
                                              <div>
                                                <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F] block mb-1">🌿 INGREDIENTES</strong>
                                                <ul className="space-y-1 text-gray-600 list-disc list-inside">
                                                  <li>1 cucharadita de flores secas de Lavanda</li>
                                                  <li>1 cucharadita de hojas secas de Menta</li>
                                                  <li>250ml de agua pura filtrada</li>
                                                </ul>
                                              </div>
                                              <div>
                                                <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#2D4A30] block mb-1">⏳ RITUAL DE PREPARACIÓN</strong>
                                                <p className="text-gray-600 leading-relaxed">
                                                  Leva el agua a ebullición. Justo cuando rompa el hervor, apaga el fuego. Añade la lavanda y menta en tu taza. <strong>Tapa inmediatamente</strong> para evitar que se escapen los aceites volátiles y deja reposar por 5-8 minutos antes de colar e inhalar su aroma antes de beber despacio.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {botiquinActiveRecipe === 'compresa' && (
                                          <div className="space-y-2.5">
                                            <div className="flex justify-between items-center pb-1.5 border-b border-dashed border-gray-100">
                                              <strong className="font-serif text-[#1E2E20] text-xs">Compresa Tibia "Alivio y Fuego" de Romero & Caléndula</strong>
                                              <span className="font-serif italic text-[11px] text-[#E07A5F]">Efecto: Descontracturante & Inflamaciones</span>
                                            </div>
                                            <p className="text-[11px] text-[#4E5E50] leading-relaxed">
                                              Perfecto para aplicar en la nuca, hombros o zona lumbar acumulada por largas jornadas de trabajo frente a la pantalla. El romero estimula la microcirculación local mientras la caléndula desinflama y suaviza los tejidos tensos.
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1.5">
                                              <div>
                                                <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F] block mb-1">🌿 INGREDIENTES</strong>
                                                <ul className="space-y-1 text-gray-600 list-disc list-inside">
                                                  <li>2 cucharadas de Romero fresco o seco</li>
                                                  <li>1 cucharada de flores de Caléndula</li>
                                                  <li>500ml de agua purificada</li>
                                                  <li>Un paño o toalla pequeña de algodón limpia</li>
                                                </ul>
                                              </div>
                                              <div>
                                                <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#2D4A30] block mb-1">⏳ RITUAL DE PREPARACIÓN</strong>
                                                <p className="text-gray-600 leading-relaxed">
                                                  Prepara una infusión concentrada hirviendo el romero y caléndula tapados por 5 minutos. Deja templar hasta una temperatura segura para tu piel. Empapa el paño, escúrrelo suavemente y aplícalo sobre la zona de tensión o dolor hasta que pierda el calor. Repite el proceso 3 veces consecutivas.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {botiquinActiveRecipe === 'vaho' && (
                                          <div className="space-y-2.5">
                                            <div className="flex justify-between items-center pb-1.5 border-b border-dashed border-gray-100">
                                              <strong className="font-serif text-[#1E2E20] text-xs">Baño de Vapor "Respiro de Bosque" de Orégano y Menta</strong>
                                              <span className="font-serif italic text-[11px] text-[#E07A5F]">Efecto: Aclarante Mental y Respiratorio</span>
                                            </div>
                                            <p className="text-[11px] text-[#4E5E50] leading-relaxed">
                                              El vapor de agua cargado abre las vías respiratorias congestionadas, limpia los poros de la piel de manera sutil y relaja los sentidos mediante la inhalación profunda, brindando una agradable sensación de ligereza.
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1.5">
                                              <div>
                                                <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F] block mb-1">🌿 INGREDIENTES</strong>
                                                <ul className="space-y-1 text-gray-600 list-disc list-inside">
                                                  <li>1 cucharada de Orégano seco (antiséptico)</li>
                                                  <li>1 cucharada de Menta (fresca o seca, refrescante)</li>
                                                  <li>1 litro de agua hirviendo</li>
                                                  <li>Una toalla grande y cómoda</li>
                                                </ul>
                                              </div>
                                              <div>
                                                <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#2D4A30] block mb-1">⏳ RITUAL DE PREPARACIÓN</strong>
                                                <p className="text-gray-600 leading-relaxed">
                                                  Coloca las hierbas en un bol grande resistente al calor. Vierte el agua hirviendo y cúbrete de inmediato la cabeza con la toalla sobre el tazón haciendo efecto tienda. Inhala el vapor caliente por la nariz de manera suave y profunda durante 5 a 10 minutos. Mantén los ojos de preferencia cerrados.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {botiquinSubTab === 'sahumerio' && (
                                    <div className="space-y-3.5">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100/60">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide flex items-center gap-1.5">
                                          <span>💨</span> Sahumerios y Atados Alquímicos para Renovar el Espacio
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light mt-0.5 font-sans">
                                          Aprende a formular y enrollar tus propios "atados de limpieza" con Romero y Lavanda para purificar el ambiente de trabajo o meditación.
                                        </p>
                                      </div>

                                      <div className="bg-white p-4 rounded-xl border border-[#E2ECE3] space-y-3 text-xs leading-relaxed">
                                        <div className="flex gap-2.5 items-start">
                                          <span className="font-mono font-bold text-[#E07A5F] bg-[#FAF9F5] border border-amber-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">PASO 1</span>
                                          <p className="text-gray-600">
                                            <strong>Cosecha consciente:</strong> Selecciona ramas largas y flexibles de Romero (unos 15cm) y espigas floridas de Lavanda. Ponlas juntas, alineadas hacia la misma dirección, asegurando que estén completamente secas (libre de rocío) para evitar mohos internos.
                                          </p>
                                        </div>

                                        <div className="flex gap-2.5 items-start">
                                          <span className="font-mono font-bold text-[#E07A5F] bg-[#FAF9F5] border border-amber-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">PASO 2</span>
                                          <p className="text-gray-600">
                                            <strong>El Atado Alquímico:</strong> Usa un hilo de algodón 100% natural. Comienza atando la base con un nudo doble y fuerte. Luego, enrolla en espiral cruzado bien apretado hacia la punta de las plantas, doblando las hojas sueltas hacia adentro. Al llegar arriba, regresa cruzando la espiral hasta la base y anuda con firmeza.
                                          </p>
                                        </div>

                                        <div className="flex gap-2.5 items-start">
                                          <span className="font-mono font-bold text-[#E07A5F] bg-[#FAF9F5] border border-amber-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">PASO 3</span>
                                          <p className="text-gray-600">
                                            <strong>Curado sutil:</strong> Deja colgar este atado por lo menos 15-20 días boca abajo para que la savia sutil se condense y el atado se encoja unificado. Estará listo cuando al presionarlo cruja sutilmente en tus dedos.
                                          </p>
                                        </div>

                                        <div className="flex gap-2.5 items-start">
                                          <span className="font-mono font-bold text-[#E07A5F] bg-[#FAF9F5] border border-amber-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">PASO 4</span>
                                          <p className="text-gray-600">
                                            <strong>Encendido Consciencia:</strong> Enciende la punta del sahumerio con un fósforo/cerilla. Sopla suavemente para apagar la llama y mantener solo el humo aromático sagrado. Recorre tu espacio de trabajo de adentro hacia afuera, visualizando cómo se disuelve el cansancio acumulado. Pósalo en un plato de cerámica o concha marina seguro para que se apague solo.
                                          </p>
                                        </div>
                                      </div>

                                      <div className="p-3 bg-white border border-[#E2ECE3] rounded-xl text-[11px] text-[#4E5E50] font-light flex items-center gap-2">
                                        <span className="text-[#427A5B]">⭐</span>
                                        <div className="leading-relaxed">
                                          <strong>Arquetipo del Romero & Lavanda:</strong> El Romero aporta vitalidad, enfoque de ideas y fortaleza intelectual, mientras que la Lavanda sella el espacio con paz profunda y amor compasivo. Perfecta combinación para encender antes de iniciar tu jornada de estudio o trabajo creativo.
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {botiquinSubTab === 'precauciones' && (
                                    <div className="space-y-3.5">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100/60 text-left">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide flex items-center gap-1.5">
                                          <span>🛡️</span> Guía de Dosificación Prudente y Alertas Corporales
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light mt-0.5 font-sans">
                                          La naturaleza es poderosa y merece un profundo respeto. Aprende las reglas de oro para un uso herbolario seguro, integrativo y libre de contraindicaciones.
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Reglas de Oro */}
                                        <div className="bg-white p-4 rounded-xl border border-[#E2ECE3]/40 space-y-2.5 text-left">
                                          <strong className="text-[10px] uppercase font-mono tracking-wider text-[#2D4A30] block">⚡ LAS REGLAS DE ORO DE VERÓNICA</strong>
                                          <ul className="space-y-2 text-[11px] text-[#4E5E50] leading-relaxed">
                                            <li className="flex gap-2 items-start">
                                              <span className="text-[#E07A5F] font-mono font-bold shrink-0">1.</span>
                                              <span><strong>Menos es más:</strong> Empieza siempre con dosis mínimas (la mitad de lo sugerido) para observar cómo asimila tu propio cuerpo y sistema digestivo.</span>
                                            </li>
                                            <li className="flex gap-2 items-start">
                                              <span className="text-[#E07A5F] font-mono font-bold shrink-0">2.</span>
                                              <span><strong>Intervalos de descanso:</strong> No bebas hierbas medicinales activas más de 7 días continuos. Deja reposar tu organismo al menos 3 días antes de continuar.</span>
                                            </li>
                                            <li className="flex gap-2 items-start">
                                              <span className="text-[#E07A5F] font-mono font-bold shrink-0">3.</span>
                                              <span><strong>No mezcles a ciegas:</strong> Evita combinar más de 3 hierbas en un mismo preparado o infusión para mantener clara la signatura química y evitar efectos cruzados indeseados.</span>
                                            </li>
                                          </ul>
                                        </div>

                                        {/* Alertas y Contraindicaciones */}
                                        <div className="bg-red-50/40 p-4 rounded-xl border border-red-100 space-y-2.5 text-left">
                                          <strong className="text-[10px] uppercase font-mono tracking-wider text-red-700 block">🛑 ADVERTENCIAS Y CONTRAINDICACIONES</strong>
                                          <ul className="space-y-2 text-[11px] text-red-900/90 leading-relaxed list-disc list-inside">
                                            <li><strong>Romero:</strong> Evitar su consumo oral en personas con hipertensión severa o sensibilidad biliar. No usar de noche si sufres insomnio.</li>
                                            <li><strong>Menta & Orégano:</strong> Contraindicadas dosis altas por vía oral en embarazo, periodo de lactancia o niños menores de 6 años por la potencia de sus aceites esenciales.</li>
                                            <li><strong>Alergias en Piel:</strong> Realiza siempre el "test de parche": coloca una gota de la infusión o compresa en la cara interna del antebrazo y espera 15 minutos para descartar enrojecimientos o picor.</li>
                                          </ul>
                                        </div>
                                      </div>

                                      {/* Humility & integration advice */}
                                      <div className="p-3 bg-white border border-gray-100/80 rounded-xl text-[10px] text-gray-400 font-light italic text-center">
                                        "Este manual herbolario sutil y amigable busca complementar tu búsqueda de bienestar integral. No sustituye de ninguna manera el tratamiento, diagnóstico o receta de un profesional médico certificado de confianza."
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedGift === 0 ? (
                              /* Interactive Bitácora "Mi Jardín Alquímico" Showcase */
                              <div className="border-t border-[#E2ECE3] pt-4 space-y-4">
                                <h5 className="font-sans text-[10px] font-mono font-bold uppercase tracking-widest text-[#2D4A30] mb-2 flex items-center gap-1.5 text-left">
                                  <BookOpen className="w-3.5 h-3.5 text-[#E07A5F]" /> HOJEAR LAS PÁGINAS DE TU BITÁCORA ALQUÍMICA
                                </h5>

                                {/* 4 Bitácora Sub-tabs */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-sans">
                                  {[
                                    { id: 'intenciones', label: 'Escribir Intención', icon: '📝' },
                                    { id: 'tracker', label: 'Ritual 5 Minutos', icon: '⏳' },
                                    { id: 'fichas', label: 'Estado & Salud', icon: '🌱' },
                                    { id: 'preguntas', label: 'Indagar Estaciones', icon: '🍂' }
                                  ].map((tab) => {
                                    const isActive = bitacoraSubTab === tab.id;
                                    return (
                                      <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setBitacoraSubTab(tab.id as any)}
                                        className={`px-2 py-2 rounded-xl text-[10px] font-semibold transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer focus:outline-none ${
                                          isActive 
                                            ? 'bg-[#E07A5F] text-[#FAF9F5] shadow-xs ring-1 ring-[#BF5A3F]' 
                                            : 'bg-[#FAF9F5] border border-[#E2ECE3] text-[#53735E] hover:border-[#D5E1D6] hover:bg-white'
                                        }`}
                                      >
                                        <span className="text-sm">{tab.icon}</span>
                                        <span className="leading-tight">{tab.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Tab Content Area */}
                                <div className="bg-[#FAF9F5] rounded-2xl border border-[#E2ECE3] p-4 text-left space-y-4">
                                  
                                  {bitacoraSubTab === 'intenciones' && (
                                    <div className="space-y-3.5">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100/60">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide flex items-center gap-1.5">
                                          <span>📝</span> Hojas de Intención Inicial Estructuradas por Aliada Verde
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light mt-0.5">
                                          Antes de sembrar o cuidar, plasmamos el propósito sutil de tu conexión con cada planta. Selecciona una aliada para escribir tu pacto diario.
                                        </p>
                                      </div>

                                      {/* Small Plant selector */}
                                      <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-none font-sans">
                                        {[
                                          { id: 'lavanda', name: 'Lavanda', icon: '🌸' },
                                          { id: 'romero', name: 'Romero', icon: '🌿' },
                                          { id: 'menta', name: 'Menta', icon: '🍃' },
                                          { id: 'calendula', name: 'Caléndula', icon: '🌼' },
                                          { id: 'aloe', name: 'Aloe Vera', icon: '🛡️' },
                                          { id: 'oregano', name: 'Orégano', icon: '🌱' }
                                        ].map((pObj) => {
                                          const isAct = bitacoraActivePlant === pObj.id;
                                          return (
                                            <button
                                              key={pObj.id}
                                              type="button"
                                              onClick={() => setBitacoraActivePlant(pObj.id)}
                                              className={`px-2 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap cursor-pointer transition-all focus:outline-none ${
                                                isAct 
                                                  ? 'bg-[#2D4A30] text-[#FAF9F5]' 
                                                  : 'bg-white border border-[#E2ECE3] text-[#53735E] hover:bg-gray-50'
                                              }`}
                                            >
                                              {pObj.icon} {pObj.name}
                                            </button>
                                          );
                                        })}
                                      </div>

                                      {/* Intention Card */}
                                      <div className="bg-white p-4 rounded-xl border border-[#E2ECE3]/80 space-y-3 relative overflow-hidden">
                                        {/* Graphic watermark/accents */}
                                        <div className="absolute right-2 top-2 text-[#E2ECE3]/40 text-4xl select-none font-serif font-bold">
                                          {bitacoraActivePlant === 'lavanda' ? '🌸' : bitacoraActivePlant === 'romero' ? '🌿' : bitacoraActivePlant === 'menta' ? '🍃' : bitacoraActivePlant === 'calendula' ? '🌼' : bitacoraActivePlant === 'aloe' ? '🛡️' : '🌱'}
                                        </div>

                                        <div className="space-y-1">
                                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F]">
                                            HOJA DE PROPÓSITO CON {bitacoraActivePlant.toUpperCase()}
                                          </span>
                                          <p className="text-[11px] text-[#4E5E50] italic leading-relaxed">
                                            {bitacoraActivePlant === 'lavanda' && '“Mi calma es mi templo sutil. Elijo transmutar el insomnio en reposo reparador y contemplativo.”'}
                                            {bitacoraActivePlant === 'romero' && '“Fuego interior despierto. Elijo canalizar mi foco creativo sin la exigencia ni el agobio.”'}
                                            {bitacoraActivePlant === 'menta' && '“Un viento refrescante barra mi mente cansada. Elijo habitar pensamientos ágiles y claros.”'}
                                            {bitacoraActivePlant === 'calendula' && '“Ternura para cicatrizar. Elijo abrazar mis procesos más lentos y sanar mi piel tiernamente.”'}
                                            {bitacoraActivePlant === 'aloe' && '“Escudo de agua y savia. Elijo poner límites sanos y pacíficos para resguardar mi energía.”'}
                                            {bitacoraActivePlant === 'oregano' && '“Cántaro purificador. Elijo desalojar el ruido del entorno y centrarme en mis certezas sutiles.”'}
                                          </p>
                                        </div>

                                        <div className="space-y-1.5 font-sans">
                                          <label htmlFor={`intention-${bitacoraActivePlant}`} className="text-[10px] font-bold text-[#2D4A30] block">
                                            ✍️ Escribe tu pacto de calma con esta aliada:
                                          </label>
                                          <textarea
                                            id={`intention-${bitacoraActivePlant}`}
                                            rows={2}
                                            value={bitacoraUserIntention[bitacoraActivePlant] || ''}
                                            onChange={(e) => setBitacoraUserIntention({
                                              ...bitacoraUserIntention,
                                              [bitacoraActivePlant]: e.target.value
                                            })}
                                            placeholder="Por ejemplo: Prometo regarla los miércoles sin prisa, respirándola profundamente..."
                                            className="w-full bg-[#FAF9F5] border border-[#E2ECE3] rounded-lg p-2.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#427A5B] font-light resize-none"
                                          />
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                                          <span>✏️ Al escribirlo físicamente generas resonancia somática.</span>
                                          <span className="font-mono text-[9px] text-[#427A5B] bg-[#E2ECE3] px-1.5 py-0.5 rounded">
                                            Guardado local interactivo
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {bitacoraSubTab === 'tracker' && (
                                    <div className="space-y-3.5">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100/60 font-sans">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide flex items-center gap-1.5">
                                          <span>⏳</span> Tracker Semanal: El 'Ritual de los 5 Minutos' sin Culpa
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light mt-0.5">
                                          Un ritual diario sutil para desacelerar el ritmo, regar la planta sintiendo la tierra y registrar tu presencia semanal libre de rigideces.
                                        </p>
                                      </div>

                                      {/* Interactive checklist block */}
                                      <div className="bg-white p-4 rounded-xl border border-[#E2ECE3] space-y-4 font-sans">
                                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                                          <div>
                                            <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F]">SEMANA EN CURSO</span>
                                            <div className="text-xs font-bold text-[#1E2E20] flex items-center gap-1">
                                              Racha de Presencia Activa: 
                                              <span className="text-[#427A5B] font-mono text-xs bg-[#E2ECE3] px-2 py-0.5 rounded-md">
                                                {Object.values(bitacoraTrackerDays).filter(Boolean).length} / 7 días
                                              </span>
                                            </div>
                                          </div>
                                          <div className="text-[10px] text-gray-400 font-light italic text-right hidden sm:block">
                                            "No necesitas hacer todo perfecto. Un solo día basta."
                                          </div>
                                        </div>

                                        {/* Weekly 7 Day Checkbox row */}
                                        <div className="grid grid-cols-2 sm:grid-cols-7 gap-1.5 pt-1">
                                          {[
                                            { dayNum: 1, label: 'LUN', desc: 'Respiro sutil' },
                                            { dayNum: 2, label: 'MAR', desc: 'Rozar hojas' },
                                            { dayNum: 3, label: 'MIÉ', desc: 'Sustrato húmedo' },
                                            { dayNum: 4, label: 'JUE', desc: 'Contemplar 3m' },
                                            { dayNum: 5, label: 'VIE', desc: 'Oler brotes' },
                                            { dayNum: 6, label: 'SÁB', desc: 'Agradecer sutil' },
                                            { dayNum: 7, label: 'DOM', desc: 'Cuidado extra' }
                                          ].map((day) => {
                                            const isChecked = bitacoraTrackerDays[day.dayNum];
                                            return (
                                              <button
                                                key={day.dayNum}
                                                type="button"
                                                onClick={() => setBitacoraTrackerDays({
                                                  ...bitacoraTrackerDays,
                                                  [day.dayNum]: !isChecked
                                                })}
                                                className={`p-1.5 rounded-xl transition-all cursor-pointer text-center flex flex-col justify-between items-center h-[58px] focus:outline-none ${
                                                  isChecked 
                                                    ? 'bg-[#E2ECE3] border border-[#BACFBD] text-[#2D4A30]' 
                                                    : 'bg-[#FAF9F5] border border-gray-100 text-gray-400 hover:border-gray-200 hover:bg-white'
                                                }`}
                                              >
                                                <span className="text-[9px] font-mono font-semibold tracking-wider">{day.label}</span>
                                                <span className="text-xs">{isChecked ? '✓' : '○'}</span>
                                                <span className="text-[7.5px] leading-none text-gray-500 truncate w-full">{day.desc}</span>
                                              </button>
                                            );
                                          })}
                                        </div>

                                        {/* Dynamic tip based on selected days */}
                                        <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#BACFBD]/40 text-[11px] text-[#4E5E50] leading-relaxed flex gap-2 items-start">
                                          <span className="text-[#E07A5F] text-sm mt-0.5">🍃</span>
                                          <div className="text-left leading-relaxed">
                                            {Object.values(bitacoraTrackerDays).filter(Boolean).length === 0 ? (
                                              <strong>Inicia tu semana sutil seleccionando tu primer día. Tómate solo lo que dure una respiración consciente.</strong>
                                            ) : Object.values(bitacoraTrackerDays).filter(Boolean).length <= 2 ? (
                                              <span><strong>Buen punto de partida sin presiones:</strong> Has registrado presencia. Verónica aconseja: <em>"Haz de ese minuto de riego tu único pensamiento. El cortisol baja cuando el foco se detiene en un brote verde vivo."</em></span>
                                            ) : Object.values(bitacoraTrackerDays).filter(Boolean).length <= 5 ? (
                                              <span><strong>Excelente ritmo orgánico:</strong> Has anclado tu consciencia con tu aliada. Siente cómo se desacelera el torbellino de la jornada semanal con solo desviar la mirada hacia tu maceta de paz.</span>
                                            ) : (
                                              <span><strong>Maravillosa constancia sagrada:</strong> Tu templo vegetal y tu rincón sagrado se consolidan. Experimentas los beneficios somáticos completos de la fitoterapia ambiental integrativa.</span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {bitacoraSubTab === 'fichas' && (
                                    <div className="space-y-3.5">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100/60 font-sans">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide flex items-center gap-1.5">
                                          <span>🌱</span> Fichas de Registro Fotográfico, Crecimiento & Salud Botánica
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light mt-0.5">
                                          Mide interactivamente los hitos de tu aliada. La bitácora fomenta la observación clínica sutil de cada hoja, dándote herramientas prácticas para socorrer su bienestar.
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                        {/* Configuration details col span 3 */}
                                        <div className="md:col-span-3 bg-white p-4 rounded-xl border border-[#E2ECE3] space-y-3.5 font-sans text-left text-xs">
                                          <div className="space-y-1.5">
                                            <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F] block">STAGE O FASE DE CRECIMIENTO:</strong>
                                            <div className="grid grid-cols-2 gap-1.5">
                                              {[
                                                { id: 'semilla', label: 'Semilla', icon: '🌰', desc: 'Bajo tierra' },
                                                { id: 'brote', label: 'Primer Brote', icon: '🌱', desc: 'Asombro verde' },
                                                { id: 'crecimiento', label: 'Crecim. Activo', icon: '🌿', desc: 'Ramas en luz' },
                                                { id: 'esplendor', label: 'Esplendor', icon: '🌸', desc: 'Aroma vivo' }
                                              ].map((ph) => {
                                                const isActive = bitacoraPhase === ph.id;
                                                return (
                                                  <button
                                                    key={ph.id}
                                                    type="button"
                                                    onClick={() => setBitacoraPhase(ph.id as any)}
                                                    className={`p-2 rounded-xl text-left border flex items-center gap-2 cursor-pointer focus:outline-none transition-all ${
                                                      isActive 
                                                        ? 'border-[#2D4A30] bg-[#E2ECE3]/40' 
                                                        : 'border-gray-100 hover:border-gray-200 hover:bg-[#FAF9F5]'
                                                    }`}
                                                  >
                                                    <span className="text-base">{ph.icon}</span>
                                                    <div className="leading-tight">
                                                      <div className="font-semibold text-[10px] text-[#2D4A30]">{ph.label}</div>
                                                      <div className="text-[8px] text-gray-400 font-light">{ph.desc}</div>
                                                    </div>
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </div>

                                          <div className="space-y-1.5">
                                            <div className="flex justify-between items-center text-[10px] font-bold text-[#2D4A30]">
                                              <span>🍃 Recuento aproximado de hojas sanas:</span>
                                              <span className="font-mono text-[#E07A5F] bg-[#FDF0EC] px-1.5 rounded">{bitacoraLeafCount} hojas</span>
                                            </div>
                                            <div className="flex gap-1.5 items-center">
                                              <input
                                                type="range"
                                                min={1}
                                                max={50}
                                                value={bitacoraLeafCount}
                                                onChange={(e) => setBitacoraLeafCount(Number(e.target.value))}
                                                className="w-full text-[#427A5B] accent-[#427A5B] bg-[#FAF9F5]"
                                              />
                                            </div>
                                          </div>

                                          <div className="space-y-1.5">
                                            <strong className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#2D4A30] block">ESTADO GENERAL DE VITALIDAD:</strong>
                                            <div className="grid grid-cols-3 gap-1.5">
                                              {[
                                                { id: 'vibrante', label: 'Vibrante', icon: '🟢' },
                                                { id: 'atencion', label: 'Alerta Seca', icon: '🟡' },
                                                { id: 'sedienta', label: 'Sedienta', icon: '🔴' }
                                              ].map((hs) => {
                                                const isActive = bitacoraHealth === hs.id;
                                                return (
                                                  <button
                                                    key={hs.id}
                                                    type="button"
                                                    onClick={() => setBitacoraHealth(hs.id as any)}
                                                    className={`py-1.5 rounded-lg border text-center font-medium text-[9px] cursor-pointer focus:outline-none transition-all ${
                                                      isActive 
                                                        ? 'border-[#2D4A30] bg-[#E2ECE3] text-[#2D4A30]' 
                                                        : 'border-gray-100 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                                  >
                                                    {hs.icon} {hs.label}
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </div>

                                          <div className="space-y-1">
                                            <label htmlFor="bitacora-diary-note" className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#2D4A30] block">
                                              📝 ANOTACIONES CONSCIENCIA HOY:
                                            </label>
                                            <textarea
                                              id="bitacora-diary-note"
                                              rows={2}
                                              value={bitacoraDiaryNote}
                                              onChange={(e) => setBitacoraDiaryNote(e.target.value)}
                                              placeholder="Anota cambios de luz, nuevas ramitas o alertas..."
                                              className="w-full bg-[#FAF9F5] border border-[#E2ECE3] rounded-lg p-2 text-[11px] text-[#4E5E50] focus:ring-1 focus:ring-[#427A5B] focus:outline-none"
                                            />
                                          </div>
                                        </div>

                                        {/* Mock Polaroid Card, col span 2 */}
                                        <div className="md:col-span-2 bg-white p-3.5 rounded-xl border border-[#BACFBD]/40 flex flex-col items-center justify-between text-center relative overflow-hidden font-sans">
                                          {/* Polaroid Border and space */}
                                          <div className="bg-[#FCFAF2] border border-[#E2ECE3] p-2 w-full rounded shadow-xs relative">
                                            {/* Retro Polaroid frame */}
                                            <div className="aspect-square bg-white border border-[#E2ECE3] rounded overflow-hidden flex flex-col justify-center items-center relative p-1 pb-2">
                                              {/* Graphic Representation based on State */}
                                              {bitacoraPhase === 'semilla' && (
                                                <div className="text-4xl filter saturate-75">🌰</div>
                                              )}
                                              {bitacoraPhase === 'brote' && (
                                                <div className="text-4xl filter saturate-75">🌱</div>
                                              )}
                                              {bitacoraPhase === 'crecimiento' && (
                                                <div className="text-4xl filter saturate-75">🌿</div>
                                              )}
                                              {bitacoraPhase === 'esplendor' && (
                                                <div className="text-4xl filter saturate-75">🌸</div>
                                              )}
                                              <span className="text-[9px] tracking-wider text-[#4E5E50]/70 uppercase font-mono mt-2 font-bold">FOTO PROCESO</span>
                                              <span className="text-[8px] text-gray-400 font-mono">Fase: {bitacoraPhase === 'semilla' ? 'Tierra fértil' : bitacoraPhase === 'brote' ? 'Fuerza vulnerable' : bitacoraPhase === 'crecimiento' ? 'Expansión solar' : 'Esplendor y cosecha'}</span>
                                            </div>
                                            
                                            {/* Polaroids writing area at bottom */}
                                            <div className="pt-2 text-[#2D4A30] font-serif text-[10px] italic font-semibold tracking-wide">
                                              "Mi Rincón de Paz"
                                            </div>
                                          </div>

                                          {/* Diagnostic Tips Area based on general health */}
                                          <div className="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#E07A5F]/20 w-full text-[10px] leading-relaxed text-left text-gray-500 mt-2">
                                            {bitacoraHealth === 'vibrante' ? (
                                              <span>🌿 <strong>¡Salud impecable!</strong> Tu aliada asimila la luz y el agua correctamente. Sigue con tu rito sutil de riego y observación.</span>
                                            ) : bitacoraHealth === 'atencion' ? (
                                              <span>⚠️ <strong>Diagnóstico Sutil:</strong> Las puntas amarillas sugieren sobregoteo de agua o encharcamiento temporal. Reduce la frecuencia de riego y remueve el sustrato con un palito de madera suave.</span>
                                            ) : (
                                              <span>🔴 <strong>Alerta Sedienta:</strong> Tallos decaídos. Vierte agua templada lentamente por los costados de la maceta hasta humedecer sin encharcar. Evita horas de sol extremo directo hoy.</span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {bitacoraSubTab === 'preguntas' && (
                                    <div className="space-y-3.5">
                                      <div className="bg-white p-3 rounded-xl border border-gray-100/60 font-sans">
                                        <h6 className="font-serif text-xs font-bold text-[#1E2E20] uppercase tracking-wide flex items-center gap-1.5">
                                          <span>🍂</span> 12 Preguntas de Introspección Profunda al Ritmo de las Estaciones
                                        </h6>
                                        <p className="text-[11px] text-gray-500 font-light mt-0.5">
                                          La naturaleza cambia de ropaje a lo largo del año. Explora tus ritmos y estados emocionales sintonizándote con la energía cíclica de la estación actual.
                                        </p>
                                      </div>

                                      {/* Estaciones Sub-Bar */}
                                      <div className="grid grid-cols-4 gap-1.5 font-sans">
                                        {[
                                          { id: 'primavera', label: 'Primavera 🌸', desc: 'Renacer' },
                                          { id: 'verano', label: 'Verano ☀️', desc: 'Acción' },
                                          { id: 'otono', label: 'Otoño 🍂', desc: 'Soltar' },
                                          { id: 'invierno', label: 'Invierno ❄️', desc: 'Refugio' }
                                        ].map((seas) => {
                                          const isCurrent = bitacoraActiveSeason === seas.id;
                                          return (
                                            <button
                                              key={seas.id}
                                              type="button"
                                              onClick={() => {
                                                setBitacoraActiveSeason(seas.id as any);
                                                setBitacoraActiveQuestionIdx(0);
                                              }}
                                              className={`py-1.5 rounded-xl text-[10px] font-semibold flex flex-col justify-center items-center transition-all cursor-pointer focus:outline-none ${
                                                isCurrent 
                                                  ? 'bg-[#2D4A30] text-[#FAF9F5]' 
                                                  : 'bg-white border border-[#E2ECE3] text-[#53735E] hover:bg-gray-50'
                                              }`}
                                            >
                                              <span>{seas.label}</span>
                                              <span className="text-[7.5px] font-light opacity-90">{seas.desc}</span>
                                            </button>
                                          );
                                        })}
                                      </div>

                                      {/* Season Questions list */}
                                      {(() => {
                                        const questions = {
                                          primavera: [
                                            '¿Qué propósitos o intenciones dormidas están pidiendo luz en mi interior para comenzar a brotar voluntariamente hoy?',
                                            '¿De qué nuevos hábitos sanadores y pausados deseo sembrar la semilla en mi rutina cotidiana esta estación?',
                                            '¿Cómo preparo mi tierra física (mi cuerpo, mi descanso, mi espacio) para sostener mi futura expansión y vitalidad?'
                                          ],
                                          verano: [
                                            '¿De qué manera comparto mi luz, mi alegría y mi abundancia madura con los seres que me rodean externamente?',
                                            '¿Qué espacios de pausa regeneradora y frescura me reservo activamente para no quemar mis flores con la autoexigencia?',
                                            '¿Cómo me sostengo con firmeza y gracia somática cuando los fuegos e impulsos de la vida exterior arden con fuerza?'
                                          ],
                                          otono: [
                                            '¿Qué pensamientos rígidos, obsesiones u obligaciones ajenas me pesa sostener, de igual forma que las ramas sueltan sus hojas secas?',
                                            '¿Cómo transito mis duelos íntimos, mis pérdidas de energía y mis momentos de vaciamiento voluntario en soledad?',
                                            '¿Qué cosechas sutiles aprecio y agradezco del ciclo que se cierra con el susurro frío del otoño?'
                                          ],
                                          invierno: [
                                            '¿Cómo habito con paz mi propio silencio interno y la oscuridad fecunda sin sentir ansiedad de crear o producir?',
                                            '¿Qué partes cansadas e íntimas de mi ser necesitan entregarse a un descanso invernal profundo y reparador hoy?',
                                            '¿Cómo nutro mis raíces invisibles (vida espiritual, lectura sabia, meditación sutil) mientras aguardo el regreso del sol?'
                                          ]
                                        }[bitacoraActiveSeason];

                                        const qKey = `${bitacoraActiveSeason}-${bitacoraActiveQuestionIdx}`;
                                        const currentAnswer = bitacoraQuestionAnswers[qKey] || '';

                                        return (
                                          <div className="bg-white p-4 rounded-xl border border-[#E2ECE3] space-y-3.5 text-xs text-left">
                                            <div className="space-y-1">
                                              <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#E07A5F] block">PREGUNTA SELECCIONADA:</span>
                                              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none font-sans">
                                                {questions.map((q, qIndex) => (
                                                  <button
                                                    key={qIndex}
                                                    type="button"
                                                    onClick={() => setBitacoraActiveQuestionIdx(qIndex)}
                                                    className={`px-3 py-1 text-[10px] font-medium transition-all whitespace-nowrap cursor-pointer focus:outline-none rounded-lg ${
                                                      bitacoraActiveQuestionIdx === qIndex 
                                                        ? 'bg-[#E07A5F] text-white' 
                                                        : 'bg-[#FAF9F5] text-[#53735E] border border-gray-100 hover:border-gray-200'
                                                    }`}
                                                  >
                                                    Pregunta 0{qIndex + 1}
                                                  </button>
                                                ))}
                                              </div>
                                            </div>

                                            {/* Beautiful Display of Active Question */}
                                            <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#BACFBD]/40 text-left">
                                              <p className="font-serif italic text-xs text-[#2D4A30] leading-relaxed">
                                                "{questions[bitacoraActiveQuestionIdx]}"
                                              </p>
                                            </div>

                                            {/* Answer Form */}
                                            <div className="space-y-1.5 text-left font-sans">
                                              <label htmlFor={`answer-${qKey}`} className="text-[10px] font-bold text-[#2D4A30] block">
                                                ✍️ Plásmala en tu diario (Tu respuesta sutil):
                                              </label>
                                              <textarea
                                                id={`answer-${qKey}`}
                                                rows={2}
                                                value={currentAnswer}
                                                onChange={(e) => setBitacoraQuestionAnswers({
                                                  ...bitacoraQuestionAnswers,
                                                  [qKey]: e.target.value
                                                })}
                                                placeholder="Saca tus reflexiones de la mente. Escríbelas aquí para dejarlas asentadas con paciencia..."
                                                className="w-full bg-[#FAF9F5] border border-[#E2ECE3] rounded-lg p-2.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#427A5B] font-light resize-none"
                                              />
                                            </div>

                                            <div className="p-3 bg-emerald-50/50 rounded-xl text-[10.5px] text-[#4E5E50] leading-normal font-light italic flex items-start gap-2 border border-emerald-100/30">
                                              <span>🌸</span>
                                              <span>
                                                <strong>Consejo de Verónica:</strong> <em>"Tu bitácora es libre de juicios artificiales. Ninguna respuesta es buena o mala, solo es una fotografía sincera de tu espíritu en este instante de la estación."</em>
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedGift === 4 ? (
                              /* Interactive Meditations Player */
                              <div className="border-t border-[#E2ECE3] pt-4 space-y-4">
                                <MeditationsPlayer />
                              </div>
                            ) : selectedGift === 5 ? (
                              /* Interactive Private Community Preview */
                              <div className="border-t border-[#E2ECE3] pt-4 space-y-4 text-left font-sans">
                                <div className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100/30 flex gap-2">
                                  <span className="text-base select-none">📢</span>
                                  <div className="space-y-0.5">
                                    <span className="text-[10.5px] font-bold text-[#2D4A30] block">Vías de Comunicación Activadas de Inmediato:</span>
                                    <p className="text-[10px] text-gray-500 leading-normal font-light">
                                      Una vez que entras a tu portal digital herbolario, tendrás accesos directos persistentes con un solo clic. Mira lo que encontrarás en cada canal herbolario:
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
                                  {/* Facebook mock controller info */}
                                  <div className="p-3.5 bg-white border border-[#E2ECE3] rounded-2xl shadow-xs space-y-2 relative overflow-hidden">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold text-[#1877F2] uppercase tracking-wider font-mono">1. Comunidad de Facebook</span>
                                      <span className="text-[9px] bg-[#1877F2]/10 text-[#1877F2] px-2 py-0.5 rounded-full font-bold">ACTIVO</span>
                                    </div>
                                    <p className="text-[10px] text-[#4E5E50] leading-relaxed font-light">
                                      Espacio para publicar tus <strong>fichas botánicas semanales</strong>, fotos de tus hojas brotando, sahumerios caseros y dinámicas de introspección para conocernos.
                                    </p>
                                    <div className="text-[9.5px] p-2 bg-gray-50 rounded-lg text-gray-500 italic border border-gray-100/50">
                                      🗣️ <em>Verónica responde dudas los martes y viernes.</em>
                                    </div>
                                    <a
                                      href="https://facebook.com"
                                      target="_blank"
                                      rel="noopener referrer"
                                      className="w-full inline-flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold bg-[#1877F2] text-white rounded-xl hover:bg-[#155fc2] transition-colors focus:ring-1 focus:ring-offset-1 focus:ring-[#1877F2] cursor-pointer"
                                    >
                                      <span>Simular entrada a Facebook</span>
                                      <span className="text-[8.5px] font-normal opacity-80">(Público demo)</span>
                                    </a>
                                  </div>

                                  {/* Telegram mock controller info */}
                                  <div className="p-3.5 bg-white border border-[#E2ECE3] rounded-2xl shadow-xs space-y-2 relative overflow-hidden">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold text-[#0088CC] uppercase tracking-wider font-mono">2. Alertas por Telegram</span>
                                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">24/7 EXPRESS</span>
                                    </div>
                                    <p className="text-[10px] text-[#4E5E50] leading-relaxed font-light">
                                      Un canal enfocado libre de distracciones. Recibe directo en tu celular las <strong>fechas exactas de siembra lunar</strong>, avisos de riego extremo por calor y recordatorios express de calma de 5 minutos.
                                    </p>
                                    <div className="text-[9.5px] p-2 bg-gray-50 rounded-lg text-gray-500 italic border border-gray-100/50">
                                      ✈️ <em>Tutoría express del equipo de soporte.</em>
                                    </div>
                                    <a
                                      href="https://telegram.org"
                                      target="_blank"
                                      rel="noopener referrer"
                                      className="w-full inline-flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold bg-[#0088CC] text-white rounded-xl hover:bg-[#0077b3] transition-colors focus:ring-1 focus:ring-offset-1 focus:ring-[#0088CC] cursor-pointer"
                                    >
                                      <span>Simular entrada a Telegram</span>
                                      <span className="text-[8.5px] font-normal opacity-80">(Soporte demo)</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Standard Key Features view for other gifts */
                              <div className="space-y-2">
                                <h5 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#1E2E20]">
                                  ¿Qué Incluye Exactamente?
                                </h5>
                                <ul className="grid grid-cols-1 gap-2">
                                  {BONUS_GIFTS[selectedGift].keyFeatures.map((feature, featureIdx) => (
                                    <li key={featureIdx} className="flex gap-2 items-start text-xs text-[#53735E]">
                                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing / Investment Cards */}
      <section className="bg-[#EAE8DF]/51 py-16 px-6 border-t border-[#DADBCE]">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-serif text-xs uppercase tracking-widest font-bold text-[#53735E] mb-3">TU INVERSIÓN EN CALMA</h3>
          <h2 className="font-serif text-4xl text-[#1E2E20] leading-tight mb-8">
            Adquiere tu Pase a la Edición Fundadora
          </h2>

          <div className="bg-white rounded-3xl border border-[#D5D5B8]/40 shadow-sm max-w-md mx-auto overflow-hidden">
            <div className="bg-[#2D4A30] text-[#FAF9F5] py-4 px-6 text-xs uppercase tracking-widest font-bold">
              Oferta Especial Lanzamiento
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-gray-400 line-through">VALOR ORIGINAL REAL USD 197</span>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-serif mr-1.5 text-gray-500">$</span>
                  <span className="text-5xl font-bold text-[#2D4A30] tracking-tight">47</span>
                  <span className="text-sm font-medium text-[#4E5E50] ml-1.5">USD</span>
                </div>
                <p className="text-xs text-gray-400 italic">o el equivalente en tu moneda local al momento del checkout</p>
              </div>

              <div className="w-12 h-px bg-[#E2ECE3] mx-auto"></div>

              <div className="text-left space-y-3.5">
                {[
                  "Acceso completo de por vida a los 5 módulos",
                  "Bitácora imprimible/digital 'Mi Jardín Alquímico'",
                  "Guías del Botiquín Verde y Plantas Aliadas",
                  "Calendario automatizado libre de estrés",
                  "Meditaciones guiadas con audio integrado",
                  "Acceso a la comunidad privada virtual",
                  "Invitación al vivo grupal con Verónica"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4E5E50]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-3.5 bg-[#2D4A30] text-[#FAF9F5] rounded-xl font-bold hover:bg-[#385B3C] active:translate-y-0.5 transition-all text-sm uppercase tracking-wider"
                >
                  Unirme Hoy — USD 47
                </button>
                <div className="flex justify-center items-center gap-1.5 text-[10px] text-gray-400 mt-3 font-medium uppercase tracking-widest">
                  <Clock className="w-3 h-3 text-amber-500 animate-pulse" />
                  <span>Solo quedan 10 plazas disponibles</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Sandbox Warning */}
          <p className="text-[11px] text-[#6F8071] max-w-lg mx-auto leading-relaxed mt-10 italic">
            *Esta es una demostración interactiva totalmente funcional del programa completo. Al ingresar, podrás jugar con todas las etapas en tiempo real, configurar tu Refugio Verde para que lo sientas real, y conversar con Verónica usando inteligencia artificial.
          </p>
        </div>
      </section>

      {/* Secure footer */}
      <footer className="bg-[#1E2E20] text-[#E2ECE3]/80 py-12 px-6 text-center border-t border-[#132014]">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-serif text-lg italic text-[#E2ECE3]">"Donde sanar es crecer."</p>
          <p className="text-xs tracking-wide">© 2026 Mi Jardín Alquímico & Refugio Verde™. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-6 text-[10px] uppercase font-bold tracking-widest text-[#427A5B]/80 pt-2">
            <span>Método Alquimia Verde</span>
            <span>·</span>
            <span>Edición Fundadora</span>
            <span>·</span>
            <span>Medicina Humana sutil</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
