export const EXPRESSIONS = [
  {
    id: "affection",
    rasa: "Shringara",
    label: "Affection",
    nose: [247, 194],
    cheeks: [205, 198, 293, 197],
  },
  {
    id: "joy",
    rasa: "Hasya",
    label: "Joy",
    nose: [232, 183],
    cheeks: [186, 194, 279, 177],
  },
  {
    id: "sadness",
    rasa: "Karuna",
    label: "Sadness",
    eyes: [200, 161, 264, 146],
    nose: [232, 191],
    cheeks: [187, 200, 278, 181],
  },
  {
    id: "anger",
    rasa: "Raudra",
    label: "Anger",
    eyes: [209, 162, 279, 157],
    nose: [248, 201],
    cheeks: [202, 195, 297, 192],
  },
  {
    id: "wonder",
    rasa: "Adbhuta",
    label: "Wonder",
    eyes: [211, 146, 283, 144],
    nose: [245, 196],
    cheeks: [199, 193, 292, 192],
  },
  {
    id: "fear",
    rasa: "Bhayanaka",
    label: "Fear",
    nose: [249, 196],
    cheeks: [202, 194, 296, 194],
  },
  {
    id: "disgust",
    rasa: "Bibhatsa",
    label: "Disgust",
    nose: [235, 192],
    cheeks: [187, 193, 283, 185],
  },
  {
    id: "courage",
    rasa: "Veera",
    label: "Courage",
    nose: [250, 198],
    cheeks: [204, 198, 299, 188],
  },
  {
    id: "calm",
    rasa: "Shanta",
    label: "Calm",
    nose: [245, 195],
    cheeks: [198, 190, 295, 188],
  },
] as const;

export type ExpressionId = (typeof EXPRESSIONS)[number]["id"];

export const PORTRAIT_TOOLS = [
  {
    id: "slap",
    label: "Slap",
    action: "Slap my photo",
    reactions: ["wonder", "anger", "sadness"],
  },
  {
    id: "pinch",
    label: "Pinch",
    action: "Pinch my cheek",
    reactions: ["wonder", "anger", "disgust"],
  },
  {
    id: "punch",
    label: "Boxing glove",
    action: "Punch my photo",
    reactions: ["anger", "sadness"],
  },
  {
    id: "tickle",
    label: "Feather",
    action: "Tickle my photo",
    reactions: ["joy"],
  },
  {
    id: "flower",
    label: "Flower",
    action: "Give me a flower",
    reactions: ["affection", "calm"],
  },
  {
    id: "spider",
    label: "Spider",
    action: "Show me the spider",
    reactions: ["fear", "disgust", "courage"],
  },
] as const satisfies readonly {
  id: string;
  label: string;
  action: string;
  reactions: readonly ExpressionId[];
}[];

export type PortraitToolId = (typeof PORTRAIT_TOOLS)[number]["id"];

export function getPortraitReaction(toolId: PortraitToolId, uses: number) {
  if (!Number.isInteger(uses) || uses < 1) {
    throw new RangeError("Portrait tool use count must be a positive integer.");
  }
  const tool = PORTRAIT_TOOLS.find((item) => item.id === toolId);
  if (!tool) throw new Error(`Unknown portrait tool: ${toolId}`);
  return {
    expression: tool.reactions[(uses - 1) % tool.reactions.length],
    redness:
      toolId === "pinch"
        ? Math.min(0.25 + uses * 0.12, 0.75)
        : toolId === "slap" || toolId === "punch"
          ? Math.min(uses * 0.12, 0.45)
          : 0,
    bleeding: toolId === "punch" && uses >= 3,
    tears: toolId === "slap" || toolId === "punch",
  };
}
