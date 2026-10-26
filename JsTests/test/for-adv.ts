// Tipos do domínio: representam os dados de entrada e do resultado final.
// Transaction = uma transação financeira da loja.
type Transaction = {
    id: number;
    customer: string;
    category: string;
    amount: number;
    status: "completed" | "pending" | "cancelled";
};

// Summary de uma categoria: guarda totais e médias para cada grupo.
type CategorySummary = {
    category: string;
    totalAmount: number;
    transactionCount: number;
    averageAmount: number;
};

// Resultado final da análise: tudo que a função retorna.
type AnalysisResult = {
    validTransactions: Transaction[];
    categories: CategorySummary[];
    highestTransaction: Transaction | null;
    totalRevenue: number;
};

// Função principal que analisa uma lista de transações.
// Ela filtra transações válidas, calcula o faturamento, agrupa por categoria,
// calcula a média por categoria e retorna um resumo útil para relatórios.
function analyzeTransactions(
    transactions: Transaction[]
): AnalysisResult {

    // 1) Armazena apenas transações que podem entrar no cálculo.
    //    Regras: valor positivo e status concluído.
    const validTransactions: Transaction[] = [];

    // 2) Variáveis acumuladoras para o total do faturamento e a maior transação.
    let totalRevenue = 0;
    let highestTransaction: Transaction | null = null;

    // 3) Primeiro passo: filtra e valida as transações.
    //    Pega cada item do array e verifica se é válido para análise financeira.
    for (let i = 0; i < transactions.length; i++) {

        const transaction = transactions[i];

        if (
            transaction.amount > 0 &&
            transaction.status === "completed"
        ) {
            // Transação válida: entra na lista de análise.
            validTransactions.push(transaction);

            // Soma o valor ao faturamento total.
            totalRevenue += transaction.amount;

            // Atualiza a maior transação encontrada até o momento.
            if (
                highestTransaction === null ||
                transaction.amount > highestTransaction.amount
            ) {
                highestTransaction = transaction;
            }
        }
    }

    // 4) Agrupa as transações válidas por categoria.
    //    Ex.: todas as compras de 'food' ficam em um único resumo.
    const categories: CategorySummary[] = [];

    for (let i = 0; i < validTransactions.length; i++) {

        const transaction = validTransactions[i];

        // Flag para saber se a categoria já existe no array categories.
        let categoryFound = false;

        // Segundo nível de loop: percorre as categorias já criadas.
        for (let j = 0; j < categories.length; j++) {

            // Se a categoria atual da transação já existe, atualiza o resumo dela.
            if (categories[j].category === transaction.category) {

                categories[j].totalAmount += transaction.amount;
                categories[j].transactionCount++;

                categoryFound = true;
                break;
            }
        }

        // Se a categoria não foi encontrada, cria um novo agrupamento para ela.
        if (!categoryFound) {
            categories.push({
                category: transaction.category,
                totalAmount: transaction.amount,
                transactionCount: 1,
                averageAmount: 0
            });
        }
    }

    // 5) Calcula a média por categoria.
    //    Média = total da categoria / quantidade de transações naquela categoria.
    for (let i = 0; i < categories.length; i++) {

        categories[i].averageAmount =
            categories[i].totalAmount /
            categories[i].transactionCount;
    }

    // 6) Ordena as categorias por maior faturamento para priorizar os mais relevantes.
    categories.sort(
        (a, b) => b.totalAmount - a.totalAmount
    );

    // 7) Ordena as transações válidas por valor, do maior para o menor.
    validTransactions.sort(
        (a, b) => b.amount - a.amount
    );

    // 8) Retorna o resultado final da análise.
    return {
        validTransactions,
        categories,
        highestTransaction,
        totalRevenue
    };
}

// -----------------------------------------------------------------------------
// Versão moderna com reduce() e Map()
// Objetivo: manter a mesma lógica, mas tornar o código mais declarativo.
// -----------------------------------------------------------------------------

function analyzeTransactionsModern(
    transactions: Transaction[]
): AnalysisResult {

    // 1) Filtra transações válidas.
    const validTransactions = transactions.filter(
        (transaction) =>
            transaction.amount > 0 &&
            transaction.status === "completed"
    );

    // 2) Calcula o faturamento total com reduce().
    const totalRevenue = validTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );

    // 3) Descobre a maior transação com reduce().
    const highestTransaction: Transaction | null = validTransactions.reduce(
        (highest, transaction) => {
            if (!highest || transaction.amount > highest.amount) {
                return transaction;
            }

            return highest;
        },
        null as Transaction | null
    );

    // 4) Agrupa por categoria com Map().
    const categoryMap = new Map<string, CategorySummary>();

    validTransactions.forEach((transaction) => {
        const existingCategory = categoryMap.get(transaction.category);

        if (existingCategory) {
            existingCategory.totalAmount += transaction.amount;
            existingCategory.transactionCount += 1;
            return;
        }

        categoryMap.set(transaction.category, {
            category: transaction.category,
            totalAmount: transaction.amount,
            transactionCount: 1,
            averageAmount: 0
        });
    });

    // 5) Calcula a média por categoria.
    const categories = Array.from(categoryMap.values())
        .map((category) => ({
            ...category,
            averageAmount: category.totalAmount / category.transactionCount
        }))
        .sort((a, b) => b.totalAmount - a.totalAmount);

    // 6) Ordena transações por valor, do maior para o menor.
    const sortedTransactions = [...validTransactions].sort(
        (a, b) => b.amount - a.amount
    );

    return {
        validTransactions: sortedTransactions,
        categories,
        highestTransaction,
        totalRevenue
    };
}

// -----------------------------------------------------------------------------
// Exemplo de uso com entrada e saída.
// -----------------------------------------------------------------------------

const exampleTransactions: Transaction[] = [
    { id: 1, customer: "Ana", category: "food", amount: 120, status: "completed" },
    { id: 2, customer: "Bruno", category: "food", amount: 80, status: "completed" },
    { id: 3, customer: "Carla", category: "transport", amount: 50, status: "pending" },
    { id: 4, customer: "Davi", category: "transport", amount: 90, status: "completed" },
    { id: 5, customer: "Eva", category: "food", amount: -25, status: "completed" },
    { id: 6, customer: "Fernanda", category: "health", amount: 200, status: "cancelled" },
    { id: 7, customer: "Gabriel", category: "food", amount: 140, status: "completed" },
];

const resultExample = analyzeTransactionsModern(exampleTransactions);

// Saída esperada:
// {
//   validTransactions: [
//     { id: 7, customer: 'Gabriel', category: 'food', amount: 140, status: 'completed' },
//     { id: 1, customer: 'Ana', category: 'food', amount: 120, status: 'completed' },
//     { id: 4, customer: 'Davi', category: 'transport', amount: 90, status: 'completed' },
//     { id: 2, customer: 'Bruno', category: 'food', amount: 80, status: 'completed' }
//   ],
//   categories: [
//     { category: 'food', totalAmount: 340, transactionCount: 3, averageAmount: 113.33 },
//     { category: 'transport', totalAmount: 90, transactionCount: 1, averageAmount: 90 }
//   ],
//   highestTransaction: { id: 7, customer: 'Gabriel', category: 'food', amount: 140, status: 'completed' },
//   totalRevenue: 430
// }