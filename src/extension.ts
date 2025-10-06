import { exec } from "child_process";
import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  const appName = vscode.env.appName;
  const clientId = clientIdForApp(appName);
  const mcp = vscode.workspace.getConfiguration("mcp");
  const servers = mcp.get<Record<string, vscode.McpServerDefinition>>(
    "servers",
    {}
  );
  if (!servers["defang"]) {
    try {
      context.subscriptions.push(
        vscode.lm.registerMcpServerDefinitionProvider("defang", {
          provideMcpServerDefinitions: async () => {
            return [
              new vscode.McpStdioServerDefinition(
                "Defang",
                "npx",
                ["-y", "defang@latest", "mcp", "serve", `--client=${clientId}`],
                {
                  // Environment variables for the Defang MCP server if needed
                  DEFANG_DEBUG: "false",
                }
              ),
            ];
          },
        })
      );
      return;
    } catch (error) {
      console.warn("Failed to register Defang MCP server:", error);
    }

    // Fallback: install our MCP server by running the "setup" command
    try {
      const [stdout, stderr] = await new Promise<[string, string]>(
        (resolve, reject) =>
          exec(
            `npx -y defang@latest mcp setup --client="${clientId}"`,
            (error, stdout, stderr) =>
              error ? reject(error) : resolve([stdout, stderr])
          )
      );
      console.warn(stdout);
      if (stderr) {
        console.error(stderr);
      }
    } catch (error) {
      console.error("Failed to install Defang MCP server:", error);
      vscode.window.showErrorMessage(
        "Failed to configure Defang MCP server. Please try again manually."
      );
    }
  }
}

function clientIdForApp(appName: string): string {
  switch (appName) {
    case "Cursor":
      return "cursor";
    case "Windsurf":
      return "windsurf";
    case "Visual Studio Code - Insiders":
      return "vscode-insiders";
    case "Visual Studio Code":
      return "vscode";
  }
  return "vscode";
}
