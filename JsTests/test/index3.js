let itens = [
  {
    id: 1,
    nome: "Caneca",
    descricao: "Caneca de cerâmica",
    preco: 29.9,
    disponivel: true,
    qtde: null,
  },
  {
    id: 2,
    nome: "Caderno",
    descricao: "Caderno brochura 100 folhas",
    preco: 15.5,
    disponivel: true,
    qtde: null,
  },
  {
    id: 3,
    nome: "Mochila",
    descricao: "Mochila esportiva",
    preco: 120.0,
    disponivel: false,
    qtde: null,
  },
  {
    id: 4,
    nome: "Fone de ouvido",
    descricao: "Fone Bluetooth",
    preco: 89.99,
    disponivel: true,
    qtde: null,
  },
  {
    id: 5,
    nome: "Teclado",
    descricao: "Teclado mecânico",
    preco: 249.0,
    disponivel: true,
    qtde: null,
  },
  {
    id: 6,
    nome: "Mouse",
    descricao: "Mouse óptico",
    preco: 79.9,
    disponivel: true,
    qtde: null,
  },
  {
    id: 7,
    nome: "Livro",
    descricao: "Livro de JavaScript",
    preco: 59.9,
    disponivel: false,
    qtde: null,
  },
  {
    id: 8,
    nome: "Camiseta",
    descricao: "Camiseta de algodão",
    preco: 39.0,
    disponivel: true,
    qtde: null,
  },
  {
    id: 9,
    nome: "Relógio",
    descricao: "Relógio digital",
    preco: 199.99,
    disponivel: true,
    qtde: null,
  },
  {
    id: 10,
    nome: "Garrafa",
    descricao: "Garrafa térmica",
    preco: 49.9,
    disponivel: true,
    qtde: null,
  },
];

// com arrays - adicionar novo produto
itens.push({
  id: 11,
  nome: "Pen Drive",
  descricao: "Pen Drive 32GB",
  preco: 39.9,
  disponivel: true,
});
//com arrays remover item id = 1
itens = itens.filter((item) => item.id !== 1);
// exemplo de atualizar preço do item id = 2
itens = itens.map((item) =>
  item.id === 2 ? { ...item, preco: item.preco + 5 } : item,
);
// atualizar qtde item id = 9
itens = itens.map((item) => (item.id === 9 ? { ...item, qtde: 10 } : item));

// colocar em ordem crescente pelo preço
itens.sort((a, b) => a.preco - b.preco);

// Mesma coisa usando Set
const itensSet = new Set(itens);

// Adicionar novo produto (em Set, objetos são comparados por referência)
itensSet.add({
  id: 11,
  nome: "Pen Drive",
  descricao: "Pen Drive 32GB",
  preco: 39.9,
  disponivel: true,
});

// Filtrar produtos disponíveis (converter para array ou criar novo Set a partir do filtro)
const disponiveisSet = new Set(
  [...itensSet].filter((produto) => produto.disponivel),
);

// Remover um produto pelo id (procurar referência e deletar)
const idParaRemoverSet = 3;
for (const p of itensSet) {
  if (p.id === idParaRemoverSet) {
    itensSet.delete(p);
    break;
  }
}

// Atualizar o preço de um produto existente (remover referência antiga e adicionar novo objeto)
const idParaAtualizarSet = 2;
for (const p of itensSet) {
  if (p.id === idParaAtualizarSet) {
    itensSet.delete(p);
    itensSet.add({ ...p, preco: p.preco + 5 });
    break;
  }
}

// Converter Set de volta para array quando necessário
const itensArrayFromSet = [...itensSet];

// Operações com itensArrayFromSet
// add novo produto
itensArrayFromSet.push({
  id: 12,
  nome: "Cadeira",
  descricao: "Cadeira de escritório",
  preco: 299.9,
  disponivel: true,
});

// Filtrar produtos disponíveis
const disponiveisArrayFromSet = itensArrayFromSet.filter(
  (produto) => produto.disponivel,
);

// Remover um produto pelo id
const idParaRemoverArrayFromSet = 4;
const itensSemRemovidoArrayFromSet = itensArrayFromSet.filter(
  (produto) => produto.id !== idParaRemoverArrayFromSet,
);

// ordenar por preço
const itensOrdenadosPorPrecoArrayFromSet = [...itensArrayFromSet].sort(
  (a, b) => a.preco - b.preco,
);

let simpleNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 5, 6, 8];

// Exemplos de uso de Set com simpleNumber - métodos mais comuns
// Criar um Set (remove duplicatas automaticamente)
const setNumeros = new Set(simpleNumber);

// add: adicionar um elemento
setNumeros.add(11);

// atualizar um valor: Set não possui update; remova o antigo e adicione o novo
const numeroAtualizado = 4;
setNumeros.delete(numeroAtualizado);
setNumeros.add(40);

// em ordem crecente setNumero
const setNumerosOrdenados = new Set([...setNumeros].sort((a, b) => a - b));
// has: verificar existência
const temCinco = setNumeros.has(5); // true

// delete: remover elemento
setNumeros.delete(3);

// size: quantidade de elementos
const tamanho = setNumeros.size;

// forEach: iterar sobre o Set
const elementos = [];
setNumeros.forEach((n) => elementos.push(n));
// exibe elementos
console.log("Elementos do Set:", elementos);
// Converter de volta para array (spread ou Array.from)
const arraySemDuplicatas = [...setNumeros];
const arrayAlt = Array.from(setNumeros);

// Operações comuns (união, interseção, diferença)
const outros = new Set([5, 6, 12]);

// União
const uniao = new Set([...setNumeros, ...outros]);

// Interseção
const intersecao = new Set([...setNumeros].filter((x) => outros.has(x)));

// Diferença (setNumeros - outros)
const diferenca = new Set([...setNumeros].filter((x) => !outros.has(x)));

// Exemplo de operações com arrays
// Adicionar novo produto
itens.push({
  id: 11,
  nome: "Pen Drive",
  descricao: "Pen Drive 32GB",
  preco: 39.9,
  disponivel: true,
});

// Filtrar produtos disponíveis
const disponiveis = itens.filter((produto) => produto.disponivel);

// Remover um produto pelo id
const idParaRemover = 3;
itens = itens.filter((produto) => produto.id !== idParaRemover);

// Atualizar o preço de um produto existente
const idParaAtualizar = 2;
itens = itens.map((produto) =>
  produto.id === idParaAtualizar
    ? { ...produto, preco: produto.preco + 5 }
    : produto,
);

// Operações com simpleNumber
const numerosPares = simpleNumber.filter((n) => n % 2 === 0);
const quadrados = simpleNumber.map((n) => n * n);
const soma = simpleNumber.reduce((acc, n) => acc + n, 0);
const existeMaiorQue5 = simpleNumber.some((n) => n > 5);

// nao apgue acima

// use arrays para estudo abaixo desta linha - tudo acima mas com arrays ops
const itensBaseArray = [...itens];
const numerosBaseArray = [...simpleNumber];

// Opção: números em ordem crescente
const opcaoNumerosCrescente = [...numerosBaseArray].sort((a, b) => a - b);
console.log("Opção - números em ordem crescente:", opcaoNumerosCrescente);

const novoProdutoArray = {
  id: 11,
  nome: "Pen Drive",
  descricao: "Pen Drive 32GB",
  preco: 39.9,
  disponivel: true,
};

const itensComNovoArray = [...itensBaseArray, novoProdutoArray];
const disponiveisArray = itensBaseArray.filter((produto) => produto.disponivel);

const idParaRemoverArray = 3;
const itensSemRemovidoArray = itensBaseArray.filter(
  (produto) => produto.id !== idParaRemoverArray,
);

const idParaAtualizarArray = 2;
const itensAtualizadosArray = itensBaseArray.map((produto) =>
  produto.id === idParaAtualizarArray
    ? { ...produto, preco: produto.preco + 5 }
    : produto,
);

const produtoEncontradoArray = itensBaseArray.find(
  (produto) => produto.id === 4,
);
const indiceProdutoArray = itensBaseArray.findIndex(
  (produto) => produto.nome === "Mouse",
);
const totalEstoqueArray = itensBaseArray.reduce(
  (acc, produto) => acc + produto.qtde,
  0,
);
const produtoMaisCaroArray = itensBaseArray.reduce((maisCaro, produto) =>
  produto.preco > maisCaro.preco ? produto : maisCaro,
);

const nomesProdutosArray = itensBaseArray.map((produto) => produto.nome);
const nomeEIdArray = itensBaseArray.map((produto) => ({
  id: produto.id,
  nome: produto.nome,
}));

const produtosAcimaDe100Array = itensBaseArray.filter(
  (produto) => produto.preco > 100,
);
const itensOrdenadosPorPrecoArray = [...itensBaseArray].sort(
  (a, b) => a.preco - b.preco,
);

const numerosSemDuplicatasArray = [...new Set(numerosBaseArray)];
const numerosParesArray = numerosBaseArray.filter((n) => n % 2 === 0);
const numerosImparesArray = numerosBaseArray.filter((n) => n % 2 !== 0);
const quadradosArray = numerosBaseArray.map((n) => n * n);
const somaArray = numerosBaseArray.reduce((acc, n) => acc + n, 0);
const mediaArray =
  numerosBaseArray.length > 0 ? somaArray / numerosBaseArray.length : 0;
const maiorNumeroArray = Math.max(...numerosBaseArray);
const menorNumeroArray = Math.min(...numerosBaseArray);
const temNumeroMaiorQue5Array = numerosBaseArray.some((n) => n > 5);
const todosPositivosArray = numerosBaseArray.every((n) => n > 0);
const primeirosTresNumerosArray = numerosBaseArray.slice(0, 3);
const ultimosTresNumerosArray = numerosBaseArray.slice(-3);
const numerosOrdenadosArray = [...numerosBaseArray].sort((a, b) => a - b);

const outroArray = [5, 6, 12];
const uniaoArray = [...new Set([...numerosBaseArray, ...outroArray])];
const intersecaoArray = [
  ...new Set(numerosBaseArray.filter((n) => outroArray.includes(n))),
];
const diferencaArray = [
  ...new Set(numerosBaseArray.filter((n) => !outroArray.includes(n))),
];

console.log("Novo array com produto:", itensComNovoArray);
console.log("Produtos disponiveis:", disponiveisArray);
console.log("Produtos sem o id 3:", itensSemRemovidoArray);
console.log("Produtos atualizados:", itensAtualizadosArray);
console.log("Produto encontrado:", produtoEncontradoArray);
console.log("Indice do Mouse:", indiceProdutoArray);
console.log("Total do estoque:", totalEstoqueArray);
console.log("Produto mais caro:", produtoMaisCaroArray);
console.log("Nomes dos produtos:", nomesProdutosArray);
console.log("Produtos acima de 100:", produtosAcimaDe100Array);
console.log("Produtos ordenados por preco:", itensOrdenadosPorPrecoArray);

console.log("Numeros sem duplicatas:", numerosSemDuplicatasArray);
console.log("Numeros pares:", numerosParesArray);
console.log("Quadrados:", quadradosArray);
console.log("Soma:", somaArray);
console.log("Media:", mediaArray);
console.log("Maior numero:", maiorNumeroArray);
console.log("Menor numero:", menorNumeroArray);
console.log("Tem numero maior que 5:", temNumeroMaiorQue5Array);
console.log("Todos sao positivos:", todosPositivosArray);
console.log("Primeiros tres numeros:", primeirosTresNumerosArray);
console.log("Ultimos tres numeros:", ultimosTresNumerosArray);
console.log("Numeros ordenados:", numerosOrdenadosArray);

console.log("Uniao:", uniaoArray);
console.log("Intersecao:", intersecaoArray);
console.log("Diferenca:", diferencaArray);
