import React from 'react';
import { SummaryWidget } from './SummaryWidget';
import { PriorityGoalWidget } from './GoalWidget';

export function Dashboard() {
    return (
        <div style={{ paddingBottom: '6rem', animation: 'fadeIn 0.5s ease' }}>
            <SummaryWidget />
            <PriorityGoalWidget />

            {/* Quick Actions or Analysis could go here */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
