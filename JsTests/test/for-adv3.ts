type NumberAnalysis3 = {
    original: number[];
    sorted: number[];
    evens: number[];
    odds: number[];
    largest: number | null;
    smallest: number | null;
    sum: number;
    average: number;
    duplicates: number[];
};

function analyzeNumbers3(numbers: number[]): NumberAnalysis3 {
    const evens: number[] = [];
    const odds: number[] = [];
    const duplicates: number[] = [];

    let largest: number | null = null;
    let smallest: number | null = null;
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        const current = numbers[i];

        sum += current;

        if (current % 2 === 0) {
            evens.push(current);
        } else {
            odds.push(current);
        }

        if (largest === null || current > largest) {
            largest = current;
        }

        if (smallest === null || current < smallest) {
            smallest = current;
        }

        // nested loop: detect duplicates
        let count = 0;

        for (let j = 0; j < numbers.length; j++) {
            if (numbers[j] === current) {
                count++;
            }
        }

        if (
            count > 1 &&
            !duplicates.includes(current)
        ) {
            duplicates.push(current);
        }
    }

    const sorted = [...numbers];

    sorted.sort((a, b) => a - b);

    const average =
        numbers.length > 0
            ? sum / numbers.length
            : 0;

    return {
        original: numbers,
        sorted,
        evens,
        odds,
        largest,
        smallest,
        sum,
        average,
        duplicates
    };
}
//
const numbers = [
    10,
    5,
    8,
    20,
    5,
    3,
    10,
    15,
    2
];

const result = analyzeNumbers3(numbers);

console.log(result);

//
/* 
{
  original: [10, 5, 8, 20, 5, 3, 10, 15, 2],

  sorted: [2, 3, 5, 5, 8, 10, 10, 15, 20],

  evens: [10, 8, 20, 10, 2],

  odds: [5, 5, 3, 15],

  largest: 20,

  smallest: 2,

  sum: 78,

  average: 8.666666666666666,

  duplicates: [10, 5]
} */

// -----------------------------------------------------------------------------
// Versão moderna com reduce() e Map()
// Mantém o código original intacto e adiciona uma alternativa mais declarativa.
// -----------------------------------------------------------------------------
function analyzeNumbers3Modern(numbers: number[]): NumberAnalysis3 {
    const original = [...numbers];

    // 1) Separa pares e ímpares.
    const evens = numbers.filter((n) => n % 2 === 0);
    const odds = numbers.filter((n) => n % 2 !== 0);

    // 2) Soma todos os valores.
    const sum = numbers.reduce((total, current) => total + current, 0);

    // 3) Encontra maior e menor número com reduce().
    const largest = numbers.length > 0
        ? numbers.reduce((max, current) => current > max ? current : max, numbers[0])
        : null;

    const smallest = numbers.length > 0
        ? numbers.reduce((min, current) => current < min ? current : min, numbers[0])
        : null;

    // 4) Detecta duplicados usando Map().
    const countMap = new Map<number, number>();

    numbers.forEach((number) => {
        const count = countMap.get(number) ?? 0;
        countMap.set(number, count + 1);
    });

    const duplicates = Array.from(countMap.entries())
        .filter(([_, count]) => count > 1)
        .map(([value]) => value)
        .sort((a, b) => a - b);

    // 5) Ordena os números em ordem crescente.
    const sorted = [...numbers].sort((a, b) => a - b);

    // 6) Cálculo da média.
    const average = numbers.length > 0 ? sum / numbers.length : 0;

    return {
        original,
        sorted,
        evens,
        odds,
        largest,
        smallest,
        sum,
        average,
        duplicates
    };
}

// -----------------------------------------------------------------------------
// Exemplo de uso da versão moderna.
// -----------------------------------------------------------------------------
const numbersModern = [10, 5, 8, 20, 5, 3, 10, 15, 2];
const resultModern = analyzeNumbers3Modern(numbersModern);
console.log("Versão moderna:", resultModern);

// Saída esperada:
// {
//   original: [10, 5, 8, 20, 5, 3, 10, 15, 2],
//   sorted: [2, 3, 5, 5, 8, 10, 10, 15, 20],
//   evens: [10, 8, 20, 10, 2],
//   odds: [5, 5, 3, 15],
//   largest: 20,
//   smallest: 2,
//   sum: 78,
//   average: 8.666666666666666,
//   duplicates: [5, 10]
// }


