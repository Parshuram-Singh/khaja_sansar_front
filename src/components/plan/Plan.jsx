const plans = [
    {
      name: 'One-Time-Order Plan',
      description: 'Perfect for individuals who need a one-time meal.',
    },
    {
      name: 'Weekly Plan',
      description: 'Ideal for busy people who want hassle-free weekly meals.',
    },
    {
      name: 'Corporate Plan',
      description: 'Custom meal solutions for companies and teams.',
    },
  ];
  
  const Plan = ({ changePlan }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <button 
                onClick={() => changePlan(index)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Choose {plan.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Plan;