import React from "react";

function TransactionsTable({ transactions = [] }) {
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor (R$)</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={`${transaction.id}-${index}`}
              data-testid="transaction-row"
            >
              <td data-testid="transaction-description">
                {transaction.description}
              </td>
              <td data-testid="transaction-amount">
                {transaction.amount.toFixed(2)}
              </td>
              <td data-testid="transaction-category">{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;

// Example of how to import and use the TransactionsTable component in another React file
/* 
// App.jsx
import React from 'react';
import TransactionsTable from './TransactionsTable';

const sampleTransactions = [
  { id: 1, description: 'Compra no supermercado', amount: 150.75, category: 'Alimentação' },
  { id: 2, description: 'Pagamento de conta de luz', amount: 80.50, category: 'Serviços' },
  { id: 3, description: 'Assinatura de streaming', amount: 29.90, category: 'Entretenimento' },
];

function App() {
  return (
    <div>
      <h1>Transações Recentes</h1>
      <TransactionsTable transactions={sampleTransactions} />
    </div>
  );
}

export default App; 
*/
