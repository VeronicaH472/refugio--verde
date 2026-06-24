import { Plant } from './types';

export const PLANTS_DATA: Plant[] = [
  {
    id: 'lavanda',
    name: 'Lavanda',
    scientificName: 'Lavandula angustifolia',
    emotionalGift: 'Calma e Interioridad',
    philosophy: 'La lavanda es un bálsamo para la mente acelerada. Sus tonos violetas y su aroma inconfundible te invitan a bajar el ritmo, respirar profundo y entrar en un estado de quietud mental y paz interior.',
    benefits: [
      'Alivia el estrés somático, calmando los latidos acelerados y la tensión del pecho.',
      'Mejora la arquitectura del sueño, despejando los pensamientos circulares de la noche.',
      'Sana y armoniza los campos de energía del hogar, desarmando vibraciones hostiles.'
    ],
    care: {
      watering: 'Moderado a bajo. Prefiere que la tierra se seque por completo antes de volver a regar. El exceso de humedad es su mayor enemigo.',
      light: 'Sol directo pleno. Requiere al menos 6 horas de luz solar directa al día para florecer y liberar sus aceites.',
      soil: 'Poco fértil, arenoso, rústico y con excelente filtración de agua.',
      alert: 'Hojas blandas que amarillean o se caen al tacto indican exceso de agua o asfixia en sus raíces.'
    },
    botiquin: {
      title: 'Tu Botiquín de Calma con Lavanda',
      uses: [
        {
          type: 'Aroma',
          instructions: 'Frota suavemente una ramita o flores secas entre tus manos antes de dormir e inhala su perfume profundamente 3 veces.'
        },
        {
          type: 'Infusión',
          instructions: 'Infunde 1 cucharada de flores de lavanda secas en agua caliente por 5 minutos para un té relajante nocturno.'
        },
        {
          type: 'Compresa',
          instructions: 'Aplica una compresa empapada en infusión fría de lavanda sobre la frente o sienes para aliviar dolores de cabeza por tensión.'
        }
      ]
    },
    humanSpirit: 'Te ayuda a crear espacios de calma cuando el ruido mental te abruma y necesitas urgentemente recordar cómo respirar sin prisa.',
    reciprocalCare: 'Necesita que respetes su necesidad de sequedad y luz libre. Ofrécele sol radiante y un suelo ligero que drene rápido; odia el asfixiante estancamiento de agua en sus raíces y la sombra fría.',
    lifeIntegration: {
      intro: 'Aprende a integrar la lavanda en tu vida cotidiana para disipar la ansiedad acumulada tras un día laboral ruidoso o estresante.',
      practicalExample: 'El Ritual de la Almohada Perfumada: Ideal si experimentas insomnio silencioso o si tu mente repasa pendientes infinitos a las 11 PM.',
      stepByStep: [
        'Espera al atardecer y corta con cuidado dos pequeñas ramitas floridas de tu planta de lavanda.',
        'Siéntate al borde del colchón con la columna recta, cierra los ojos y frota las espigas herbales suavemente entre tus palmas para activar sus aceites orgánicos.',
        'Inhala tres veces de forma lenta e hinchando el diafragma el olor balsámico liberado en tus manos.',
        'Introduce las ramitas frotadas dentro de la funda de tu almohada para que sus notas sutiles disuelvan tu parloteo mental y te lleven a un sueño profundo.'
      ]
    }
  },
  {
    id: 'romero',
    name: 'Romero',
    scientificName: 'Salvia rosmarinus',
    emotionalGift: 'Claridad Mental y Vitalidad',
    philosophy: 'El romero despierta los sentidos y aclara la mente. Es una planta de fuego, portadora de energía que disipa la bruma mental, mejora el enfoque y te impulsa a actuar con confianza.',
    benefits: [
      'Estimula la memoria, la concentración activa y la lucidez mental en tareas cognitivas.',
      'Aporta vigor físico inmediato, disipando la pereza muscular y el letargo.',
      'Potente tónico circulatorio y digestivo que activa la asimilación de nutrientes.'
    ],
    care: {
      watering: 'Bajo. Tolera bien la sequía prolongada una vez establecido. Riega espaciadamente, dejando secar la tierra.',
      light: 'Sol directo pleno o luz sumamente intensa de ventana expuesta al este u oeste.',
      soil: 'Sustrato ligero, poroso, ligeramente mineral y muy bien drenado.',
      alert: 'Puntas de aguja que se ennegrecen o tallo lacio por falta de luz solar o goteo constante.'
    },
    botiquin: {
      title: 'Tu Botiquín de Enfoque con Romero',
      uses: [
        {
          type: 'Aroma',
          instructions: 'Mantén una ramita fresca en tu escritorio o espacio de estudio. Frotarla de vez en cuando restaura el enfoque mental.'
        },
        {
          type: 'Infusión',
          instructions: 'Toma una taza de infusión de romero por la mañana para estimular la digestión y activar tu energía sin cafeína.'
        },
        {
          type: 'Tradicional',
          instructions: 'Realiza un "baño herbal" colgando una ramita bajo el agua caliente de la ducha para que sus vapores abran tus vías aéreas.'
        }
      ]
    },
    humanSpirit: 'Te inyecta fuerza silvestre, foco nítido y vitalidad templada en las mañanas de cansancio profundo o letargo donde sientes dispersión mental.',
    reciprocalCare: 'Necesita espacio para extender sus raíces leñosas, aire corriente rozando sus hojas y sol directo constante. No lo sobreprotejas; su verdadero carácter medicinal surge de la adversidad controlada.',
    lifeIntegration: {
      intro: 'Utiliza el romero para arrancar el día con lucidez nítida, de manera que evites recurrir a estimulantes que desgasten tu sistema nervioso.',
      practicalExample: 'El Té de Enfoque Matutino: Un tónico digestivo e intelectual perfecto para sentarse a resolver proyectos difíciles sin experimentar taquicardia.',
      stepByStep: [
        'Corta una pequeña ramita fresca de romero (aproximadamente de 3 a 5 cm) en tus primeras horas del día.',
        'Colócala en tu taza preferida y vierte agua hirviendo. Cúbrela de inmediato con un plato para atrapar los valiosos vapores de cineol y alcanfor.',
        'Deja reposar tapado durante 7 minutos y luego retira la ramita con amor de la infusión.',
        'Bebe el té caliente a sorbos pausados mientras planificas tus tareas del día. Siente tu respiración despejarse y tus ideas ordenarse con total claridad.'
      ]
    }
  },
  {
    id: 'menta',
    name: 'Menta',
    scientificName: 'Mentha piperita',
    emotionalGift: 'Renovación e Inteligencia Emocional',
    philosophy: 'La menta es el aire fresco que renueva lo estancado. Su frescura vigorizante ayuda a romper con pensamientos circulares, aportando flexibilidad emocional frente a los cambios de la vida.',
    benefits: [
      'Alivia instantáneamente la fatiga mental y despeja el dolor de sienes por sobreesfuerzo.',
      'Excelente antiespasmódico estomacal, ideal para disconfort tras momentos de enojo.',
      'Aporta vibración de limpieza activa y frescura dinámica en ambientes cerrados.'
    ],
    care: {
      watering: 'Frecuente. Prefiere que la tierra esté siempre húmeda pero nunca encharcada. Sufre ante la sequía.',
      light: 'Sombra parcial o luz filtrada abundante. Evita exponerla al sol quemante del mediodía.',
      soil: 'Sustrato esponjoso, rico en abono orgánico o humus de lombriz que retenga humedad.',
      alert: 'Hojas que se curvan hacia abajo y lánguidas es advertencia directa de deshidratación.'
    },
    botiquin: {
      title: 'Tu Botiquín de Renovación con Menta',
      uses: [
        {
          type: 'Infusión',
          instructions: 'Usa 3 o 4 hojas frescas aplastadas en una taza para preparar un té digestivo ideal para después de comidas abundantes.'
        },
        {
          type: 'Aroma',
          instructions: 'Inhala el aroma de una hoja fresca desmenuzada para calmar los mareos, las náuseas o la fatiga vespertina.'
        },
        {
          type: 'Compresa',
          instructions: 'Usa la infusión fría de menta en gasas sobre piernas cansadas o sienes calientes para un alivio refrescante inmediato.'
        }
      ]
    },
    humanSpirit: 'Es tu soplo de renovación física y ligereza, abriendo tu pecho ante bloqueos somáticos y calmando tu irritación mental en días caóticos.',
    reciprocalCare: 'Te pide agua generosa y un suelo nutrido. A cambio de tu riego regular, ella cubrirá tu espacio de brotes verdes de expansión generosa y aroma refrescante.',
    lifeIntegration: {
      intro: 'Usa la menta como un interruptor térmico para enfriar la tensión corporal, el estrés o los dolores tensionales que se acumulan por la tarde.',
      practicalExample: 'El Compresor Descongestionante de Sienes: Diseñado para resetear tu bienestar en menos de 5 minutos entre videollamadas.',
      stepByStep: [
        'Desprende de la planta 5 hojas grandes de menta fresca y colócalas en un vaso de agua muy fría durante unos 5 minutos.',
        'Saca las hojas ligeramente escurridas y frótalas de forma circular sobre tus sienes, lados del cuello y nuca.',
        'Coloca las hojas humedecidas planas sobre tu frente, cierra los ojos firmemente y respira por la boca sintiendo la corriente ártica sobre tu piel.',
        'Siente la estimulación táctil enfriando tus preocupaciones y liberando el dolor de cabeza ruidoso.'
      ]
    }
  },
  {
    id: 'calendula',
    name: 'Caléndula',
    scientificName: 'Calendula officinalis',
    emotionalGift: 'Cuidado y Autocompasión',
    philosophy: 'La caléndula, con sus flores naranja como pequeños soles, representa el abrazo del afecto y el autocuidado. Te enseña a tratarte con ternura, paciencia y a sanar tus heridas paso a paso.',
    benefits: [
      'Regenera, hidrata y desinflama las pieles sensibles, secas o irritadas con suavidad.',
      'Su color naranja vibrante alegra la vista y combate los estados de ánimo opacos.',
      'Suaviza la aspereza de los tejidos cutáneos agredidos por el clima.'
    ],
    care: {
      watering: 'Regular. Riega cuando la superficie de la tierra empiece a secarse. Reclama agua directa al sustrato.',
      light: 'Luz solar directa abundante o semisombra abierta. Requiere sol para desplegar sus capullos.',
      soil: 'Sustrato suelto y bien drenado. No requiere grandes cantidades de fertilizante de síntesis.',
      alert: 'Flores marchitas retenidas apagan su floración. Pódalas de inmediato para ver nuevos brotes.'
    },
    botiquin: {
      title: 'Tu Botiquín de Autocompasión con Caléndula',
      uses: [
        {
          type: 'Compresa',
          instructions: 'Prepara una infusión de pétalos secos de caléndula, deja enfriar y aplícala en compresas sobre picaduras, quemaduras leves o piel irritada.'
        },
        {
          type: 'Tradicional',
          instructions: 'Coloca pétalos de caléndula secos en un frasco con aceite de oliva por 30 días al sol. Obtendrás un aceite calmante sublime para la piel.'
        },
        {
          type: 'Infusión',
          instructions: 'Toma una infusión suave de pétalos para calmar espasmos o inflamaciones internas suaves.'
        }
      ]
    },
    humanSpirit: 'Representa el abrazo reconfortante del autocuidado amoroso. Sus hermosos pétalos anaranjados te recuerdan tratar tus grietas físicas e íntimas con total compasión y ternura.',
    reciprocalCare: 'Requiere que limpies sus hojas bajeras amarillas de cuando en cuando y cortes sus flores viejas para permitirle brotar. Agradécele sus flores cosechando con regularidad.',
    lifeIntegration: {
      intro: 'La caléndula te permite elaborar bálsamos curativos amables que te enseñan a tocar, acariciar e hidratar las partes de ti que merecen cuidado diario.',
      practicalExample: 'El Óleato Sanador del Atardecer: Un bálsamo aceitoso dorado que cura la piel áspera, resequedades por estrés o quemaduras leves.',
      stepByStep: [
        'Colecta flores de caléndula abiertas con cuidado y déjalas secar en una servilleta fina a la sombra durante 3 días para deshacer la humedad y evitar moho.',
        'Introduce los pétalos enteros y deshidratados en un tarro de vidrio limpio y seco, y cúbrelos por completo con aceite vegetal de almendra, jojoba u oliva.',
        'Coloca el tarro cerrado en u rincón soleado de tu ventana durante 30 días cargatónicos de sol, sacudiéndolo cada mañana con un pensamiento positivo.',
        'Filtra el aceite con un colador fino y utilízalo para dar masajes circulares en tus manos cansadas de digitar, tus labios secos o zonas sensibles de tu cuerpo antes de dormir.'
      ]
    }
  },
  {
    id: 'aloe',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    emotionalGift: 'Protección y Límites Sanos',
    philosophy: 'El aloe es un guardián silencioso. Su apariencia robusta y protegida guarda en su interior un gel refrescante y sanador. Nos enseña que la verdadera fortaleza reside en proteger nuestra esencia suave.',
    benefits: [
      'Alivia quemaduras solares, rojeces e inflamaciones cutáneas con un frescor hidratante de alta absorción.',
      'Sana cicatrices físicas y absorbe impurezas gaseosas o contaminantes flotando en las habitaciones.',
      'Ayuda a restablecer el balance térmico de la piel y aporta resguardo energético sutil.'
    ],
    care: {
      watering: 'Muy escaso. Riega solo una vez al mes o cada 3 semanas. El encharcamiento pudre sus tubérculos velozmente.',
      light: 'Abundante luz tamizada o sol amable de la mañana. Sol directo abrasador puede quemar sus pencas dejándolas cafés.',
      soil: 'Mezcla muy arenosa, porosa, drenante (ideal con perlita y piedrecillas de río).',
      alert: 'Pencas blandas, arrugadas o lánguidas son signo directo de exceso de agua.'
    },
    botiquin: {
      title: 'Tu Botiquín de Protección con Aloe',
      uses: [
        {
          type: 'Tradicional',
          instructions: 'Corta una hoja exterior, retira la piel y las espinas laterales, enjuaga el cristal y aplícalo directo sobre la piel quemada o deshidratada.'
        },
        {
          type: 'Compresa',
          instructions: 'Usa una lámina delgada del cristal frío de aloe sobre los ojos cerrados por 10 minutos para descongestionar la mirada y relajar la mente.'
        }
      ]
    },
    humanSpirit: 'Es tu protector de silueta estoica y corazón cristalino. Te guía para defender tus fronteras internas de la invasión ajena sin perder tu frescura ni tu empatía dulce.',
    reciprocalCare: 'Pide que confíes en su asombrosa capacidad de guardar agua e hidratarse a sí mismo. Déjalo en paz, no lo satures de mimos líquidos ni de cambios frecuentes de sitio.',
    lifeIntegration: {
      intro: 'Aprende a usar el gel interior de su hoja madura para sanar los efectos térmicos de la sobreexposición y purificar el aire estancado.',
      practicalExample: 'El Compresor Regenerador de Ojos Cansados: Un ritual que calma instantáneamente la fatiga ocular ocasionada por pantallas digitales.',
      stepByStep: [
        'Corta una penca u hoja lateral madura bien abajo del nacimiento terrenal con un cuchillo filoso.',
        'Apoya la penca de forma vertical en un vaso con un poco de agua por 15 minutos para permitir que drene la aloína (la resina amarilla amarga que puede picar en la piel).',
        'Corta los extremos espinados laterales, desliza el cuchillo plano para quitar la piel exterior y extrae el gel cristalino inodoro.',
        'Saca dos rebanadas delgadas, refrigéralas un par de minutos y colócalas templadas sobre tus párpados cerrados mientras realizas respiraciones lentas durante 10 minutos.'
      ]
    }
  },
  {
    id: 'oregano',
    name: 'Orégano',
    scientificName: 'Origanum vulgare',
    emotionalGift: 'Arraigo e Instinto Práctico',
    philosophy: 'El orégano es humilde y tenaz. Crece al ras del suelo aromático, recordándonos que el bienestar comienza por tener los pies sobre la tierra. Aporta un cable a tierra contra la ansiedad y promueve la gratitud por lo simple.',
    benefits: [
      'Potente antimicrobiano, antifúngico y modulador natural de las defensas inmunitarias.',
      'Combate espasmos respiratorios y despeja mucosidades tensionales de las vías superiores.',
      'Ancla energéticamente los sentidos en el plano de la nutrición, el calor culinario y el disfrute rústico.'
    ],
    care: {
      watering: 'Bajo a moderado. Siente el sustrato seco hasta el dedo antes de darle agua foliar.',
      light: 'Sol vibrante o semisombra con amplia luz radiante de la tarde. Muy fuerte frente a corrientes de aire.',
      soil: 'Tierra áspera, arenosa, con excelente sistema de evacuación de agua.',
      alert: 'Hojas alargándose hacia arriba desatando tallos despoblados significa urgente necesidad de sol.'
    },
    botiquin: {
      title: 'Tu Botiquín de Arraigo con Orégano',
      uses: [
        {
          type: 'Infusión',
          instructions: 'Una infusión de hojas secas calma las molestias de garganta y ayuda a la digestión tras un día estresante.'
        },
        {
          type: 'Aroma',
          instructions: 'Inhala el vapor caliente de agua con hojas de orégano para abrir tus vías respiratorias y sentirte anclada y protegida.'
        }
      ]
    },
    humanSpirit: 'Es tu cable a tierra inquebrantable, devolviéndote la estabilidad y la nutrición sencilla de lo cotidiano cuando tus miedos se disparan al futuro.',
    reciprocalCare: 'Necesita aire libre, podas ligeras de sus ramas para ramificar más tupido y un suelo arenoso que no guarde lodo. No lo dejes en macetas ciegas sin drenaje.',
    lifeIntegration: {
      intro: 'Integra el orégano tanto en tus recetas reconfortantes como en tus prácticas de depuración de las vías respiratorias ante resfriados somáticos.',
      practicalExample: 'Los Vahos Clarificantes del Humo: Un ritual de purificación tradicional de vías aéreas cuando necesitas resetear tu pecho congestionado.',
      stepByStep: [
        'Pon a hervir un litro de agua pura en una olla pequeña en tu cocina hogareña.',
        'Al llegar al punto de ebullición, añade un manojo generoso de hojas y ramilletes de orégano recién desprendidos de tu maceta.',
        'Retira del fuego inmediatamente, coloca la olla de forma segura sobre tu bento o base de mesa, e inclina tu rostro sobre el vapor a unos 25 cm.',
        'Forma una carpa sobre tu cabeza con una toalla ligera, cierra tus párpados e inhala el vapor herbáceo de forma rítmica sintiendo cómo abren tus bronquios y te centran de vuelta a la tierra.'
      ]
    }
  }
];
