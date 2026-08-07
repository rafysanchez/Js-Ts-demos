
// import { produtos, novoProduto } from "./teste";
// import { produtos, numeros, addProduto, unionNum } from "./teste";
// import * as teste from "./teste";

export type Produto = {
    readonly id: number;
    readonly nome: string;
    readonly descricao: string;
    readonly preco: number;
    readonly disponivel: boolean;
};

export interface IProduct2{
    id: number,
    nome: string,
    descricao: string,
    preco: number,
    disponivel: boolean,
    qtdEstoque: number

}
export const produtosComQtd: readonly IProduct2[] = [
    { id: 101, nome: "Caneca Especial", descricao: "Caneca de cerâmica decorada", preco: 34.9, disponivel: true, qtdEstoque: 25 },
    { id: 102, nome: "Caderno Premium", descricao: "Caderno capa dura 200 folhas", preco: 29.5, disponivel: true, qtdEstoque: 40 },
    { id: 103, nome: "Mochila Escolar", descricao: "Mochila resistente 20L", preco: 139.0, disponivel: true, qtdEstoque: 12 },
    { id: 104, nome: "Fone Gamer", descricao: "Fone com microfone e LED", preco: 119.99, disponivel: false, qtdEstoque: 0 },
    { id: 105, nome: "Teclado RGB", descricao: "Teclado mecânico com switches", preco: 259.0, disponivel: true, qtdEstoque: 7 }
];

// 6 operações mais comuns com array produtosComQtd
// 1. ADD - Adicionar novo item ao array
export const novoItemComQtd: IProduct2 = { id: 106, nome: "Monitor 24\"", descricao: "Monitor Full HD", preco: 599.0, disponivel: true, qtdEstoque: 5 };
export const produtosComQtdAdicionado = [...produtosComQtd, novoItemComQtd];

// 2. DELETE - Remover item por ID
export const produtosComQtdSemId104 = produtosComQtd.filter((produto) => produto.id !== 104);

// Alternativa usando slice para remover o item sem mutar o array original
// encontra o índice do item com id 104 e reconstrói o array sem esse item
export const produtosComQtdSemId104Slice = (() => {
    const index = produtosComQtd.findIndex((p) => p.id === 104);
    if (index === -1) return [...produtosComQtd]; // não encontrado, retorna cópia
    return [...produtosComQtd.slice(0, index), ...produtosComQtd.slice(index + 1)];
})();

// 3. FIND - Encontrar um item específico
export const produtoEncontradoComQtd = produtosComQtd.find((produto) => produto.id === 102);

// 4. UPDATE - Atualizar item por ID
export const produtosComQtdAtualizado = produtosComQtd.map((produto) =>
    produto.id === 101 ? { ...produto, qtdEstoque: produto.qtdEstoque - 5 } : produto
);

// 5. FILTER - Filtrar itens com disponibilidade e estoque
export const produtosDisponivelComEstoque = produtosComQtd.filter((produto) => produto.disponivel && produto.qtdEstoque > 0);

// 6. MAP - Mapear/transformar array extraindo apenas nomes e preços
export const resumoPrecos = produtosComQtd.map((produto) => ({ nome: produto.nome, preco: produto.preco }));

export type ProdutoResumo = Pick<Produto, "id" | "nome">;



export const produtos: readonly Produto[] = [
    { id: 1, nome: "Caneca", descricao: "Caneca de ceramica", preco: 29.9, disponivel: true },
    { id: 2, nome: "Caderno", descricao: "Caderno brochura 100 folhas", preco: 15.5, disponivel: true },
    { id: 3, nome: "Mochila", descricao: "Mochila esportiva", preco: 120.0, disponivel: false },
    { id: 4, nome: "Fone de ouvido", descricao: "Fone Bluetooth", preco: 89.99, disponivel: true },
    { id: 5, nome: "Teclado", descricao: "Teclado mecanico", preco: 249.0, disponivel: true },
    { id: 6, nome: "Mouse", descricao: "Mouse optico", preco: 79.9, disponivel: true },
    { id: 7, nome: "Livro", descricao: "Livro de JavaScript", preco: 59.9, disponivel: false },
    { id: 8, nome: "Camiseta", descricao: "Camiseta de algodao", preco: 39.0, disponivel: true },
    { id: 9, nome: "Relogio", descricao: "Relogio digital", preco: 199.99, disponivel: true },
    { id: 10, nome: "Garrafa", descricao: "Garrafa termica", preco: 49.9, disponivel: true }
];

export const numerosBase = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 5, 6, 8] as const;

export const novoProduto: Produto = {
    id: 11,
    nome: "Pen Drive",
    descricao: "Pen Drive 32GB",
    preco: 39.9,
    disponivel: true
};

export const addItem = <T>(items: readonly T[], item: T): T[] => [...items, item];

export const removeById = <T extends { id: number }>(items: readonly T[], id: number): T[] =>
    items.filter((item) => item.id !== id);

export const updateById = <T extends { id: number }>(
    items: readonly T[],
    id: number,
    updater: (item: T) => T
): T[] => items.map((item) => (item.id === id ? updater(item) : item));

export const unique = <T>(items: readonly T[]): T[] => [...new Set(items)];

export const intersection = <T>(left: readonly T[], right: readonly T[]): T[] => {
    const rightSet = new Set(right);
    return unique(left.filter((item) => rightSet.has(item)));
};

export const difference = <T>(left: readonly T[], right: readonly T[]): T[] => {
    const rightSet = new Set(right);
    return unique(left.filter((item) => !rightSet.has(item)));
};

export const union = <T>(left: readonly T[], right: readonly T[]): T[] => unique([...left, ...right]);

export const produtosComNovo = addItem(produtos, novoProduto);
export const produtosDisponiveis = produtos.filter((produto) => produto.disponivel);
export const produtosSemId3 = removeById(produtos, 3);
export const produtosAtualizados = updateById(produtos, 2, (produto) => ({
    ...produto,
    preco: produto.preco + 5
}));

export const produtoEncontrado = produtos.find((produto) => produto.id === 4);
export const indiceDoMouse = produtos.findIndex((produto) => produto.nome === "Mouse");
export const totalEmEstoque = produtos.reduce((total, produto) => total + produto.preco, 0);
export const produtoMaisCaro = produtos.reduce((maisCaro, produto) =>
    produto.preco > maisCaro.preco ? produto : maisCaro
);
export const nomesProdutos = produtos.map((produto) => produto.nome);
export const resumoProdutos: ProdutoResumo[] = produtos.map(({ id, nome }) => ({ id, nome }));
export const produtosAcimaDe100 = produtos.filter((produto) => produto.preco > 100);
export const produtosOrdenadosPorPreco = [...produtos].sort((a, b) => a.preco - b.preco);

export const numeros = [...numerosBase];
export const numerosSemDuplicatas = unique(numeros);
export const numerosPares = numeros.filter((numero) => numero % 2 === 0);
export const numerosImpares = numeros.filter((numero) => numero % 2 !== 0);
export const quadrados = numeros.map((numero) => numero * numero);
export const soma = numeros.reduce((total, numero) => total + numero, 0);
export const media = numeros.length > 0 ? soma / numeros.length : 0;
export const maiorNumero = Math.max(...numeros);
export const menorNumero = Math.min(...numeros);
export const existeMaiorQue5 = numeros.some((numero) => numero > 5);
export const todosPositivos = numeros.every((numero) => numero > 0);
export const primeirosTres = numeros.slice(0, 3);
export const ultimosTres = numeros.slice(-3);
export const numerosOrdenados = [...numeros].sort((a, b) => a - b);

export const outrosNumeros = [5, 6, 12] as const;
export const numerosUnidos = union(numeros, outrosNumeros);
export const numerosEmComum = intersection(numeros, outrosNumeros);
export const numerosDiferentes = difference(numeros, outrosNumeros);

export const produtoSet = new Set(produtos);
export const produtoSetComNovo = new Set([...produtoSet, novoProduto]);
export const produtosDisponiveisViaSet = [...produtoSetComNovo].filter((produto) => produto.disponivel);

// console.log("Produtos com novo item:", produtosComNovo);
// console.log("Produtos disponiveis:", produtosDisponiveis);
// console.log("Produtos sem id 3:", produtosSemId3);
// console.log("Produtos atualizados:", produtosAtualizados);
// console.log("Produto encontrado:", produtoEncontrado);
// console.log("Indice do Mouse:", indiceDoMouse);
// console.log("Total em estoque:", totalEmEstoque);
// console.log("Produto mais caro:", produtoMaisCaro);
// console.log("Nomes dos produtos:", nomesProdutos);
// console.log("Resumo dos produtos:", resumoProdutos);
// console.log("Produtos acima de 100:", produtosAcimaDe100);
// console.log("Produtos ordenados por preco:", produtosOrdenadosPorPreco);

// console.log("Numeros sem duplicatas:", numerosSemDuplicatas);
// console.log("Numeros pares:", numerosPares);
// console.log("Numeros impares:", numerosImpares);
// console.log("Quadrados:", quadrados);
// console.log("Soma:", soma);
// console.log("Media:", media);
// console.log("Maior numero:", maiorNumero);
// console.log("Menor numero:", menorNumero);
// console.log("Existe numero maior que 5:", existeMaiorQue5);
// console.log("Todos sao positivos:", todosPositivos);
// console.log("Primeiros tres:", primeirosTres);
// console.log("Ultimos tres:", ultimosTres);
// console.log("Numeros ordenados:", numerosOrdenados);

// console.log("Uniao:", numerosUnidos);
// console.log("Intersecao:", numerosEmComum);
// console.log("Diferenca:", numerosDiferentes);

// console.log("Set de produtos:", produtoSet);
// console.log("Set com novo produto:", produtoSetComNovo);
// console.log("Produtos disponiveis via Set:", produtosDisponiveisViaSet);

export { };
