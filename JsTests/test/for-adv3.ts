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


