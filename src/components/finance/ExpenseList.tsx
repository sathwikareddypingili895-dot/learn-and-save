import React from 'react';
import { Coffee, BookOpen, Car, Gamepad2, Home, ShoppingCart } from 'lucide-react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  auto: boolean;
}

interface ExpenseListProps {
  expenses: Expense[];
}

const categoryIcons = {
  'Food & Dining': Coffee,
  'Education': BookOpen,
  'Transportation': Car,
  'Entertainment': Gamepad2,
  'Housing': Home,
  'Miscellaneous': ShoppingCart
};

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <div className="bg-card rounded-lg shadow-lg">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Recent Expenses</h3>
        <p className="text-muted-foreground text-sm">Automatically categorized using AI</p>
      </div>
      <div className="divide-y divide-border">
        {expenses.map((expense) => {
          const IconComponent = categoryIcons[expense.category as keyof typeof categoryIcons] || ShoppingCart;
          return (
            <div key={expense.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{expense.category}</span>
                      {expense.auto && (
                        <span className="ml-2 px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                          AI Categorized
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{expense.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};