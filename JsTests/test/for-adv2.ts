type NumberAnalysis = {
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

function analyzeNumbers(numbers: number[]): NumberAnalysis {
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


// gere um exemplo de uso da função analyzeNumbers com um array de números e exiba o resultado no console
const numbersArray = [5, 3, 8, 3, 2, 7, 8, 1, 4, 6];
const analysisResult = analyzeNumbers(numbersArray);
console.log(analysisResult);

// -----------------------------------------------------------------------------
// Versão moderna com reduce() e Map()
// Mantém o comportamento da função original, mas usa abordagens mais declarativas.
// -----------------------------------------------------------------------------
function analyzeNumbersModern(numbers: number[]): NumberAnalysis {
  const original = [...numbers];

  // 1) Separa pares e ímpares.
  const evens = numbers.filter((n) => n % 2 === 0);
  const odds = numbers.filter((n) => n % 2 !== 0);

  // 2) Soma todos os valores.
  const sum = numbers.reduce((total, current) => total + current, 0);

  // 3) Descobre o maior e o menor com reduce().
  const largest = numbers.length > 0
    ? numbers.reduce((max, current) => (current > max ? current : max), numbers[0])
    : null;

  const smallest = numbers.length > 0
    ? numbers.reduce((min, current) => (current < min ? current : min), numbers[0])
    : null;

  // 4) Detecta duplicados sem nested loop clássico.
  //    Cria um Map com contador de ocorrências.
  const countMap = new Map<number, number>();

  numbers.forEach((number) => {
    const currentCount = countMap.get(number) ?? 0;
    countMap.set(number, currentCount + 1);
  });

  const duplicates = Array.from(countMap.entries())
    .filter(([_, count]) => count > 1)
    .map(([value]) => value)
    .sort((a, b) => a - b);

  // 5) Ordena números em ordem crescente.
  const sorted = [...numbers].sort((a, b) => a - b);

  // 6) Calcula média.
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
const numbersArrayModern = [5, 3, 8, 3, 2, 7, 8, 1, 4, 6];
const analysisResultModern = analyzeNumbersModern(numbersArrayModern);
console.log("Versão moderna:", analysisResultModern);

// Saída esperada:
// {
//   original: [5, 3, 8, 3, 2, 7, 8, 1, 4, 6],
//   sorted: [1, 2, 3, 3, 4, 5, 6, 7, 8, 8],
//   evens: [8, 2, 8, 4, 6],
//   odds: [5, 3, 3, 7, 1],
//   largest: 8,
//   smallest: 1,
//   sum: 47,
//   average: 4.7,
//   duplicates: [3, 8]
// }
