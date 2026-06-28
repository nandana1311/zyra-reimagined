Dev environment (Docker)

Quick start (build once, run many times):

1) Build and start the dev container (this will populate the `node_modules` named volume on first run):

```bash
docker compose -f docker-compose.dev.yml up --build
```

2) Stop the container:

```bash
docker compose -f docker-compose.dev.yml down
```

Notes:
- The compose file mounts your source into the container for live reload and uses a named volume `node_modules` to persist installed dependencies so you don't have to reinstall each time.
- Ensure Docker is installed and running on your machine.
- If you prefer VS Code remote containers, we can add a `.devcontainer` config next.
