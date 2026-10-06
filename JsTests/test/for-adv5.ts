// estudo de async/await + Promise.all
// objetivo: entender como processar várias tarefas ao mesmo tempo

export { };

// 1) definimos o formato inicial das ordens
// cada pedido tem: id, cliente, valor e status
// status pode ser: concluído, pendente ou cancelado
type Order = {
    id: number;
    customer: string;
    amount: number;
    status: "completed" | "pending" | "cancelled";
};

// 2) depois que a ordem é processada, ela recebe impostos e valor final
type ProcessedOrder = Order & {
    tax: number;
    finalAmount: number;
};

// 3) resultado resumido por grupo
type GroupResult = {
    groupName: string;
    processedOrders: ProcessedOrder[];
    totalAmount: number;
    completedCount: number;
};

// 4) função que soma os valores de pedidos concluídos
function calculateSummary(processedOrders: ProcessedOrder[]) {
    let totalAmount = 0;
    let completedCount = 0;

    for (const order of processedOrders) {
        if (order.status === "completed") {
            totalAmount += order.finalAmount;
            completedCount++;
        }
    }

    return { totalAmount, completedCount };
}

// 5) processar uma ordem isolada
// aqui usamos Promise para simular uma tarefa assíncrona
async function processOrder(order: Order): Promise<ProcessedOrder> {
    return new Promise(resolve => {
        setTimeout(() => {
            const tax = order.amount * 0.1;

            resolve({
                ...order,
                tax,
                finalAmount: order.amount + tax
            });
        }, 100);
    });
}

// 6) processar um grupo inteiro de pedidos
// cada item do grupo vai ser processado em paralelo
async function processOrderGroups(groups: Order[][]): Promise<GroupResult[]> {
    const results: GroupResult[] = [];

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];

        // Promise.all: executa todas as promises do grupo ao mesmo tempo
        const processedOrders = await Promise.all(
            group.map(order => processOrder(order))
        );

        // depois que todas terminaram, resumimos o grupo
        const { totalAmount, completedCount } = calculateSummary(processedOrders);

        results.push({
            groupName: `Group ${i + 1}`,
            processedOrders,
            totalAmount,
            completedCount
        });
    }

    return results;
}

// 7) dados de entrada
// cada item da lista é um grupo de pedidos
const groups: Order[][] = [
    [
        { id: 1, customer: "Ana", amount: 1000, status: "completed" },
        { id: 2, customer: "Carlos", amount: 200, status: "pending" }
    ],
    [
        { id: 3, customer: "Maria", amount: 500, status: "completed" },
        { id: 4, customer: "John", amount: 800, status: "completed" }
    ]
];

// 8) chamada principal
// aqui o programa espera terminar o processamento de todos os grupos
const resultado = await processOrderGroups(groups);
console.log("Resultado final:", resultado);

// 9) exemplo simples de análise por grupo
// cada grupo é processado individualmente, mas as ordens dentro dele são paralelas
for (const group of groups) {
    const processedOrders = await Promise.all(
        group.map(order => processOrder(order))
    );

    const summary = calculateSummary(processedOrders);

    console.log("Resumo do grupo:", summary);
}

// 10) exemplo de processamento paralelo de todos os grupos ao mesmo tempo
const todosOsGrupos = await Promise.all(
    groups.map(async (group, index) => {
        const processedOrders = await Promise.all(
            group.map(order => processOrder(order))
        );

        const { totalAmount, completedCount } = calculateSummary(processedOrders);

        return {
            groupName: `Group ${index + 1}`,
            processedOrders,
            totalAmount,
            completedCount
        };
    })
);

console.log("Todos os grupos em paralelo:", todosOsGrupos);

// resumo rápido:
// - Promise.all processa várias tarefas simultaneamente
// - await espera o resultado antes de continuar
// - o código fica mais eficiente quando tarefas são independentes

// -----------------------------------------------------------------------------
// Versão moderna: mais enxuta, declarativa e fácil de ler
// A ideia é usar Promise.all + map + filter + reduce para deixar o código mais limpo.
// -----------------------------------------------------------------------------

async function processOrderGroupsModern(groups: Order[][]): Promise<GroupResult[]> {
    return Promise.all(
        groups.map(async (group, index) => {
            const processedOrders = await Promise.all(
                group.map(async (order) => processOrder(order))
            );

            const completedOrders = processedOrders.filter(
                (order) => order.status === "completed"
            );

            const totalAmount = completedOrders.reduce(
                (sum, order) => sum + order.finalAmount,
                0
            );

            const completedCount = completedOrders.length;

            return {
                groupName: `Group ${index + 1}`,
                processedOrders,
                totalAmount,
                completedCount
            };
        })
    );
}

// -----------------------------------------------------------------------------
// Exemplo de chamada: processando grupos com a versão moderna
// -----------------------------------------------------------------------------
const groupsModern: Order[][] = [
    [
        { id: 1, customer: "Ana", amount: 1000, status: "completed" },
        { id: 2, customer: "Carlos", amount: 200, status: "pending" }
    ],
    [
        { id: 3, customer: "Maria", amount: 500, status: "completed" },
        { id: 4, customer: "John", amount: 800, status: "completed" }
    ],
    [
        { id: 5, customer: "Pedro", amount: 300, status: "cancelled" },
        { id: 6, customer: "Julia", amount: 150, status: "completed" }
    ]
];

const resultModern = await processOrderGroupsModern(groupsModern);
console.log("Resultado moderno:", resultModern);

// -----------------------------------------------------------------------------
// Exemplo de retorno esperado
// -----------------------------------------------------------------------------
/*
[
  {
    groupName: "Group 1",
    processedOrders: [
      { id: 1, customer: "Ana", amount: 1000, status: "completed", tax: 100, finalAmount: 1100 },
      { id: 2, customer: "Carlos", amount: 200, status: "pending", tax: 20, finalAmount: 220 }
    ],
    totalAmount: 1100,
    completedCount: 1
  },
  {
    groupName: "Group 2",
    processedOrders: [
      { id: 3, customer: "Maria", amount: 500, status: "completed", tax: 50, finalAmount: 550 },
      { id: 4, customer: "John", amount: 800, status: "completed", tax: 80, finalAmount: 880 }
    ],
    totalAmount: 1430,
    completedCount: 2
  },
  {
    groupName: "Group 3",
    processedOrders: [
      { id: 5, customer: "Pedro", amount: 300, status: "cancelled", tax: 30, finalAmount: 330 },
      { id: 6, customer: "Julia", amount: 150, status: "completed", tax: 15, finalAmount: 165 }
    ],
    totalAmount: 165,
    completedCount: 1
  }
]
*/

// -----------------------------------------------------------------------------
// Por que essa versão é mais moderna?
// - usa Promise.all para rodar tarefas em paralelo
// - usa map para transformar cada pedido em um resultado processado
// - usa filter para separar pedidos concluídos
// - usa reduce para somar valores
// - deixa o código mais curto e mais declarativo
// -----------------------------------------------------------------------------





