"use client";

import { useState } from "react";
import { Settings, Shield, AlertTriangle, CheckCircle, RefreshCw, Lock } from "lucide-react";

const CONTRACT_STATUS = {
  nft: { address: "0xABC...123", status: "Active", version: "v1.2.0" },
  token: { address: "0xDEF...456", status: "Active", version: "v1.1.0" },
  quiz: { address: "0x789...GHI", status: "Paused", version: "v1.0.0" },
};

export function ContractControls() {
  const [selectedContract, setSelectedContract] = useState("nft");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contract Controls</h1>
        <p className="text-gray-600 mt-1">Manage smart contracts and blockchain operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">NFT Contract</h3>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-1" />
              Active
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <div>Address: {CONTRACT_STATUS.nft.address}</div>
            <div>Version: {CONTRACT_STATUS.nft.version}</div>
            <div>Total Minted: 12,450 NFTs</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Token Contract</h3>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-1" />
              Active
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <div>Address: {CONTRACT_STATUS.token.address}</div>
            <div>Version: {CONTRACT_STATUS.token.version}</div>
            <div>Total Supply: 10M Tokens</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quiz Contract</h3>
            <div className="flex items-center text-yellow-600">
              <AlertTriangle className="w-5 h-5 mr-1" />
              Paused
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <div>Address: {CONTRACT_STATUS.quiz.address}</div>
            <div>Version: {CONTRACT_STATUS.quiz.version}</div>
            <div>Total Quizzes: 156</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-[#58CC02]" />
            Contract Management
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Contract
              </label>
              <select
                value={selectedContract}
                onChange={(e) => setSelectedContract(e.target.value)}
                className="input-field"
              >
                <option value="nft">NFT Certificate Contract</option>
                <option value="token">Campus Credit Token</option>
                <option value="quiz">Quiz Reward Contract</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="btn-primary flex items-center justify-center cursor-pointer">
                <RefreshCw className="w-4 h-4 mr-2" />
                Update
              </button>
              <button className="btn-secondary flex items-center justify-center cursor-pointer">
                <Lock className="w-4 h-4 mr-2" />
                Pause
              </button>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Contract Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-gray-900">Mint NFT Certificate</div>
                  <div className="text-sm text-gray-600">Create new student certificate</div>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-gray-900">Update Token Supply</div>
                  <div className="text-sm text-gray-600">Modify token economics</div>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-gray-900">Emergency Pause</div>
                  <div className="text-sm text-gray-600">Halt all contract operations</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-[#FF6F61]" />
            Security & Permissions
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Admin Roles</h4>
              <div className="space-y-2">
                {[
                  { role: "Super Admin", address: "0x1111...AAAA", permissions: "Full Control" },
                  {
                    role: "Course Manager",
                    address: "0x2222...BBBB",
                    permissions: "Course Operations",
                  },
                  {
                    role: "Token Manager",
                    address: "0x3333...CCCC",
                    permissions: "Token Operations",
                  },
                ].map((admin, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{admin.role}</div>
                      <div className="text-sm text-gray-600">{admin.address}</div>
                    </div>
                    <div className="text-sm text-gray-600">{admin.permissions}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Security Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Multi-sig Required</span>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Enabled
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Emergency Pause</span>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Available
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Upgrade Protection</span>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Active
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Gas Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Gas Price (Gwei)</label>
                  <input type="number" defaultValue="20" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Gas Limit</label>
                  <input type="number" defaultValue="300000" className="input-field" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Contract Events</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contract
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gas Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  event: "NFT Minted",
                  contract: "Certificate",
                  tx: "0xabcd...1234",
                  gas: "45,230",
                  time: "2 min ago",
                },
                {
                  event: "Tokens Transferred",
                  contract: "Credit Token",
                  tx: "0xefgh...5678",
                  gas: "21,000",
                  time: "5 min ago",
                },
                {
                  event: "Quiz Completed",
                  contract: "Quiz Reward",
                  tx: "0xijkl...9012",
                  gas: "32,100",
                  time: "8 min ago",
                },
              ].map((event, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.event}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event.contract}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-mono">
                    {event.tx}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.gas}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.time}
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
