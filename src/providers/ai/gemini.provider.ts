
import { AIProvider } from './ai-provider';
export class GeminiProvider implements AIProvider {
  async generate(prompt:string){ return `Gemini: ${prompt}`; }
}
