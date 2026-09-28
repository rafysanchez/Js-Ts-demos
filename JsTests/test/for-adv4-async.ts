
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