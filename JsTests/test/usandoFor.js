// gere uma lista de produtos com estoque -
// crie4 exemplos de uso de for para percorrer a lista de produtos e exibir o nome e o preço de cada produto.

const produtos = [
  {
    id: 1,
    nome: "Notebook",
    descricao: "Notebook i7",
    preco: 3500.0,
    qtdEstoque: 10,
  },
  {
    id: 2,
    nome: "Smartphone",
    descricao: "Smartphone Android",
    preco: 2000.0,
    qtdEstoque: 20,
  },
  {
    id: 3,
    nome: "Tablet",
    descricao: "Tablet com tela de 10 polegadas",
    preco: 1500.0,
    qtdEstoque: 15,
  },
  {
    id: 4,
    nome: "Headset",
    descricao: "Headset sem fio",
    preco: 200.0,
    qtdEstoque: 25,
  },
];

// Exemplo 1: for clássico
for (let i = 0; i < produtos.length; i++) {
  console.log(
    `Nome: ${produtos[i].nome}, Preço: R$ ${produtos[i].preco.toFixed(2)}`,
  );
}

// Exemplo 2: for...of
for (const produto of produtos) {
  console.log(`Nome: ${produto.nome}, Preço: R$ ${produto.preco.toFixed(2)}`);
}

// Exemplo 3: forEach
produtos.forEach((produto) => {
  console.log(`Nome: ${produto.nome}, Preço: R$ ${produto.preco.toFixed(2)}`);
});

// Exemplo 4: for...in (não recomendado para arrays)
for (const key in produtos) {
  const produto = produtos[key];
  console.log(`Nome: ${produto.nome}, Preço: R$ ${produto.preco.toFixed(2)}`);
}

// Explicação dos exemplos:
//
// 1. O for clássico usa um índice (i) para acessar cada posição do array.
//    A variável começa em 0, continua enquanto i for menor que o tamanho do
//    array e é incrementada ao final de cada repetição. É útil quando você
//    precisa controlar o índice, pular posições ou percorrer apenas parte da
//    lista.
//
// 2. O for...of percorre diretamente os valores do array. Em cada repetição,
//    produto recebe um objeto da lista, sem a necessidade de usar índices.
//    Geralmente é uma opção simples e legível para percorrer todos os itens.
//
// 3. O forEach executa uma função para cada elemento do array. O parâmetro
//    produto representa o item atual. Também é possível receber o índice como
//    segundo parâmetro: produtos.forEach((produto, indice) => { ... }).
//    Como ele depende de uma função de callback, não é adequado para usar
//    break ou continue diretamente.
//
// 4. O for...in percorre as chaves ou índices enumeráveis do array. Por isso,
//    key terá valores como "0", "1", "2" e "3", e produtos[key] recupera o
//    produto correspondente. Para arrays, for...of ou forEach são normalmente
//    recomendados, pois deixam claro que o objetivo é percorrer os valores.
//
// Em todos os exemplos, toFixed(2) formata o preço com duas casas decimais.
