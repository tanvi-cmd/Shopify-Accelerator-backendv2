
export function getAIProvider(){
  return process.env.AI_PROVIDER || 'claude';
}
