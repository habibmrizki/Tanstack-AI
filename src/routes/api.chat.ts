import { createFileRoute } from "@tanstack/react-router";
import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { openRouterText } from "@tanstack/ai-openrouter";

const model = openRouterText("google/gemini-2.0-flash-001");

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = await request.json();
        const messages = json.messages;
        const conversationId = json.data?.conversationId;

        try {
          console.log(
            "Pesan diterima, jumlah part:",
            messages[messages.length - 1].parts.length,
          );

          const stream = chat({
            adapter: model,
            messages: messages,
            conversationId: conversationId,
          });

          return toServerSentEventsResponse(stream);
        } catch (error: any) {
          console.error("OpenRouter Error:", error.message);
          return Response.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 },
          );
        }
      },
    },
  },
});
