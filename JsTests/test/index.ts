/**
 * Interface que define a estrutura de um Produto
 */
export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    disponivel: boolean;
    qtde?: number; // Quantidade opcional, caso seja necessário rastrear estoque
}

/**
 * Constante com dados iniciais de produtos
 */
const produtosIniciais: Produto[] = [
    { id: 1, nome: 'Caneca', descricao: 'Caneca de cerâmica', preco: 29.9, disponivel: true },
    { id: 2, nome: 'Caderno', descricao: 'Caderno brochura 100 folhas', preco: 15.5, disponivel: true },
    { id: 3, nome: 'Mochila', descricao: 'Mochila esportiva', preco: 120.0, disponivel: false },
    { id: 4, nome: 'Fone de ouvido', descricao: 'Fone Bluetooth', preco: 89.99, disponivel: true },
    { id: 5, nome: 'Teclado', descricao: 'Teclado mecânico', preco: 249.0, disponivel: true },
    { id: 6, nome: 'Mouse', descricao: 'Mouse óptico', preco: 79.9, disponivel: true },
    { id: 7, nome: 'Livro', descricao: 'Livro de JavaScript', preco: 59.9, disponivel: false },
    { id: 8, nome: 'Camiseta', descricao: 'Camiseta de algodão', preco: 39.0, disponivel: true },
    { id: 9, nome: 'Relógio', descricao: 'Relógio digital', preco: 199.99, disponivel: true },
    { id: 10, nome: 'Garrafa', descricao: 'Garrafa térmica', preco: 49.9, disponivel: true }
];

/**
 * Array de produtos com operações de modificação imutável
 */
let produtos: Produto[] = [...produtosIniciais];

// --- Exemplo usando Set ---
const produtosSet: Set<Produto> = new Set(produtos);

// Adicionar novo produto (em Set, objetos são comparados por referência)
produtosSet.add({ id: 11, nome: 'Pen Drive', descricao: 'Pen Drive 32GB', preco: 39.9, disponivel: true });

// Verificar se tem produto disponível
const temProdutoDisponivel = [...produtosSet].some(produto => produto.disponivel);

// quais produtos estão disponíveis
const produtosDisponiveisSet = [...produtosSet].filter(produto => produto.disponivel);

// Remover um produto pelo id
const idParaRemoverSet = 3;
for (const p of produtosSet) {
    if (p.id === idParaRemoverSet) { produtosSet.delete(p); break; }
}

// Atualizar o preço de um produto existente
const idParaAtualizarSet = 2;
for (const p of produtosSet) {
    if (p.id === idParaAtualizarSet) {
        produtosSet.delete(p);
        produtosSet.add({ ...p, preco: p.preco + 5 });
        break;
    }
}

// Converter Set de volta para array quando necessário (só se necessário)
const produtosArray = Array.from(produtosSet);

// --- Operações com arrays ---
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 5, 6, 8];

// Exemplos de uso de Set com números
const numerosSet = new Set(numeros);
numerosSet.add(11);

numerosSet.delete(3);
const tamanho = numerosSet.size;

const elementos= Array.from(numerosSet);

// Operações com Sets (união, interseção, diferença)
const outrosNumeros = new Set([5, 6, 12]);

const uniaoNumeros = new Set([...numerosSet, ...outrosNumeros]);
const intersecaoNumeros = new Set([...numerosSet].filter(x => outrosNumeros.has(x)));
const diferencaNumeros = new Set([...numerosSet].filter(x => !outrosNumeros.has(x)));

// --- Operações imutáveis com arrays ---
const novosNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 5, 6, 8];

// Adicionar novo produto (operação mutável)
produtos.push({ id: 11, nome: 'Pen Drive', descricao: 'Pen Drive 32GB', preco: 39.9, disponivel: true });

// Filtrar produtos disponíveis (operação imutável)
const produtosDisponiveis = produtos.filter(produto => produto.disponivel);

// Remover produto pelo id
const produtosSemRemovido = produtos.filter(produto => produto.id !== 3);

// Atualizar preço
const produtosAtualizados = produtos.map(produto =>
    produto.id === 2 ? { ...produto, preco: produto.preco + 5 } : produto
);

// Remover um produto pelo id (operação imutável)
const idParaRemover = 3;
produtos = produtos.filter(produto => produto.id !== idParaRemover);

// Atualizar o preço de um produto existente (operação imutável)
const idParaAtualizar = 2;
produtos = produtos.map(produto => produto.id === idParaAtualizar ?
    { ...produto, preco: produto.preco + 5 } : produto);

// Operações com arrays de números
const numerosPares = novosNumeros.filter(n => n % 2 === 0);
const quadrados = novosNumeros.map(n => n * n);
const soma = novosNumeros.reduce((acc, n) => acc + n, 0);
const existeMaiorQue5 = novosNumeros.some(n => n > 5);
const quaisMaiorQue5 = novosNumeros.filter(n => n > 5);
// Operações com arrays
const outroArray = [5, 6, 12];
const uniaoArray = [...novosNumeros, ...outroArray];
const intersecaoArray = novosNumeros.filter(n => outroArray.includes(n));
const diferencaArray = novosNumeros.filter(n => !outroArray.includes(n));

// Usar resultados para demonstração
console.log('Número de produtos:', produtos.length);
console.log('Números pares:', numerosPares);
console.log('Soma:', soma);
console.log('Existe número maior que 5:', existeMaiorQue5);
console.log('Números maiores que 5:', quaisMaiorQue5);
