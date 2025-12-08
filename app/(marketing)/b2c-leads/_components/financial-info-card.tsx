'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';
import { CurrencyInputField } from './currency-input-field';
import { B2CProfileSchemaType } from './b2c-create-form-schema';
import TextareaField from '@/components/text-area';

const FinancialInformationCard = () => {
  const { control } = useFormContext<B2CProfileSchemaType>();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Financial Information
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-4">
        {/* Income */}

        <CurrencyInputField
          control={control}
          currencyName="salary.salaryAmount"
          amountName="salary.salaryCurrency"
          label="Salary *"
          placeholder="Enter Salary Amount"
        />

        <CurrencyInputField
          control={control}
          currencyName="totalIncome.totalCurrency"
          amountName="totalIncome.totalAmount"
          label="Other Income"
          placeholder="Enter Total Income Amount"
        />
        <InputField
          control={control}
          name="creditScore"
          label="Credit Score"
          placeholder="Enter credit score"
        />

        <TextareaField
          control={control}
          name="incomeHistory"
          label="Income History"
          placeholder="Enter income history"
        />

        {/* Assets & Liabilities */}

        <TextareaField
          control={control}
          name="assets"
          label="Assets"
          placeholder="Enter assets"
        />

        <TextareaField
          control={control}
          name="savings"
          label="Savings"
          placeholder="Enter savings amount"
        />
        <TextareaField
          control={control}
          name="investments"
          label="Investments"
          placeholder="Enter investments"
        />
        <TextareaField
          control={control}
          name="cryptocurrency"
          label="Cryptocurrency"
          placeholder="Enter cryptocurrency holdings"
        />
        <TextareaField
          control={control}
          name="loans"
          label="Loans"
          placeholder="Enter loans details"
        />
        <TextareaField
          control={control}
          name="debts"
          label="Debts"
          placeholder="Enter debts details"
        />

        {/* Banking & Credit */}
        <TextareaField
          control={control}
          name="bankAccounts"
          label="Bank Accounts"
          placeholder="Enter bank accounts"
        />

        <TextareaField
          control={control}
          name="transactionHistory"
          label="Transaction History"
          placeholder="Enter transaction history"
        />
        <TextareaField
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
