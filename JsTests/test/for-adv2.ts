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
