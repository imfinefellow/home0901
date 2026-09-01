import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", company: "르네상스 (Renaissance)", location: "충청남도 천안시" });
});

// 1. AI Easy-Read Plain Language Converter (AI 쉬운 글 변환기)
app.post("/api/ai/easy-read", async (req, res) => {
  try {
    const { originalText, targetAudience = "senior_disabled" } = req.body;
    if (!originalText || typeof originalText !== "string" || !originalText.trim()) {
      return res.status(400).json({ error: "변환할 텍스트를 입력해주세요." });
    }

    const ai = getAIClient();
    if (!ai) {
      // Fallback rule-based plain explanation if API key is not yet set
      return res.json({
        success: true,
        isFallback: true,
        simplifiedTitle: "쉬운 글 요약 결과",
        summaryPoints: [
          "핵심 내용을 알기 쉽게 세 가지로 요약했습니다.",
          "어려운 전문 용어나 한자어 대신 쉬운 우리말로 고쳤습니다.",
          "이해하기 쉽도록 문장을 짧고 명확하게 나누었습니다."
        ],
        easyText: `[쉬운 말로 읽기]\n\n${originalText.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 3).join('\n\n')}\n\n* 본 내용은 노인 및 발달장애인 분들이 쉽게 이해할 수 있도록 정리된 글입니다.`,
        vocabularyHelp: [
          { word: "접근성", meaning: "모든 사람이 불편함 없이 이용할 수 있는 편리함" },
          { word: "배리어프리", meaning: "문턱이나 계단 등 장애물을 없애는 것" }
        ]
      });
    }

    const systemPrompt = `당신은 노인과 장애인(발달장애인, 인지장애인, 저시력자 등)을 위해 복잡하고 어려운 문서를 '알기 쉬운 한국어(Easy-Read/Plain Language)'로 변환해주는 르네상스(Renaissance)의 AI 접근성 전문가입니다.
다음 원칙을 철저히 지키세요:
1. 문장은 20자 내외로 짧고 명확하게 만드세요.
2. 어려운 행정용어, 한자어, 외국어, 피동형 표현을 가장 쉬운 일상 단어로 순화하세요.
3. 번호나 글머리 기호(불릿)를 적극 활용하여 핵심 행동/정보를 명확히 제시하세요.
4. 반드시 유효한 JSON 형식으로만 응답하세요.`;

    const prompt = `다음 원문 텍스트를 분석하여 노인과 장애인이 한눈에 이해할 수 있도록 쉽게 변환해주세요:

[원문]
${originalText}

응답 형식 (JSON):
{
  "simplifiedTitle": "한 줄로 요약한 쉬운 제목",
  "summaryPoints": [
    "가장 중요한 핵심 내용 1 (쉬운 문장)",
    "핵심 내용 2",
    "핵심 내용 3"
  ],
  "easyText": "전체 내용을 초등 저학년 수준으로 아주 쉽고 친절하게 풀어쓴 본문",
  "vocabularyHelp": [
    { "word": "어려운단어1", "meaning": "쉬운 뜻풀이" },
    { "word": "어려운단어2", "meaning": "쉬운 뜻풀이" }
  ],
  "actionTip": "사용자가 당장 해야 할 일이나 주의사항 (예: 신분증 챙겨서 천안시청 방문하기)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error("Easy-read API error:", error);
    res.status(500).json({
      error: "쉬운 글 변환 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
});

// 2. AI Barrier-Free Counselor & Welfare Consultant (AI 배리어프리 & 복지 상담기)
app.post("/api/ai/consult", async (req, res) => {
  try {
    const { question, category = "general", history = [] } = req.body;
    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "질문 내용을 입력해주세요." });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.json({
        success: true,
        isFallback: true,
        answer: `안녕하세요! 르네상스(Renaissance) AI 배리어프리 도우미입니다.\n\n문의하신 "${question}"에 대한 기본 안내입니다.\n\n1. **천안시 복지 지원**: 천안시 관내 장애인 휠체어 수리비 지원, 노인 맞춤돌봄 서비스, 배리어프리 나들이 이동 지원 등 다양한 혜택이 제공됩니다.\n2. **신청 및 문의처**: 관할 천안시 행정복지센터(읍·면·동 주민센터) 또는 보건복지상담센터(129), 천안시장애인종합복지관으로 문의하시면 상세히 안내받으실 수 있습니다.\n\n르네상스는 인공지능 기술로 소외 없는 사회를 위해 노력하고 있습니다.`,
        relatedLinks: [
          { title: "천안시 복지포털", url: "https://www.cheonan.go.kr" },
          { title: "보건복지상담센터 129", url: "https://www.129.go.kr" }
        ],
        followUpQuestions: [
          "천안시 전동휠체어 무료 급속충전기 위치는 어디인가요?",
          "노인 장기요양보험 등급 신청 절차가 궁금해요.",
          "시각장애인을 위한 인공지능 보조기기 지원이 있나요?"
        ]
      });
    }

    const systemPrompt = `당신은 천안시에 위치한 배리어프리 소셜벤처 '르네상스 (Renaissance)'의 인공지능 복지·접근성 전문 컨설턴트입니다.
노인, 장애인(지체/시각/청각/발달/뇌병변 등), 보호자, 자원봉사자들의 질문에 매우 따뜻하고 존중하며 이해하기 쉬운 어조로 답변하세요.
천안시 관내 복지 인프라(천안시장애인종합복지관, 천안시니어클럽, 천안역 배리어프리 편의시설, 저상버스, 장애인콜택시 등) 및 국가 복지정책을 잘 파악하고 있습니다.
응답은 JSON 형식으로 다음 구조를 제공하세요:
{
  "answer": "친절하고 체계적인 마크다운 형식의 답변 (소제목, 글머리기호 활용)",
  "keyHighlights": ["핵심 요약 1", "핵심 요약 2", "핵심 요약 3"],
  "contactInfo": "관련 문의처나 담당 기관 안내 (예: 천안시청 노인장애인과, 129 복지콜센터)",
  "followUpQuestions": ["추천 추가 질문 1", "추천 추가 질문 2"]
}`;

    const contents = [
      ...history.map((h: any) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      })),
      {
        role: "user",
        parts: [{ text: `[사용자 질문]\n${question}` }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents as any,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error("Consult API error:", error);
    res.status(500).json({
      error: "상담 처리 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
});

// 3. AI Accessibility Alt-Text & Screen Reader Description
app.post("/api/ai/describe-image", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg" } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "이미지 데이터가 필요합니다." });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.json({
        success: true,
        isFallback: true,
        shortAlt: "천안 르네상스 배리어프리 플랫폼 안내 이미지",
        detailedDescription: "노인과 장애인을 위한 편의시설 및 인공지능 지원 인터페이스를 담은 사진입니다.",
        detectedText: "르네상스 배리어프리 AI",
        accessibilityTips: "이미지의 주요 색상 대비가 양호하며 시각 장애인을 위한 대체 텍스트가 필요합니다."
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType,
            },
          },
          {
            text: `시각장애인을 위한 스크린리더 대체 텍스트(Alt Text) 및 상세 화면 해설을 JSON 형식으로 작성해주세요:
{
  "shortAlt": "1~2문장의 명확한 대체 텍스트 (스크린리더용)",
  "detailedDescription": "시각장애인이 공간 구성, 인물 표정, 주요 물체, 분위기를 생생하게 상상할 수 있는 상세 화면 해설",
  "detectedText": "이미지 내에 적힌 글자(간판, 표지판 등) 추출",
  "barrierFreeEvaluation": "해당 환경의 휠체어 접근성이나 안전 요소에 대한 분석 (경사로, 턱, 점자블록 유무 등)"
}`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error("Describe image API error:", error);
    res.status(500).json({
      error: "이미지 분석 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
});

// Vite / Static Server integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Renaissance Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
