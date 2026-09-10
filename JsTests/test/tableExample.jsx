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
