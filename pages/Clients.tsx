import React, { useState } from 'react';
import type { Client } from '../types';
import { mockClients } from '../data/mockData';
import ClientModal from '../components/ClientModal';

const Clients: React.FC = () => {
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const handleSaveClient = (client: Client) => {
        if (selectedClient) {
            setClients(clients.map(c => c.id === client.id ? client : c));
        } else {
            const newClient = { ...client, id: `client-${Date.now()}`};
            setClients([newClient, ...clients]);
        }
        setIsModalOpen(false);
        setSelectedClient(null);
    };

    const openAddModal = () => {
        setSelectedClient(null);
        setIsModalOpen(true);
    };

    const openEditModal = (client: Client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Clients</h2>
                <button 
                    onClick={openAddModal}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700">
                    New Client
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Total Billed</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                    <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-800">{client.name}</td>
                        <td className="py-3 px-4 text-gray-700">{client.company}</td>
                        <td className="py-3 px-4 text-gray-700">{client.email}</td>
                        <td className="py-3 px-4 text-gray-700">${client.totalBilled.toLocaleString()}</td>
                        <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => openEditModal(client)} 
                                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-md hover:bg-primary-200 transition-colors"
                                >
                                    Edit
                                </button>
                                <a 
                                    href={`mailto:${client.email}?subject=${encodeURIComponent('Following up from Agency OS')}&body=${encodeURIComponent(`Hi ${client.name},\n\nHope you're having a great week.\n\nBest,\nTenant Admin`)}`}
                                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-md hover:bg-primary-200 transition-colors"
                                >
                                    Contact
                                </a>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <ClientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveClient}
                client={selectedClient}
            />
        </div>
    );
};

export default Clients;