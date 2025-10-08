import React, { useState, useMemo } from 'react';
import { CalculatorIcon } from './icons/CalculatorIcon';

const CommissionCalculator: React.FC = () => {
    const [projectValue, setProjectValue] = useState('');
    const [commissionRate, setCommissionRate] = useState('10');

    const { commissionEarned, agencyFee } = useMemo(() => {
        const value = parseFloat(projectValue);
        const rate = parseFloat(commissionRate);

        if (isNaN(value) || isNaN(rate) || value <= 0 || rate <= 0) {
            return { commissionEarned: 0, agencyFee: 0 };
        }

        const commission = value * (rate / 100);
        const fee = value - commission;

        return { commissionEarned: commission, agencyFee: fee };
    }, [projectValue, commissionRate]);

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Input Form */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                       <CalculatorIcon className="h-5 w-5 mr-2 text-primary" />
                       Calculate Commission
                    </h3>
                    <div>
                        <label htmlFor="projectValue" className="block text-sm font-medium text-gray-700">
                            Total Project Value ($)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                name="projectValue"
                                id="projectValue"
                                className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                value={projectValue}
                                onChange={(e) => setProjectValue(e.target.value)}
                                aria-describedby="project-value-currency"
                            />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700">
                            Freelancer Commission Rate (%)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                             <input
                                type="number"
                                name="commissionRate"
                                id="commissionRate"
                                className="focus:ring-primary focus:border-primary block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="10"
                                value={commissionRate}
                                onChange={(e) => setCommissionRate(e.target.value)}
                                min="1"
                                max="100"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results View */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Breakdown</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-600">Freelancer Commission:</p>
                            <p className="text-lg font-semibold text-green-600">
                                {formatCurrency(commissionEarned)}
                            </p>
                        </div>
                         <div className="flex justify-between items-center border-t pt-4">
                            <p className="text-sm font-medium text-gray-600">Agency Net Fee:</p>
                            <p className="text-lg font-semibold text-primary-700">
                                {formatCurrency(agencyFee)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center text-gray-800 bg-gray-200 p-3 rounded-md mt-2">
                            <p className="text-sm font-bold">Total Project Value:</p>
                            <p className="text-lg font-bold">
                                {formatCurrency(parseFloat(projectValue) || 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommissionCalculator;