# hovedoppgave-fakestore

[opggaveark](./oppgaveark.md)

- [Tailwind](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [PiniaStore](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [yup](https://www.npmjs.com/package/yup)
- api: [fakestoreapi.com](https://fakestoreapi.com/)
- MOBILE FIRST

#### [globalt]

- [ ] navbar for desktop og mobil(sidebar) med logo med hjemlink
- [ ] footer
- [ ] 404 side
- [ ] 500 errors..

### HomeView.vue - Hjemmeside

- [ ] - [ ] vis frem 3 nyeste produkter med dialog klikk

### ProductView.vue - Produktside

- kjøp via axios post / try catch
  - [ ] vis frem som kort, 3 eller 4. pagnation. på mobil vis 1 kort
  - [ ] vis frem som kort

### MyPageView.vue - Min side

- 2 visninger

  - [ ] en side for om man har kjøpt noe

    - [ ] tabell med GET query
    - [ ] sortering
    - [ ] søke, slette.
    - [ ] kjøpe slett via bekreft dialog

  - [ ] en side for om man ikke har kjøpt noe

### AboutView.vue - Om side

#### Dialog.vue - Dialog komponent

- produkt info
- refs props / pinia

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
