# Server
## Install Deno
Install the newest version of deno according to: 
https://deno.land/manual@main/getting_started/installation

## Production
Run server for production
```
deno run --allow-net --allow-write --allow-read mod.ts
```

## Development
Run server for development
```
deno run --allow-net --allow-write --allow-read --watch --unstable mod.ts
```