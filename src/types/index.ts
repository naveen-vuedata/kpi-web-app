
/* ----------------------------- Types ----------------------------- */
export type KPIBlock = {
  type: "kpi";
  data: { metrics: { label: string; value: string | number }[] };
};

export type ChartBlock = {
  type: "chart";
  data: {
    chartType: "line" | "bar" | "pie";
    data: Record<string, any>[];
    xKey: string;
    yKey?: string;
  };
};

export type TableBlock = {
  type: "table";
  data: { columns: { key: string; label: string }[]; rows: Record<string, any>[] };
};

export type ListBlock = { type: "list"; data: { items: string[] } };
export type TextBlock = { type: "text"; data: { value: string } };
export type StatBlock = { type: "stat"; data: { label: string; value: string | number } };
export type CustomBlock = { type: "custom"; data: Record<string, any> };

export type PayloadBlock = KPIBlock | ChartBlock | TableBlock | ListBlock | TextBlock | StatBlock | CustomBlock;

export interface ChatPayload {
  blocks: PayloadBlock[];
}

export interface MessageDetail {
  role: "assistant" | "user";
  content: string;
  payload?: ChatPayload;
}
export type ChatHistory={
    session_id:string,
    message_count:number,
    messages:MessageDetail[]
}