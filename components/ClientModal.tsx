import React, { useState, useEffect } from 'react';
import type { Client } from '../types';

interface ClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (client: Client) => void;
    client: Client | null;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSave, client }) => {
    const [formData, setFormData] = useState<Omit<Client, 'id'>>({
        name: '',
        company: '',
        email: '',
        phone: '',
        projects: 0,
        totalBilled: 0
    });

    useEffect(() => {
        if (client) {
            setFormData(client);
        } else {
            setFormData({ name: '', company: '', email: '', phone: '', projects: 0, totalBilled: 0 });
        }
    }, [client, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            id: client?.id || '', // id will be replaced on save for new clients
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all animate-fade-in"
                onClick={e => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900">{client ? 'Edit Client' : 'Add New Client'}</h2>
                    </div>
                    <div className="px-6 py-4 space-y-4 border-t border-b">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                                <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientModal;
