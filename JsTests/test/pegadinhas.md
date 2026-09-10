Recurso: `process.nextTick()`
- Quando roda: logo apos o codigo atual terminar, antes do event loop seguir.
- Prioridade: mais alta.
- Uso comum: ajuste interno muito imediato no Node.
- Exemplo: `process.nextTick(() => console.log('nextTick'))`

Recurso: `Promise.resolve().then(...)`
- Quando roda: na fila de microtasks, depois de `nextTick`.
- Prioridade: alta.
- Uso comum: adiar algo de forma padrao no JavaScript.
- Exemplo: `Promise.resolve().then(() => console.log('promise'))`

Recurso: `setTimeout(fn, 0)`
- Quando roda: fase de timers.
- Prioridade: media.
- Uso comum: agendar para "depois", com semantica de timer.
- Exemplo: `setTimeout(() => console.log('timeout'), 0)`

Recurso: `setImmediate(fn)`
- Quando roda: fase `check` do event loop.
- Prioridade: media.
- Uso comum: rodar no proximo ciclo, comum no Node apos I/O.
- Exemplo: `setImmediate(() => console.log('immediate'))`

Exemplo completo:

```js
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
```

Saida tipica no Node:

```txt
nextTick
promise
timeout // ou immediate
immediate // ou timeout
```

Resumo:
- `nextTick` ocorre antes de tudo isso.
- `Promise.then()` vem logo depois.
- `setTimeout(0)` e `setImmediate()` podem trocar de ordem no fluxo principal.
- Dentro de callback de I/O, `setImmediate()` normalmente vem antes de `setTimeout(0)`.

Exemplo dentro de I/O:

```js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  Promise.resolve().then(() => console.log('promise'));
  process.nextTick(() => console.log('nextTick'));
});
```

Saida tipica:

```txt
nextTick
promise
immediate
timeout
```

Regra mental simples:
- `nextTick`: antes do loop continuar.
- `Promise`: microtask padrao.
- `setTimeout(0)`: timers.
- `setImmediate`: proximo ciclo na fase `check`.
