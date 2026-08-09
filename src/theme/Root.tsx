import type { ReactNode } from "react";
import { useEffect } from "react";

type ToolResult = {
  content: Array<{
    type: "text";
    text: string;
  }>;
};

type ModelContextTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
  };
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
};

type ModelContext = {
  registerTool: (
    tool: ModelContextTool,
    options?: { signal?: AbortSignal },
  ) => Promise<void>;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const contentResources = {
  apiCatalog: "https://icodex.me/.well-known/api-catalog",
  agentSkills: "https://icodex.me/.well-known/agent-skills/index.json",
  rss: "https://icodex.me/rss.xml",
  sitemap: "https://icodex.me/sitemap.xml",
} as const;

export default function Root({ children }: { children: ReactNode }) {
  useEffect(() => {
    const modelContext = navigator.modelContext;
    if (!modelContext?.registerTool) return;

    const controller = new AbortController();
    const options = { signal: controller.signal };

    void modelContext
      .registerTool(
        {
          name: "search_icodex_articles",
          description:
            "Search icodex for public frontend and AI engineering articles.",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search terms for the icodex article index.",
                minLength: 1,
                maxLength: 200,
              },
            },
            required: ["query"],
            additionalProperties: false,
          },
          execute: async (input) => {
            const query = String(input.query ?? "").trim();
            if (!query) {
              throw new TypeError("query must not be empty");
            }

            const searchUrl = new URL("/search", window.location.origin);
            searchUrl.searchParams.set("q", query);
            window.location.assign(searchUrl);

            return {
              content: [
                {
                  type: "text",
                  text: `Opened icodex search results for: ${query}`,
                },
              ],
            };
          },
        },
        options,
      )
      .catch(() => undefined);

    void modelContext
      .registerTool(
        {
          name: "discover_icodex_content",
          description:
            "Return the public icodex RSS feed, sitemap, API catalog, and Agent Skills index.",
          inputSchema: {
            type: "object",
            properties: {},
            additionalProperties: false,
          },
          annotations: {
            readOnlyHint: true,
          },
          execute: async () => ({
            content: [
              {
                type: "text",
                text: JSON.stringify(contentResources),
              },
            ],
          }),
        },
        options,
      )
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return <>{children}</>;
}
