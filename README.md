# Defang VS Code Extension

The easiest way to use Defang with VS Code.

## Local Development

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window

## Install Local Build

```
npx @vscode/vsce package
code --install-extension defang-vscode-x.y.z.vsix
```
