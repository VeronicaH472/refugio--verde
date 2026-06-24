import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // Server-side Gemini initialization
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } else {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
  }

  // API Endpoint: Verónica AI Reflection
  app.post("/api/veronica/reflect", async (req, res) => {
    try {
      const {
        userName,
        intention,
        whyRefugio,
        moduleId,
        moduleTitle,
        promptQuestion,
        userAnswer,
        selectedPlantsNames
      } = req.body;

      if (!userAnswer || userAnswer.trim() === "") {
        return res.status(400).json({ error: "El registro de bitácora no puede estar vacío." });
      }

      if (!ai) {
        // Fallback friendly response if API keys are not ready yet
        return res.json({
          response: `¡Hola ${userName || 'querida compañera'}! Qué hermosa reflexión has registrado en tu bitácora sobre el primer módulo. Aunque en este momento mi canal sutil de IA no está conectado a una clave de sabiduría, siente mi abrazo. Tus plantas aliadas (${(selectedPlantsNames && selectedPlantsNames.length > 0) ? selectedPlantsNames.join(', ') : 'tus primeras aliadas'}) captan tu intención de cultivar ${intention || 'bienestar'}. Sigue respirando paso a paso, hoja a hoja. Verónica.`
        });
      }

      const plantsContext = (selectedPlantsNames && selectedPlantsNames.length > 0)
        ? `Las plantas que ha elegido para acompañar su recorrido son: ${selectedPlantsNames.join(', ')}.`
        : "Aún está en proceso de elegir sus plantas aliadas.";

      const promptText = `
Hola Gemini. Actúa como Verónica, la mentora y creadora espiritual de Refugio Verde™ e impulsora del Método Alquimia Verde™ en su proyecto "Mi Jardín Alquímico - donde sanar es crecer".

Verónica es una mujer con una voz sumamente cálida, sabia, poética, empática y profundamente conectada con los ritmos de la naturaleza. Sus palabras deben transmitir calma, quitar las prisas, y animar con mucho afecto a la persona. Ella utiliza metáforas de las plantas (raíces, brotes, riego, paciencia, el florecimiento que toma tiempo) para ayudar a la persona a comprender que al cuidar de la planta, se cuida a sí misma.

Datos del usuario actual:
- Nombre: ${userName || 'Compañera de Refugio'}
- Intención declarada para este viaje (lo que desea cultivar en su vida): ${intention || 'Bienestar'}
- Por qué decidió crear su Refugio Verde: "${whyRefugio || 'Para volver a conectar conmigo misma y con la vida'}"
- Módulo del programa actual: ${moduleId} (${moduleTitle || ''})
- Pregunta del diario contestada: "${promptQuestion || ''}"
- Lo que el usuario ha escrito en su diario (Bitácora): "${userAnswer}"
- Contexto de plantas: ${plantsContext}

Por favor, escribe una respuesta directa y personalizada dirigida al usuario, firmada por Verónica.
Pautas para tu escritura (como Verónica):
1. Saluda con cariño llamándole por su nombre (ej. "Querida ${userName || 'compañera'}").
2. Valora y valida profundamente su respuesta al diario, conectando su sentir interior con la sabiduría de la naturaleza o las plantas que eligió.
3. Brinda un consejo suave y amoroso del "Método Alquimia Verde™" basado en la etapa actual. Usa palabras alentadoras.
4. Mantén el tono pausado, sereno, profundamente poético y humano.
5. Evita tecnicicismos de agricultura fría. La jardinería aquí es Alquímica y sanadora.
6. Limita la respuesta a un máximo de 2 o 3 párrafos medianos, de modo que parezca un hermoso y sincero mensaje de una carta manuscrita.
7. Termina con una frase integradora con su intención de cultivar ${intention || 'bienestar'} y tu firma clásica: "Con amor y paciencia, Verónica | Mi Jardín Alquímico".
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
      });

      const reflection = response.text || "No se pudo generar la reflexión. Inténtalo de nuevo.";
      res.json({ response: reflection });

    } catch (error: any) {
      console.error("Error in Gemini API call:", error);
      res.status(500).json({ error: "Error interno del servidor al consultar a Verónica." });
    }
  });

  // Serve static assets or use Vite in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYS] Refugio Verde fullstack server running in development or container env.`);
    console.log(`[SYS] Listening on http://localhost:${PORT}`);
  });
}

startServer();
