# Surfer
funny ~~web framework~~ "High-quality open-source software for web developers."

please use bun

## Planning
### Done
- abuse AsyncLocalStorage to create laravel-like facade
  - need some scoping mechanics
- use decorator metadata to do service container (adonis does this i think)
  - might really need to do codegen because experimentalDecorator

### Not yet
- use solidjs-like runtime directly to update dom
- Filament-like form builder but js
  - endpoint
    - crud
    - pagination
    - relation
  - actual html form: probably some ~~svelte~~ RSC
- Livewire thingy???
  - but this is JS and we have rsc
  - livewire 4 is basically some rsc stuff + htmx
- vite integration...
