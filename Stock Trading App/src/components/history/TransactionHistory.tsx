import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';

export const TransactionHistory: React.FC = () => {
  const { transactions } = useStore();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Transaction History ({transactions.length})
        </h2>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-400 mb-2">No transactions yet</h3>
          <p className="text-gray-500">
            Your buy and sell transactions will appear here
          </p>
        </div>
      ) : (
        <div className="bg-dark-50 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-100 border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Symbol</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Shares</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {sortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-dark-100/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className={`flex items-center space-x-2 ${
                        transaction.type === 'buy' ? 'text-neon-500' : 'text-red-500'
                      }`}>
                        {transaction.type === 'buy' ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                        <span className="font-medium capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-white">{transaction.symbol}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white">{transaction.shares}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white">{formatCurrency(transaction.price)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-white">{formatCurrency(transaction.total)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">
                        {format(new Date(transaction.date), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};