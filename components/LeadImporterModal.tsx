import React, { useState } from 'react';
import type { ColdLead } from '../types';

interface LeadImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadsImported: (leads: ColdLead[]) => void;
}

const LeadImporterModal: React.FC<LeadImporterModalProps> = ({ isOpen, onClose, onLeadsImported }) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== 'text/csv') {
                setError('Invalid file type. Please upload a CSV file.');
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    };

    const parseCSV = (csvText: string): ColdLead[] => {
        const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) return [];

        const header = lines[0].split(',').map(h => h.trim().toLowerCase());
        const requiredHeaders = ['name', 'company', 'email', 'phone'];
        if (!requiredHeaders.every(h => header.includes(h))) {
            throw new Error(`CSV must contain the following headers: ${requiredHeaders.join(', ')}`);
        }
        
        const nameIndex = header.indexOf('name');
        const companyIndex = header.indexOf('company');
        const emailIndex = header.indexOf('email');
        const phoneIndex = header.indexOf('phone');

        return lines.slice(1).map((line, index) => {
            const data = line.split(',');
            return {
                id: `lead-${Date.now()}-${index}`,
                name: data[nameIndex]?.trim() || '',
                company: data[companyIndex]?.trim() || '',
                email: data[emailIndex]?.trim() || '',
                phone: data[phoneIndex]?.trim() || '',
                status: 'New',
            };
        });
    };

    const handleImport = () => {
        if (!file) {
            setError('Please select a file to import.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const leads = parseCSV(text);
                onLeadsImported(leads);
            } catch(err) {
                setError(err instanceof Error ? err.message : 'Failed to parse CSV file.');
            }
        };
        reader.onerror = () => {
            setError('Failed to read the file.');
        };
        reader.readAsText(file);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all animate-fade-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900">Import Leads from CSV</h2>
                </div>
                <div className="px-6 py-4 space-y-4 border-t border-b">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Instructions:</p>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 bg-gray-50 p-3 rounded-md">
                            <li>Your file must be in CSV format.</li>
                            <li>The first row must be a header row.</li>
                            <li>Required columns: <strong>name, company, email, phone</strong>.</li>
                            <li>The order of columns does not matter.</li>
                        </ul>
                    </div>
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Upload File</label>
                        <input 
                            type="file" 
                            id="file-upload" 
                            accept=".csv"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary-50 file:text-primary
                                hover:file:bg-primary-100"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>
                <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button 
                        type="button" 
                        onClick={handleImport}
                        disabled={!file}
                        className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 disabled:bg-gray-400"
                    >
                        Import
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadImporterModal;
