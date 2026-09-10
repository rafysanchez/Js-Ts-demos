// RunJS-style JavaScript Data Pipeline
const transactions = [
  {
    id: "tx_101",
    customer: "Alice Smith",
    category: "Electronics",
    amount: 299.99,
    status: "completed",
  },
  {
    id: "tx_102",
    customer: "Bob Jones",
    category: "Books",
    amount: 45.5,
    status: "completed",
  },
  {
    id: "tx_103",
    customer: "Charlie Brown",
    category: "Electronics",
    amount: 850.0,
    status: "refunded",
  },
  {
    id: "tx_104",
    customer: "Diana Prince",
    category: "Fashion",
    amount: 120.0,
    status: "completed",
  },
  {
    id: "tx_105",
    customer: "Edward Norton",
    category: "Electronics",
    amount: 59.99,
    status: "completed",
  },
];

// 1. Filter completed orders
const completed = transactions.filter((t) => t.status === "completed");
console.log("Total completed orders:", completed.length);

// 2. Aggregate category revenue
const categoryTotals = completed.reduce((acc, t) => {
  acc[t.category] = (acc[t.category] || 0) + t.amount;
  return acc;
}, {});

console.table(categoryTotals);

// 3. Top spenders calculation
const totalRevenue = completed.reduce((sum, t) => sum + t.amount, 0);
const averageTicket = totalRevenue / completed.length;

console.log("Total Revenue: $" + totalRevenue.toFixed(2));
console.log("Average Ticket: $" + averageTicket.toFixed(2));

// Quick calculation result
Math.round(totalRevenue);
