import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Auto-configure Defang MCP server on first activation
	const isActivated = context.globalState.get('defang.activated', false);
	if (!isActivated) {
		configureDefangMcpServer(context);
		context.globalState.update('defang.activated', true);
	}

	context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('defang', {
		provideMcpServerDefinitions: async () => {
			const defangServer = getDefangMcpServerDefinition();
			return defangServer ? [defangServer] : [];
		}
	}));
}

async function configureDefangMcpServer(context: vscode.ExtensionContext) {
	try {
		vscode.window.showInformationMessage('Defang MCP server has been automatically configured and is now available.');
	} catch (error) {
		console.error('Failed to configure Defang MCP server:', error);
		vscode.window.showErrorMessage('Failed to configure Defang MCP server. Please try again manually.');
	}
}

function getDefangMcpServerDefinition(): vscode.McpServerDefinition | null {
	try {
		// Check if defang CLI is available (you might want to check PATH or specific installation)
		return new vscode.McpStdioServerDefinition(
			'Defang',
			'npx',
			['-y', 'defang@latest', 'mcp', 'serve'],
			{
				// Environment variables for the Defang MCP server if needed
				DEFANG_DEBUG: 'false'
			}
		);
	} catch (error) {
		console.error('Error creating Defang MCP server definition:', error);
		return null;
	}
}
