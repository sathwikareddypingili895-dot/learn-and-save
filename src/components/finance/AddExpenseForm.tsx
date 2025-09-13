import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewExpense {
  description: string;
  amount: string;
  category: string;
}

interface AddExpenseFormProps {
  newExpense: NewExpense;
  setNewExpense: (expense: NewExpense) => void;
  onAddExpense: () => void;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ 
  newExpense, 
  setNewExpense, 
  onAddExpense 
}) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg h-fit">
      <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Expense description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
        />
        <Input
          type="number"
          placeholder="Amount ($)"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
        />
        <Button
          onClick={onAddExpense}
          className="w-full"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
        <p className="text-xs text-muted-foreground">
          Category will be automatically detected using AI
        </p>
      </div>
    </div>
  );
};