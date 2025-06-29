import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const programs = [
  {
    id: 1,
    title: 'Program 1: Your Program',
    total: '£380 – £960',
    items: [
      { item: 'Flights (UK ↔ Egypt)', estimate: '£180 – £250' },
      { item: 'Visa fee', estimate: '£20' },
      { item: 'Accommodation (7 nights)', estimate: '£70–£350 (£10–£50/night)' },
      { item: 'Domestic & local transport', estimate: '£30–£60' },
      { item: 'Museum/temple entry fees', estimate: '£7–£40' },
      { item: 'Food & extras', estimate: '£70–£140 (£10–£20/day)' },
    ],
  },
  {
    id: 2,
    title: 'Program 2: Suggested by AI',
    total: '£390 – £920',
    items: [
      { item: 'Flights (UK ↔ Egypt)', estimate: '£190 – £230' },
      { item: 'Visa fee', estimate: '£20' },
      { item: 'Accommodation (7 nights)', estimate: '£90–£310 (£13–£45/night)' },
      { item: 'Domestic & local transport', estimate: '£40–£60' },
      { item: 'Museum/temple entry fees', estimate: '£10–£35' },
      { item: 'Food & extras', estimate: '£70–£140 (£10–£20/day)' },
    ],
  },
];

const BudgetSelector = () => {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to home or any route
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pb-36">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-tight">
        Choose Your Travel Program
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {programs.map((program) => {
          const isSelected = selectedId === program.id;
          return (
            <div
              key={program.id}
              onClick={() => setSelectedId(program.id)}
              role="button"
              tabIndex={0}
              className={`relative bg-white border rounded-3xl shadow-md hover:shadow-xl p-6 cursor-pointer transition-all duration-300 outline-none focus:ring-4
                ${isSelected ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-blue-800">{program.title}</h2>
                {isSelected && <CheckCircle className="text-blue-600 w-6 h-6" />}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {program.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.item}</span>
                    <span className="font-medium">{item.estimate}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t text-right text-lg font-bold text-gray-800">
                Total: <span className="text-blue-700">{program.total}</span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedId && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Continue with Program {selectedId}
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetSelector;
