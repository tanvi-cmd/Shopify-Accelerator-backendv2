
import { AIProvider } from './ai-provider';
export class AntigravityProvider implements AIProvider {
  async generate(prompt:string){ return `Antigravity: ${prompt}`; }
}
