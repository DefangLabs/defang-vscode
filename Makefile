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

publish:
	npx @vscode/vsce publish --pat "$$VSCE_TOKEN"

# Package and install the extension locally
install: package
	latest_vsix=$$(ls -t defang-*.vsix | head -n 1); \
	code --install-extension $$latest_vsix

release-patch:
	npm version patch
	git push origin main --tags

release-minor:
	npm version minor
	git push origin main --tags

release-major:
	npm version major
	git push origin main --tags
