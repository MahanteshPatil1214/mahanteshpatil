export type StackLayer = {
  index: string;
  title: string;
  note: string;
  items: string[];
};

export const stackLayers: StackLayer[] = [
  {
    index: "01",
    title: "Systems & Backend",
    note: "Service boundaries, event contracts, and runtimes that survive production.",
    items: [
      "Java 21",
      "Spring Boot",
      "Spring Cloud",
      "Kafka",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    index: "02",
    title: "Data & Spatial",
    note: "Storage chosen for the shape of the query, not the shape of the hype.",
    items: ["PostgreSQL", "PostGIS", "Neo4j", "Redis"],
  },
  {
    index: "03",
    title: "AI Engineering",
    note: "Agent workflows with evidence gates, local inference, and retrieval that can be inspected.",
    items: ["LangGraph", "Spring AI", "Ollama", "pgvector"],
  },
  {
    index: "04",
    title: "Interfaces",
    note: "The last mile: fast, accessible surfaces that make the system legible.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export const terminalStats = [
  {
    key: "location",
    value: "Kalaburagi, Karnataka, IN · UTC+05:30",
  },
  {
    key: "focus",
    value: "distributed backends · LLM agents · product engineering",
  },
  {
    key: "surface",
    value: "12-service platform · 4 AI systems · end-to-end products",
  },
  {
    key: "latency",
    value: "~1.5s cited answer path · event-driven backends",
  },
  {
    key: "status",
    value: "available for software & AI roles",
  },
];
