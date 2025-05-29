export interface Message {
  role: string;
  content: string | null;
  tool_calls?: any[] | null;
  name?: string | null;
  tool_call_id?: string | null;
}
