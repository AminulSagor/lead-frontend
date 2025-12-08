'use client';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues> {
  control: Control<T>;
  currencyName: FieldPath<T>;
  amountName: FieldPath<T>;
  label: string;
  placeholder?: string;
}

export function CurrencyInputField<T extends FieldValues>({
  control,
  currencyName,
  amountName,
  label,
  placeholder = 'Enter amount',
}: Props<T>) {
  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>

      <div className="relative mt-1">
        {/* Currency inside input (left side) */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <FormField
            control={control}
            name={currencyName}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-full border-none bg-transparent shadow-none w-20">
                  <SelectValue placeholder="Cur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="BDT">BDT</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Amount Input */}
        <FormField
          control={control}
          name={amountName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder={placeholder}
                  {...field}
                  className="pl-20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
