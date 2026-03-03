import React from 'react';
import { SimulationResult } from '../types';
import { formatCurrency } from '../services/calculationService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { APP_CONSTANTS } from '../constants';
import { Icons } from './Icons';

interface Props {
  results: SimulationResult;
}

export const TeaserResults: React.FC<Props> = ({ results }) => {
  
  const timeData = [
    { name: 'Own Entity', weeks: results.entityTimeWeeks, color: APP_CONSTANTS.COLORS.GRAY },
    { name: 'EOR Model', weeks: results.eorTimeWeeks, color: APP_CONSTANTS.COLORS.BLUE },
  ];

  const costData = [
    { name: 'Own Entity', cost: results.entityTotalCostY1, color: APP_CONSTANTS.COLORS.GRAY },
    { name: 'EOR Model', cost: results.eorTotalCostY1, color: APP_CONSTANTS.COLORS.BLUE },
  ];

  const entityIsCheaper = results.entityTotalCostY1 < results.eorTotalCostY1;
  const savings = Math.abs(results.entityTotalCostY1 - results.eorTotalCostY1);

  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
      
      {/* Time to Market Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
        <div className="mb-4">
            <h3 className="text-octagon-navy font-bold text-lg leading-tight flex items-center gap-2">
                <Icons.Clock className="w-5 h-5 text-slate-400" />
                Estimated Setup Time
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 ml-7">Time from decision to payroll run.</p>
        </div>
        
        {/* Chart Container - Fixed height for consistency */}
        <div className="w-full h-48 sm:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={timeData} 
                layout="vertical" 
                // Removed negative left margin to prevent cropping of labels
                // Increased right margin slightly to ensure values fit
                margin={{ top: 10, right: 50, left: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={90} // Increased width to ensure "Own Entity" fits
                tick={{fontSize: 11, fill: '#475569', fontWeight: 600}} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                formatter={(value: number) => [`${value} Weeks`, 'Duration']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="weeks" radius={[0, 4, 4, 0]} barSize={24}>
                {timeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList 
                  dataKey="weeks" 
                  position="right" 
                  formatter={(val: number) => `${val} wks`} 
                  fill="#475569" 
                  fontWeight="bold"
                  fontSize={12} 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Insight */}
        <div className="mt-auto pt-3 border-t border-slate-50">
             <div className="p-3 bg-blue-50 rounded-lg text-blue-900 text-sm font-medium flex items-center gap-2 leading-tight">
                <Icons.Zap className="w-4 h-4 shrink-0 text-blue-600" />
                <span>EOR is <strong>{results.entityTimeWeeks - results.eorTimeWeeks} weeks faster</strong></span>
            </div>
        </div>
      </div>

      {/* Financial Comparison Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
        <div className="mb-4">
            <h3 className="text-octagon-navy font-bold text-lg leading-tight flex items-center gap-2">
                <Icons.Euro className="w-5 h-5 text-slate-400" />
                Year 1 Total Investment
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 ml-7">Setup, Admin, Compliance & Fees.</p>
        </div>

        <div className="w-full h-48 sm:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={costData} 
                layout="vertical" 
                margin={{ top: 10, right: 65, left: 0, bottom: 0 }} // Adjusted margins
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={90} // Increased width
                tick={{fontSize: 11, fill: '#475569', fontWeight: 600}} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                formatter={(value: number) => [formatCurrency(value), 'Cost']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={24}>
                 {costData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList 
                  dataKey="cost" 
                  position="right" 
                  formatter={(val: number) => formatCurrency(val)} 
                  fill="#475569" 
                  fontWeight="bold" 
                  fontSize={11}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Footer Insight */}
         <div className={`mt-auto pt-3 border-t border-slate-50`}>
            <div className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 leading-tight ${entityIsCheaper ? 'bg-slate-100 text-slate-700' : 'bg-green-50 text-green-900'}`}>
                {entityIsCheaper ? <Icons.Building className="w-4 h-4 shrink-0" /> : <Icons.Trend className="w-4 h-4 shrink-0 text-green-600" />}
                {entityIsCheaper 
                  ? <span>Entity saves <strong>{formatCurrency(savings)}</strong> in Year 1</span>
                  : <span>EOR saves <strong>{formatCurrency(savings)}</strong> in Year 1</span>
                }
            </div>
        </div>
      </div>

    </div>
  );
};