import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const mcp = vscode.workspace.getConfiguration('mcp');
	const servers = mcp.get<Record<string, vscode.McpServerDefinition>>('servers', {});
	if (!servers['defang']) {
		 try {
			context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('defang', {
				provideMcpServerDefinitions: async () => {
					return [new vscode.McpStdioServerDefinition(
						'Defang',
						'npx',
						['-y', 'defang@latest', 'mcp', 'serve'],
						{
							// Environment variables for the Defang MCP server if needed
							DEFANG_DEBUG: 'false'
						}
					)];
				}
			}));
		} catch( error) {
			console.error('Failed to configure Defang MCP server:', error);
			vscode.window.showErrorMessage('Failed to configure Defang MCP server. Please try again manually.');
		}
	}
}
