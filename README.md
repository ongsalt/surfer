# Surfer
funny web framework

please use bun

## Planning
- abuse AsyncLocalStorage to create laravel-like facade
  - need some scoping mechanics
- use decorator metadata to do service container (adonis does this i think)
  - might really need to do codegen because experimentalDecorator
- Filament-like form builder but js
  - endpoint
    - crud
    - pagination
    - relation
  - actual html form: probably some ~~svelte~~ RSC
- Livewire thingy???
  - but this is JS and we have rsc
  - livewire 4 is basically some rsc stuff + htmx
- Database: fuck you, do it yourself
- auth: also fuck you
- vite integration...
