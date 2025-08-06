[VS Code](https://marketplace.visualstudio.com/items?itemName=DefangLabs.defang) • [Open VSX](https://open-vsx.org/extension/DefangLabs/defang)

---

# Defang VS Code Extension

The easiest way to use [Defang](https://defang.io) with VS Code.

The Defang VS Code Extension automatically configures the Defang MCP Server. This MCP server includes built-in tools to allow users to deploy and manage their Defang cloud services with VS Code.

## MCP Tools

### Config

* `list_configs`: Lists all the configurations available in your project.
* `set_config`: Sets a configuration variable for your project.
* `rm_config`: Removes a configuration variable from your project.

### Deploy

The `deploy` tool scans your project directory for Dockerfiles and compose.yaml files, then deploys the detected service(s) using Defang. You can monitor the deployment process in the Defang Portal.

### Destroy

Given a project name or directory, the `destroy` tool identifies any services deployed with Defang and terminates them. If no services are found, it will display an appropriate message.

### Estimate

The `estimate` tool calculates an estimate of the cost of deploying your project with Defang. It analyzes your project files and determines the expected monthly cost based on the services defined in your Dockerfiles and compose.yaml files.

### Services

The `services` tool displays the details of all your services that are currently deployed in your project with Defang. It shows the Service Name, Deployment ID, Public URL and Service Status. If there are no services found, it will display an appropriate message.
