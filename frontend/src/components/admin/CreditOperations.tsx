'use client';

import { useState } from 'react';
import { Coins, Send, Plus, Minus, History, Search } from 'lucide-react';

const RECENT_TRANSACTIONS = [
  {
    id: '1',
    type: 'Reward',
    recipient: '0x1234...5678',
    amount: 500,
    reason: 'Course Completion: Blockchain Fundamentals',
    timestamp: '2024-12-28 14:30:00',
    status: 'Completed'
  },
  {
    id: '2',
    type: 'Manual',
    recipient: '0x5678...9012',
    amount: 1000,
    reason: 'Admin Bonus Grant',
    timestamp: '2024-12-28 13:15:00',
    status: 'Completed'
  },
  {
    id: '3',
    type: 'Penalty',
    recipient: '0x9012...3456',
    amount: -200,
    reason: 'Violation Penalty',
    timestamp: '2024-12-28 12:00:00',
    status: 'Completed'
  }
];

export function CreditOperations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleMintTokens = () => {
    console.log('Minting tokens:', { recipient, amount, reason });
    // Reset form
    setRecipient('');
    setAmount('');
    setReason('');
  };

  const filteredTransactions = RECENT_TRANSACTIONS.filter(tx =>
    tx.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Credit Operations</h1>
        <p className="text-gray-600 mt-1">Manage token distribution and credit transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Supply</p>
              <p className="text-2xl font-bold text-gray-900">10M</p>
            </div>
            <Coins className="w-8 h-8 text-[#58CC02]" />
          </div>
          <div className="mt-2 text-sm text-gray-500">Campus Credits</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Circulating</p>
              <p className="text-2xl font-bold text-gray-900">2.5M</p>
            </div>
            <Coins className="w-8 h-8 text-[#FF6F61]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+18% this month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Rewards</p>
              <p className="text-2xl font-bold text-gray-900">45K</p>
            </div>
            <Send className="w-8 h-8 text-[#4E6C50]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+25% from yesterday</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Holders</p>
              <p className="text-2xl font-bold text-gray-900">8.2K</p>
            </div>
            <Coins className="w-8 h-8 text-[#58CC02]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+12% this month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Token Operations */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Coins className="w-6 h-6 mr-2 text-[#58CC02]" />
            Token Operations
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for token transfer"
                className="input-field"
              />
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleMintTokens}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Mint Tokens
              </button>
              <button className="flex-1 btn-secondary flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" />
                Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#58CC02] transition-colors text-center">
              <div className="w-8 h-8 bg-[#58CC02] rounded-lg flex items-center justify-center mx-auto mb-2">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-900">Bulk Reward</div>
              <div className="text-xs text-gray-500">Multiple students</div>
            </button>

            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF6F61] transition-colors text-center">
              <div className="w-8 h-8 bg-[#FF6F61] rounded-lg flex items-center justify-center mx-auto mb-2">
                <Minus className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-900">Apply Penalty</div>
              <div className="text-xs text-gray-500">Deduct tokens</div>
            </button>

            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#4E6C50] transition-colors text-center">
              <div className="w-8 h-8 bg-[#4E6C50] rounded-lg flex items-center justify-center mx-auto mb-2">
                <History className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-900">View History</div>
              <div className="text-xs text-gray-500">All transactions</div>
            </button>

            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#58CC02] transition-colors text-center">
              <div className="w-8 h-8 bg-[#58CC02] rounded-lg flex items-center justify-center mx-auto mb-2">
                <Send className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-900">Batch Transfer</div>
              <div className="text-xs text-gray-500">CSV upload</div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <History className="w-6 h-6 mr-2 text-[#4E6C50]" />
            Recent Transactions
          </h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      tx.type === 'Reward' ? 'bg-green-100 text-green-800' :
                      tx.type === 'Manual' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.recipient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {tx.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}