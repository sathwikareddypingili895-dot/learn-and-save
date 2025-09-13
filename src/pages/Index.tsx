import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, DollarSign, Lightbulb, Coffee, BookOpen, Car, Gamepad2, Home, ShoppingCart, Calendar, BarChart3, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { StatCard } from '@/components/finance/StatCard';
import { TabNavigation } from '@/components/finance/TabNavigation';
import { AlertBanner } from '@/components/finance/AlertBanner';
import { ExpenseList } from '@/components/finance/ExpenseList';
import { AddExpenseForm } from '@/components/finance/AddExpenseForm';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Coffee at Starbucks', amount: 5.50, category: 'Food & Dining', date: '2024-09-10', auto: true },
    { id: 2, description: 'Textbook purchase', amount: 120.00, category: 'Education', date: '2024-09-09', auto: true },
    { id: 3, description: 'Gas station fill up', amount: 35.00, category: 'Transportation', date: '2024-09-08', auto: true },
    { id: 4, description: 'Grocery shopping Walmart', amount: 67.50, category: 'Food & Dining', date: '2024-09-07', auto: true },
    { id: 5, description: 'Movie tickets AMC', amount: 24.00, category: 'Entertainment', date: '2024-09-06', auto: true }
  ]);
  
  const [budget, setBudget] = useState({
    'Food & Dining': { limit: 300, spent: 73 },
    'Education': { limit: 200, spent: 120 },
    'Transportation': { limit: 100, spent: 35 },
    'Entertainment': { limit: 150, spent: 24 },
    'Housing': { limit: 800, spent: 750 },
    'Miscellaneous': { limit: 100, spent: 45 }
  });

  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 1000, current: 250, deadline: '2024-12-31' },
    { id: 2, name: 'Laptop Upgrade', target: 1500, current: 400, deadline: '2024-11-30' },
    { id: 3, name: 'Spring Break Trip', target: 800, current: 150, deadline: '2025-03-01' }
  ]);

  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'Food & Dining' });
  const [alerts, setAlerts] = useState([]);

  // AI-powered expense categorization
  const categorizeExpense = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('coffee') || desc.includes('food') || desc.includes('restaurant') || desc.includes('grocery') || desc.includes('dining')) return 'Food & Dining';
    if (desc.includes('book') || desc.includes('tuition') || desc.includes('school') || desc.includes('course') || desc.includes('education')) return 'Education';
    if (desc.includes('gas') || desc.includes('uber') || desc.includes('bus') || desc.includes('train') || desc.includes('transport')) return 'Transportation';
    if (desc.includes('movie') || desc.includes('game') || desc.includes('entertainment') || desc.includes('concert') || desc.includes('streaming')) return 'Entertainment';
    if (desc.includes('rent') || desc.includes('utilities') || desc.includes('housing') || desc.includes('apartment')) return 'Housing';
    return 'Miscellaneous';
  };

  // Predictive spending analysis
  const getPredictiveInsights = () => {
    const currentSpending = Object.values(budget).reduce((sum, cat) => sum + cat.spent, 0);
    const totalBudget = Object.values(budget).reduce((sum, cat) => sum + cat.limit, 0);
    const daysInMonth = 30;
    const dayOfMonth = 13;
    const projectedSpending = (currentSpending / dayOfMonth) * daysInMonth;
    
    return {
      projectedSpending: projectedSpending.toFixed(2),
      savingsRate: ((totalBudget - projectedSpending) / totalBudget * 100).toFixed(1),
      riskLevel: projectedSpending > totalBudget ? 'high' : projectedSpending > totalBudget * 0.8 ? 'medium' : 'low'
    };
  };

  // Budget optimization suggestions
  const getBudgetOptimization = () => {
    const suggestions: string[] = [];
    Object.entries(budget).forEach(([category, data]) => {
      const usage = (data.spent / data.limit) * 100;
      if (usage > 80) {
        suggestions.push(`Consider reducing ${category} spending - you've used ${usage.toFixed(0)}% of your budget`);
      }
    });
    return suggestions;
  };

  // Alert system
  useEffect(() => {
    const newAlerts: any[] = [];
    Object.entries(budget).forEach(([category, data]) => {
      const usage = (data.spent / data.limit) * 100;
      if (usage > 90) {
        newAlerts.push({ type: 'danger', message: `${category} budget almost exceeded (${usage.toFixed(0)}%)` });
      } else if (usage > 75) {
        newAlerts.push({ type: 'warning', message: `${category} spending is high (${usage.toFixed(0)}%)` });
      }
    });
    setAlerts(newAlerts);
  }, [budget]);

  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const autoCategory = categorizeExpense(newExpense.description);
      const expense = {
        id: expenses.length + 1,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: autoCategory,
        date: new Date().toISOString().split('T')[0],
        auto: true
      };
      
      setExpenses([...expenses, expense]);
      
      // Update budget
      setBudget(prev => ({
        ...prev,
        [autoCategory]: {
          ...prev[autoCategory as keyof typeof prev],
          spent: prev[autoCategory as keyof typeof prev].spent + expense.amount
        }
      }));
      
      setNewExpense({ description: '', amount: '', category: 'Food & Dining' });
    }
  };

  const categoryIcons = {
    'Food & Dining': Coffee,
    'Education': BookOpen,
    'Transportation': Car,
    'Entertainment': Gamepad2,
    'Housing': Home,
    'Miscellaneous': ShoppingCart
  };

  const spendingTrend = [
    { date: 'Sep 1', amount: 45 },
    { date: 'Sep 3', amount: 78 },
    { date: 'Sep 5', amount: 125 },
    { date: 'Sep 7', amount: 192 },
    { date: 'Sep 9', amount: 312 },
    { date: 'Sep 11', amount: 385 },
    { date: 'Sep 13', amount: 447 }
  ];

  const categoryData = Object.entries(budget).map(([name, data]) => ({
    name,
    spent: data.spent,
    remaining: Math.max(0, data.limit - data.spent)
  }));

  const pieData = Object.entries(budget).map(([name, data]) => ({
    name,
    value: data.spent
  }));

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))'];

  const insights = getPredictiveInsights();
  const optimizations = getBudgetOptimization();

  const totalSpent = Object.values(budget).reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = Object.values(budget).reduce((sum, cat) => sum + cat.limit, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-card rounded-lg shadow-lg mb-6 p-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Finance Manager</h1>
          <p className="text-muted-foreground">AI-powered budgeting and expense tracking for smart students</p>
        </div>

        {/* Alerts */}
        <AlertBanner alerts={alerts} />

        {/* Navigation */}
        <TabNavigation 
          tabs={['dashboard', 'expenses', 'budget', 'goals', 'analytics']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatCard
                title="Total Spent"
                value={`$${totalSpent.toFixed(2)}`}
                icon={DollarSign}
                trend="neutral"
              />
              <StatCard
                title="Remaining Budget"
                value={`$${(totalBudget - totalSpent).toFixed(2)}`}
                icon={TrendingUp}
                trend="up"
              />
              <StatCard
                title="Active Goals"
                value={goals.length.toString()}
                icon={Target}
                trend="neutral"
              />
            </div>

            {/* AI Insights */}
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-warning" />
                AI Insights
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-primary">Projected Monthly Spending</p>
                  <p className="text-lg font-bold text-primary">${insights.projectedSpending}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm font-medium text-success">Savings Rate</p>
                  <p className="text-lg font-bold text-success">{insights.savingsRate}%</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  insights.riskLevel === 'high' ? 'bg-destructive/10' : insights.riskLevel === 'medium' ? 'bg-warning/10' : 'bg-success/10'
                }`}>
                  <p className={`text-sm font-medium ${
                    insights.riskLevel === 'high' ? 'text-destructive' : insights.riskLevel === 'medium' ? 'text-warning-foreground' : 'text-success'
                  }`}>Risk Level</p>
                  <p className={`text-lg font-bold capitalize ${
                    insights.riskLevel === 'high' ? 'text-destructive' : insights.riskLevel === 'medium' ? 'text-warning-foreground' : 'text-success'
                  }`}>{insights.riskLevel}</p>
                </div>
              </div>
            </div>

            {/* Spending Trend */}
            <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Spending Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Cumulative Spending']} />
                  <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Optimization Tips */}
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Smart Tips</h3>
              <div className="space-y-3">
                {optimizations.length > 0 ? optimizations.map((tip, index) => (
                  <div key={index} className="p-3 bg-warning/10 rounded-lg border-l-4 border-warning">
                    <p className="text-sm text-warning-foreground">{tip}</p>
                  </div>
                )) : (
                  <div className="p-3 bg-success/10 rounded-lg border-l-4 border-success">
                    <p className="text-sm text-success">Great job! You're staying within your budget limits.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExpenseList expenses={expenses} />
            </div>
            <AddExpenseForm 
              newExpense={newExpense}
              setNewExpense={setNewExpense}
              onAddExpense={addExpense}
            />
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
              <div className="space-y-4">
                {Object.entries(budget).map(([category, data]) => {
                  const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || ShoppingCart;
                  const percentage = (data.spent / data.limit) * 100;
                  return (
                    <div key={category} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <IconComponent className="w-5 h-5 mr-2 text-muted-foreground" />
                          <span className="font-medium">{category}</span>
                        </div>
                        <span className="text-sm font-medium">
                          ${data.spent.toFixed(2)} / ${data.limit.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            percentage > 90 ? 'bg-destructive' : percentage > 75 ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{percentage.toFixed(0)}% used</span>
                        <span>${(data.limit - data.spent).toFixed(2)} remaining</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Spending Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Spent']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-6">Financial Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={goal.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <Target className="w-6 h-6 text-primary mr-2" />
                      <h4 className="font-semibold">{goal.name}</h4>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>${goal.current}</span>
                        <span>${goal.target}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="h-3 bg-primary rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{progress.toFixed(1)}% complete</span>
                        <span>${(goal.target - goal.current).toFixed(2)} remaining</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{daysLeft} days left</span>
                      </div>
                      <span className="text-primary font-medium">
                        ${((goal.target - goal.current) / Math.max(daysLeft, 1)).toFixed(2)}/day
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Category Comparison
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="spent" fill="hsl(var(--chart-1))" name="Spent" />
                    <Bar dataKey="remaining" fill="hsl(var(--chart-2))" name="Remaining" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Predictive Analysis
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                    <p className="font-medium text-primary">Monthly Projection</p>
                    <p className="text-2xl font-bold text-primary">${insights.projectedSpending}</p>
                    <p className="text-sm text-primary/80">Based on current spending patterns</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-lg">
                    <p className="font-medium text-success">Potential Savings</p>
                    <p className="text-2xl font-bold text-success">
                      ${(totalBudget - parseFloat(insights.projectedSpending)).toFixed(2)}
                    </p>
                    <p className="text-sm text-success/80">If you maintain current pace</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-chart-5/10 to-chart-5/5 rounded-lg">
                    <p className="font-medium text-chart-5">Budget Efficiency</p>
                    <p className="text-2xl font-bold text-chart-5">{insights.savingsRate}%</p>
                    <p className="text-sm text-chart-5/80">Of your budget will be saved</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Smart Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-primary bg-primary/5">
                  <h4 className="font-medium text-primary mb-2">Spending Optimization</h4>
                  <p className="text-sm text-foreground">
                    Consider using student discounts for entertainment and dining. You could save up to $50/month.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-success bg-success/5">
                  <h4 className="font-medium text-success mb-2">Goal Achievement</h4>
                  <p className="text-sm text-foreground">
                    You're on track to meet your Emergency Fund goal 2 weeks early at current savings rate.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-warning bg-warning/5">
                  <h4 className="font-medium text-warning-foreground mb-2">Budget Alert</h4>
                  <p className="text-sm text-foreground">
                    Transportation costs are trending upward. Consider carpooling or public transit.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-chart-5 bg-chart-5/5">
                  <h4 className="font-medium text-chart-5 mb-2">Income Opportunity</h4>
                  <p className="text-sm text-foreground">
                    Based on your spending patterns, a part-time job earning $200/month would significantly improve your financial health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;