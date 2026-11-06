import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import type { Task } from "./model/task";
import { appendTask } from "./DB/test_DB.js";

const port = 3000;
const staticFiles = new Map<
  string,
  { file: URL; contentType: string }
>([
  ["/", { file: new URL("../public/index.html", import.meta.url), contentType: "text/html; charset=utf-8" }],
  ["/index.html", { file: new URL("../public/index.html", import.meta.url), contentType: "text/html; charset=utf-8" }],
  ["/style.css", { file: new URL("../public/style.css", import.meta.url), contentType: "text/css; charset=utf-8" }],
  ["/dist/index.js", { file: new URL("./index.js", import.meta.url), contentType: "text/javascript; charset=utf-8" }],
]);

function sendJson(response: ServerResponse, status: number, body: object): void {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readRequestBody(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  let length = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    length += buffer.length;

    if (length > 1_000_000) {
      throw new RangeError("Request body is too large.");
    }

    chunks.push(buffer);
  }

  return Buffer.concat(chunks).toString("utf8");
}

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const task = value as Record<string, unknown>;
  if (
    typeof task.id !== "string" ||
    typeof task.title !== "string" ||
    typeof task.description !== "string" ||
    typeof task.completed !== "boolean" ||
    typeof task.user !== "object" ||
    task.user === null
  ) {
    return false;
  }

  const user = task.user as Record<string, unknown>;
  return typeof user.id === "string" && typeof user.name === "string";
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;

  if (request.method === "POST" && pathname === "/tasks") {
    let body: string;

    try {
      body = await readRequestBody(request);
    } catch (error) {
      const tooLarge = error instanceof RangeError;
      sendJson(response, tooLarge ? 413 : 400, {
        error: tooLarge ? "Request body is too large." : "Could not read request body.",
      });
      return;
    }

    let task: unknown;
    try {
      task = JSON.parse(body);
    } catch {
      sendJson(response, 400, { error: "Request body must be valid JSON." });
      return;
    }

    if (!isTask(task)) {
      sendJson(response, 400, { error: "Request body must contain a valid task." });
      return;
    }

    try {
      await appendTask(task);
      sendJson(response, 201, { saved: true });
    } catch (error) {
      console.error("Failed to write task JSON file:", error);
      sendJson(response, 500, { error: "Could not save the task." });
    }

    return;
  }

  if (request.method === "GET") {
    const staticFile = staticFiles.get(pathname);
    if (staticFile) {
      try {
        const contents = await readFile(staticFile.file);
        response.writeHead(200, { "Content-Type": staticFile.contentType });
        response.end(contents);
      } catch (error) {
        console.error("Failed to read static file:", error);
        response.writeHead(500);
        response.end("Could not load the requested file.");
      }
      return;
    }
  }

  sendJson(response, 404, { error: "Not found." });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Task Flow server is running at http://127.0.0.1:${port}`);
});
