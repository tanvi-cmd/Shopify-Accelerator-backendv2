
import { AIProvider } from './ai-provider';
export class ClaudeProvider implements AIProvider {
  async generate(prompt:string){ return `Claude: ${prompt}`; }
}
