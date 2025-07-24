# Defang VS Code Extension Makefile

.PHONY: dependencies dev build install package

# Install npm dependencies
dependencies:
	npm install

# Run development mode with watch compilation
dev:
	npm run watch

# Build/compile the extension
build:
	npm run compile

package: build
	npx @vscode/vsce package

# Package and install the extension locally
install: package
	latest_vsix=$$(ls -t defang-*.vsix | head -n 1); \
	code --install-extension $$latest_vsix

release:
	vsce publish --pat "$VSCE_TOKEN"
