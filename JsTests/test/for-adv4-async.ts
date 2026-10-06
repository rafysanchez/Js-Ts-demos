type GroupResult = {
    groupIndex: number;
    processed: number[];
    evens: number[];
    odds: number[];
    sum: number;
};

async function processNumberGroups(
    groups: number[][]
): Promise<GroupResult[]> {

    const results: GroupResult[] = [];

    let groupIndex = 0;

    for (const group of groups) {

        const processed: number[] = [];
        const evens: number[] = [];
        const odds: number[] = [];

        let sum = 0;

        for (const number of group) {

            const processedNumber =
                await simulateAsyncProcessing(number);

            processed.push(processedNumber);

            sum += processedNumber;

            if (processedNumber % 2 === 0) {
                evens.push(processedNumber);
            } else {
                odds.push(processedNumber);
            }
        }

        results.push({
            groupIndex,
            processed,
            evens,
            odds,
            sum
        });

        groupIndex++;
    }

    return results;
}

async function simulateAsyncProcessing(
    value: number
): Promise<number> {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve(value * 2);
        }, 100);

    });
}


// uso

/* const groups = [
  [1, 2, 3],
  [4, 5],
  [6, 7, 8]
];

const result3 = await processNumberGroups(groups);

console.log(result);

 */
// usando promise.all,

type GroupResult4 = {
    groupIndex: number;
    processed: number[];
    evens: number[];
    odds: number[];
    sum: number;
};

async function processNumberGroups4(
    groups: number[][]
): Promise<GroupResult[]> {

    const results: GroupResult4[] = [];

    let groupIndex = 0;

    for (const group of groups) {

        // Processes all numbers in this group in parallel
        const processed = await Promise.all(
            group.map(async (number) => {
                return await simulateAsyncProcessing4(number);
            })
        );

        const evens: number[] = [];
        const odds: number[] = [];

        let sum = 0;

        for (const number of processed) {
            sum += number;

            if (number % 2 === 0) {
                evens.push(number);
            } else {
                odds.push(number);
            }
        }

        results.push({
            groupIndex,
            processed,
            evens,
            odds,
            sum
        });

        groupIndex++;
    }

    return results;
}

async function simulateAsyncProcessing4(
    value: number
): Promise<number> {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value * 2);
        }, 100);
    });
}

// -----------------------------------------------------------------------------
// Versão moderna com reduce(), Map() e Promise.all()
// Mantém o código atual intacto e mostra uma abordagem mais declarativa.
// -----------------------------------------------------------------------------

async function processNumberGroupsModern(
    groups: number[][]
): Promise<GroupResult[]> {

    const results = await Promise.all(
        groups.map(async (group, groupIndex) => {
            const processed = await Promise.all(
                group.map(async (number) => simulateAsyncProcessing(number))
            );

            const evens = processed.filter((number) => number % 2 === 0);
            const odds = processed.filter((number) => number % 2 !== 0);
            const sum = processed.reduce((total, current) => total + current, 0);

            return {
                groupIndex,
                processed,
                evens,
                odds,
                sum
            };
        })
    );

    return results;
}

// -----------------------------------------------------------------------------
// Exemplo de uso da versão moderna.
// -----------------------------------------------------------------------------
const groupsModern = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8]
];

(async () => {
    const resultModern = await processNumberGroupsModern(groupsModern);
    console.log("Versão moderna:", resultModern);
})();

// Saída esperada:
// [
//   {
//     groupIndex: 0,
//     processed: [2, 4, 6],
//     evens: [2, 4, 6],
//     odds: [],
//     sum: 12
//   },
//   {
//     groupIndex: 1,
//     processed: [8, 10],
//     evens: [8, 10],
//     odds: [],
//     sum: 18
//   },
//   {
//     groupIndex: 2,
//     processed: [12, 14, 16],
//     evens: [12, 14, 16],
//     odds: [],
//     sum: 42
//   }
// ]

// -----------------------------------------------------------------------------
// Diferença prática: loop com await vs Promise.all()
// -----------------------------------------------------------------------------
//
// 1) Loop com await = processamento sequencial
//    Cada operação precisa terminar antes da próxima começar.
//
// Exemplo:
// async function processSequential() {
//   const result = [];
//
//   for (const n of [1, 2, 3]) {
//     const value = await simulateAsyncProcessing(n);
//     result.push(value);
//   }
//
//   return result;
// }
//
// Tempo aproximado:
// - 1° item: 100ms
// - 2° item: +100ms
// - 3° item: +100ms
// = cerca de 300ms em sequência
//
// -----------------------------------------------------------------------------
//
// 2) Promise.all() = processamento em paralelo
//    Todas as promessas começam praticamente ao mesmo tempo.
//
// Exemplo:
// async function processParallel() {
//   const values = await Promise.all(
//     [1, 2, 3].map(async (n) => simulateAsyncProcessing(n))
//   );
//
//   return values;
// }
//
// Tempo aproximado:
// - todos os itens disparam juntos
// - cerca de 100ms, não 300ms
//
// Isso funciona porque as tarefas são independentes:
// cada número pode ser processado sem depender do resultado do anterior.
//
// -----------------------------------------------------------------------------
//
// Quando usar cada um?
//
// - use loop com await quando:
//   * a próxima tarefa depende da anterior
//   * a ordem importa
//   * você quer controlar o fluxo passo a passo
//
// - use Promise.all() quando:
//   * as tarefas são independentes
//   * você quer acelerar o processamento
//   * várias operações podem rodar em paralelo
//
// Atenção:
// - Promise.all() rejeita se qualquer uma das promises falhar
// - isso é útil quando todas precisam dar certo para continuar
// - se você quiser continuar mesmo com falhas, pode usar Promise.allSettled()
//
// Exemplo de falha:
// const promises = [
//   Promise.resolve(10),
//   Promise.reject(new Error('erro')),
//   Promise.resolve(30)
// ];
//
// await Promise.all(promises); // rejeita ao encontrar o erro
//
// -----------------------------------------------------------------------------
// Em resumo:
// - await em loop = mais simples e mais controlado
// - Promise.all() = mais rápido para tarefas paralelas
// - escolha conforme dependência entre as operações