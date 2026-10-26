// Array padrao usado em todos os exemplos deste arquivo.
const produtos = [
  {
    id: 1,
    nome: "Caneca",
    descricao: "Caneca de ceramica",
    preco: 29.9,
    disponivel: true,
    estoque: 12,
    categorias: ["casa", "cozinha"],
  },
  {
    id: 2,
    nome: "Caderno",
    descricao: "Caderno brochura 100 folhas",
    preco: 15.5,
    disponivel: true,
    estoque: 25,
    categorias: ["papelaria", "estudo"],
  },
  {
    id: 3,
    nome: "Mochila",
    descricao: "Mochila esportiva",
    preco: 120,
    disponivel: false,
    estoque: 0,
    categorias: ["acessorios", "esporte"],
  },
  {
    id: 4,
    nome: "Fone de ouvido",
    descricao: "Fone Bluetooth",
    preco: 89.99,
    disponivel: true,
    estoque: 8,
    categorias: ["eletronicos", "audio"],
  },
  {
    id: 5,
    nome: "Teclado",
    descricao: "Teclado mecanico",
    preco: 249,
    disponivel: true,
    estoque: 4,
    categorias: ["eletronicos", "informatica"],
  },
];

// -----------------------------------------------------------------------------
// Metodos mostrados na imagem
// -----------------------------------------------------------------------------

// some: retorna true se PELO MENOS UM produto atender a condicao.
const existeProdutoCaro = produtos.some((produto) => produto.preco > 200);

// every: retorna true se TODOS os produtos atenderem a condicao.
const todosTemPrecoValido = produtos.every((produto) => produto.preco > 0);

// find: retorna o PRIMEIRO produto encontrado ou undefined.
const produtoEncontrado = produtos.find((produto) => produto.id === 3);

// findIndex: retorna o indice do primeiro produto encontrado ou -1.
const indiceDoFone = produtos.findIndex(
  (produto) => produto.nome === "Fone de ouvido",
);

// flatMap: executa um map e achata um nivel do resultado.
// Aqui transforma os arrays de categorias em um unico array.
const todasAsCategorias = produtos.flatMap((produto) => produto.categorias);
console.log(todasAsCategorias);

// -----------------------------------------------------------------------------
// Outros metodos importantes de array
// -----------------------------------------------------------------------------

// forEach: percorre o array; normalmente e usado para executar uma acao.
produtos.forEach((produto) => {
  console.log(`${produto.nome}: R$ ${produto.preco.toFixed(2)}`);
});

// map: cria um novo array transformando cada item.
const resumos = produtos.map((produto) => ({
  id: produto.id,
  nome: produto.nome,
  precoFormatado: `R$ ${produto.preco.toFixed(2)}`,
}));

// filter: cria um novo array apenas com os itens que passam na condicao.
const produtosDisponiveis = produtos.filter(
  (produto) => produto.disponivel && produto.estoque > 0,
);

// reduce: reduz o array a um unico valor.
const valorTotalDoEstoque = produtos.reduce(
  (total, produto) => total + produto.preco * produto.estoque,
  0,
);

// sort: ordena o proprio array. O spread cria uma copia antes da ordenacao.
const produtosPorMenorPreco = [...produtos].sort(
  (produtoA, produtoB) => produtoA.preco - produtoB.preco,
);

// slice: copia uma parte sem alterar o array original.
const doisPrimeirosProdutos = produtos.slice(0, 2);

// at: acessa pelo indice e aceita indices negativos.
const ultimoProduto = produtos.at(-1);

// includes: verifica se um valor existe. E mais comum em arrays simples.
const categoriasUnicas = [...new Set(todasAsCategorias)];
const possuiCategoriaEletronicos = categoriasUnicas.includes("eletronicos");

// findLast e findLastIndex: procuram do fim para o inicio.
const ultimoProdutoAbaixoDe100 = produtos.findLast(
  (produto) => produto.preco < 100,
);
const ultimoIndiceAbaixoDe100 = produtos.findLastIndex(
  (produto) => produto.preco < 100,
);

// -----------------------------------------------------------------------------
// Operacoes comuns sem alterar o array original
// -----------------------------------------------------------------------------

// Adicionar.
const novoProduto = {
  id: 6,
  nome: "Mouse",
  descricao: "Mouse optico",
  preco: 79.9,
  disponivel: true,
  estoque: 10,
  categorias: ["eletronicos", "informatica"],
};
const produtosComNovo = [...produtos, novoProduto];

// Atualizar pelo id.
const produtosComPrecoAtualizado = produtos.map((produto) =>
  produto.id === 2 ? { ...produto, preco: produto.preco + 5 } : produto,
);

// Remover pelo id.
const produtosSemId3 = produtos.filter((produto) => produto.id !== 3);

// -----------------------------------------------------------------------------
// Resultados
// -----------------------------------------------------------------------------

console.log("\nMetodos da imagem:");
console.log({
  existeProdutoCaro,
  todosTemPrecoValido,
  produtoEncontrado,
  indiceDoFone,
  todasAsCategorias,
});

console.log("\nOutros metodos:");
console.log({
  resumos,
  produtosDisponiveis,
  valorTotalDoEstoque: valorTotalDoEstoque.toFixed(2),
  produtosPorMenorPreco,
  doisPrimeirosProdutos,
  ultimoProduto,
  categoriasUnicas,
  possuiCategoriaEletronicos,
  ultimoProdutoAbaixoDe100,
  ultimoIndiceAbaixoDe100,
});

console.log("\nOperacoes comuns:");
console.log({
  produtosComNovo,
  produtosComPrecoAtualizado,
  produtosSemId3,
});
