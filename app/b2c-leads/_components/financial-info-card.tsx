'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';

const FinancialInformationCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Financial Information
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        {/* Income */}
        <InputField
          control={control}
          name="salary"
          label="Salary *"
          placeholder="Enter current salary"
        />
        <InputField
          control={control}
          name="totalIncome"
          label="Total Income"
          placeholder="Enter total income"
        />
        <InputField
          control={control}
          name="incomeHistory"
          label="Income History"
          placeholder="Enter income history"
        />

        {/* Assets & Liabilities */}
        <InputField
          control={control}
          name="savings"
          label="Savings"
          placeholder="Enter savings amount"
        />
        <InputField
          control={control}
          name="investments"
          label="Investments"
          placeholder="Enter investments"
        />
        <InputField
          control={control}
          name="cryptocurrency"
          label="Cryptocurrency"
          placeholder="Enter cryptocurrency holdings"
        />
        <InputField
          control={control}
          name="loans"
          label="Loans"
          placeholder="Enter loans details"
        />
        <InputField
          control={control}
          name="debts"
          label="Debts"
          placeholder="Enter debts details"
        />

        {/* Banking & Credit */}
        <InputField
          control={control}
          name="bankAccounts"
          label="Bank Accounts"
          placeholder="Enter bank accounts"
        />
        <InputField
          control={control}
          name="creditScore"
          label="Credit Score"
          placeholder="Enter credit score"
        />
        <InputField
          control={control}
          name="transactionHistory"
          label="Transaction History"
          placeholder="Enter transaction history"
        />
        <InputField
          control={control}
          name="insurancePolicies"
          label="Insurance Policies"
          placeholder="Enter insurance policies"
        />
      </CardContent>
    </Card>
  );
};

export default FinancialInformationCard;
