// estudos com promises e async/await


type Order = {
    id: number;
    customer: string;
    category: string;
    amount: number;
    status: "completed" | "pending" | "cancelled";
};

type ProcessedOrder = Order & {
    tax: number;
    finalAmount: number;
};

type GroupResult = {
    groupName: string;
    processedOrders: ProcessedOrder[];
    totalAmount: number;
    completedCount: number;
};

async function processOrderGroups(
    groups: Order[][]
): Promise<GroupResult[]> {

    const results: GroupResult[] = [];

    let groupIndex = 1;

    for (const group of groups) {

        const processedOrders = await Promise.all(
            group.map(order => processOrder(order))
        );

        let totalAmount = 0;
        let completedCount = 0;

        for (const order of processedOrders) {

            if (order.status === "completed") {
                totalAmount += order.finalAmount;
                completedCount++;
            }
        }

        results.push({
            groupName: `Group ${groupIndex}`,
            processedOrders,
            totalAmount,
            completedCount
        });

        groupIndex++;
    }

    return results;
}

async function processOrder(
    order: Order
): Promise<ProcessedOrder> {

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

// input

const groups: Order[][] = [
    [
        {
            id: 1,
            customer: "Ana",
            category: "Electronics",
            amount: 1000,
            status: "completed"
        },
        {
            id: 2,
            customer: "Carlos",
            category: "Books",
            amount: 200,
            status: "pending"
        }
    ],

    [
        {
            id: 3,
            customer: "Maria",
            category: "Clothing",
            amount: 500,
            status: "completed"
        },
        {
            id: 4,
            customer: "John",
            category: "Electronics",
            amount: 800,
            status: "completed"
        }
    ]
];

const result = await processOrderGroups(groups);

console.log(result);

// analikse

for (const group of groups) {

    const processedOrders = await Promise.all(
        group.map(order => processOrder(order))
    );

    for (const order of processedOrders) {

        if (order.status === "completed") {
            // classification / aggregation
        }
    }
}

//

for (const group of groups) {
    await Promise.all(...)
}

// avalie

const results = await Promise.all(
    groups.map(async (group, index) => {

        const processedOrders = await Promise.all(
            group.map(order => processOrder(order))
        );

        let totalAmount = 0;
        let completedCount = 0;

        for (const order of processedOrders) {

            if (order.status === "completed") {
                totalAmount += order.finalAmount;
                completedCount++;
            }
        }

        return {
            groupName: `Group ${index + 1}`,
            processedOrders,
            totalAmount,
            completedCount
        };
    })
);





