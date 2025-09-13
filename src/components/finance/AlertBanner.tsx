import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Alert {
  type: 'danger' | 'warning';
  message: string;
}

interface AlertBannerProps {
  alerts: Alert[];
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="mb-6 space-y-2">
      {alerts.map((alert, index) => (
        <div 
          key={index} 
          className={`flex items-center p-3 rounded-lg ${
            alert.type === 'danger' 
              ? 'bg-destructive/10 text-destructive' 
              : 'bg-warning/10 text-warning-foreground'
          }`}
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          {alert.message}
        </div>
      ))}
    </div>
  );
};