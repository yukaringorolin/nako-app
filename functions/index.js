const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");
const { Translate } = require("@google-cloud/translate").v2;

admin.initializeApp();

const translate = new Translate();
const TARGET_LANGUAGES = {
  en: "en",
  jp: "ja",
  mm: "my"
};

exports.translateDiary = onRequest(
  {
    region: "asia-southeast1",
    timeoutSeconds: 30,
    memory: "256MiB",
    maxInstances: 5
  },
  async (request, response) => {
    response.set("Cache-Control", "no-store");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ ok: false, error: "Method not allowed" });
      return;
    }

    try {
      await verifyFirebaseAuth(request);

      const text = String(request.body?.text || "").trim();
      const dateKey = String(request.body?.dateKey || "").trim();

      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
        response.status(400).json({ ok: false, error: "Invalid dateKey" });
        return;
      }

      if (!text) {
        response.status(400).json({ ok: false, error: "Text is required" });
        return;
      }

      if (text.length > 5000) {
        response.status(400).json({ ok: false, error: "Text is too long" });
        return;
      }

      const sourceLanguage = await detectLanguage(text);
      const translations = await translateToTargets(text, sourceLanguage);

      response.status(200).json({
        ok: true,
        dateKey,
        sourceLanguage,
        translations
      });
    } catch (error) {
      const status = error.statusCode || 500;
      if (status >= 500) logger.error("Diary translation failed", error);
      response.status(status).json({
        ok: false,
        error: status >= 500 ? "Translation service unavailable" : error.message
      });
    }
  }
);

async function verifyFirebaseAuth(request) {
  const authHeader = request.get("authorization") || "";
  const match = authHeader.match(/^Bearer (.+)$/i);

  if (!match) {
    const error = new Error("Missing Firebase Auth token");
    error.statusCode = 401;
    throw error;
  }

  try {
    return await admin.auth().verifyIdToken(match[1]);
  } catch (cause) {
    const error = new Error("Invalid Firebase Auth token");
    error.statusCode = 401;
    error.cause = cause;
    throw error;
  }
}

async function detectLanguage(text) {
  const [detection] = await translate.detect(text);
  if (Array.isArray(detection)) return detection[0]?.language || "";
  return detection?.language || "";
}

async function translateToTargets(text, sourceLanguage) {
  const translations = {};
  await Promise.all(Object.entries(TARGET_LANGUAGES).map(async ([appKey, target]) => {
    if (sourceLanguage && sourceLanguage.toLowerCase() === target) {
      translations[appKey] = text;
      return;
    }

    const [translated] = await translate.translate(text, target);
    translations[appKey] = Array.isArray(translated) ? translated[0] : translated;
  }));
  return translations;
}
