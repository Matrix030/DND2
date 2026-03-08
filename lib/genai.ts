import { GoogleGenAI } from '@google/genai';

let instance: GoogleGenAI | null = null;

export function getGenAI(): GoogleGenAI {
  if (!instance) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY');
    instance = new GoogleGenAI({ apiKey });
  }
  return instance;
}
