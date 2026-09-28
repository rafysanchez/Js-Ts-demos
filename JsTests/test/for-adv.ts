type Transaction = {
    id: number;
    customer: string;
    category: string;
    amount: number;
    status: "completed" | "pending" | "cancelled";
};

type CategorySummary = {
    category: string;
    totalAmount: number;
    transactionCount: number;
    averageAmount: number;
};

type AnalysisResult = {
    validTransactions: Transaction[];
    categories: CategorySummary[];
    highestTransaction: Transaction | null;
    totalRevenue: number;
};

function analyzeTransactions(
    transactions: Transaction[]
): AnalysisResult {

    const validTransactions: Transaction[] = [];

    let totalRevenue = 0;
    let highestTransaction: Transaction | null = null;

    // 1. Filtra e valida
    for (let i = 0; i < transactions.length; i++) {

        const transaction = transactions[i];

        if (
            transaction.amount > 0 &&
            transaction.status === "completed"
        ) {
            validTransactions.push(transaction);

            totalRevenue += transaction.amount;

            if (
                highestTransaction === null ||
                transaction.amount > highestTransaction.amount
            ) {
                highestTransaction = transaction;
            }
        }
    }

    const categories: CategorySummary[] = [];

    // 2. Agrupa por categoria
    for (let i = 0; i < validTransactions.length; i++) {

        const transaction = validTransactions[i];

        let categoryFound = false;

        // segundo nível de loop
        for (let j = 0; j < categories.length; j++) {

            if (categories[j].category === transaction.category) {

                categories[j].totalAmount += transaction.amount;
                categories[j].transactionCount++;

                categoryFound = true;
                break;
            }
        }

        if (!categoryFound) {
            categories.push({
                category: transaction.category,
                totalAmount: transaction.amount,
                transactionCount: 1,
                averageAmount: 0
            });
        }
    }

    // 3. Calcula média
    for (let i = 0; i < categories.length; i++) {

        categories[i].averageAmount =
            categories[i].totalAmount /
            categories[i].transactionCount;
    }

    // 4. Ordena pelo maior faturamento
    categories.sort(
        (a, b) => b.totalAmount - a.totalAmount
    );

    // 5. Ordena transações por valor
    validTransactions.sort(
        (a, b) => b.amount - a.amount
    );

    return {
        validTransactions,
        categories,
        highestTransaction,
        totalRevenue
    };
}