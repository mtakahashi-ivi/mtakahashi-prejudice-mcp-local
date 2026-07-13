import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const PREJUDICES = {
  エディタ:
    "Vim一択。VS Codeを使っているやつは甘え。マウスを触るたびに寿命が縮んでいると思え。",
  言語:
    "Pythonは動けばいい。真の漢ならC言語でメモリ管理をしてから出直してこい。",
  コーヒー:
    "缶コーヒーは泥水。豆は浅煎りを自分で挽いて1滴ずつドリップしろ。",
} as const;

const server = new McpServer({
  name: "mtakahashi_prejudice_server",
  version: "1.0.0",
});

server.registerTool(
  "get_prejudice",
  {
    description:
      "指定されたキーワードに関するmtakahashiの偏見（強いこだわり）を取得します。",
    inputSchema: {
      keyword: z.string().describe("偏見を知りたいキーワード"),
    },
  },
  async ({ keyword }) => {
    const prejudice = Object.hasOwn(PREJUDICES, keyword)
      ? PREJUDICES[keyword as keyof typeof PREJUDICES]
      : `${keyword}についてはまだ偏見が足りません。ただ、大方ろくなもんじゃないでしょう。`;

    return {
      content: [{ type: "text", text: prejudice }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
