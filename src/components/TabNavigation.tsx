import React from 'react';
import { User, Heart, Home, Briefcase } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  currentStep: number;
  onTabClick: (step: number) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ currentStep, onTabClick }) => {
  const tabs: Tab[] = [
    { id: 'personal', label: 'Personal', icon: <User size={13} /> },
    { id: 'religious', label: 'Religious', icon: <Heart size={13} /> },
    { id: 'family', label: 'Family', icon: <Home size={13} /> },
    { id: 'career', label: 'Career', icon: <Briefcase size={13} /> },
  ];

  return (
    <div className="w-full mb-8">
  <div className="flex flex-nowrap justify-between gap-1 sm:gap-3">
        {tabs.map((tab, index) => {
          const stepIndex = index + 1;
          const isActive = currentStep === stepIndex;
          const isCompleted = currentStep > stepIndex;
          return (
            <button
              key={tab.id}
              onClick={() => onTabClick(stepIndex)}
              className={`flex items-center gap-0.5 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all duration-200 whitespace-nowrap text-[10px] sm:text-xs font-medium ${
                isActive
                  ? 'bg-white text-red-600 border-red-200 shadow-sm'
                  : isCompleted
                  ? 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  : 'bg-gray-50 text-gray-400 border-gray-200'
              }`}
              disabled={stepIndex > currentStep + 1}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};