import React, { useState } from "react";

export default function SimpleComp() {
  // O estado guarda o valor do contador.
  const [contador, setContador] = useState(0);

  return (
    <div>
      <h1>Meu primeiro componente</h1>
      <p>Você clicou {contador} vezes.</p>
      {/* O clique atualiza o estado e a tela. */}
      <button onClick={() => setContador((valor) => valor + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
