import React from 'react'
import Hero from '../../components/hero/Hero'

const HomePage = () => {
  const plans = [
    {
      title: "Weekly Plan",
      description: "Perfect for short-term access and flexibility.",
      price: "$10",
      features: ["7 Days Access", "Basic Support", "Limited Features"],
    },
    {
      title: "Monthly Plan",
      description: "Ideal for regular users seeking more value.",
      price: "$30",
      features: ["30 Days Access", "Priority Support", "Full Features"],
    },
    {
      title: "Corporate Plan",
      description: "Best for businesses with team access needs.",
      price: "$100",
      features: ["Team Access", "Dedicated Support", "Custom Features"],
    },
  ];

  return (
    <main>
      <Hero/>

      <section>
      <div className="text-white py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-green-500 mb-8">
          Subscription Plans
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8"
            >
              <h3 className="text-xl font-bold text-green-400 mb-4">
                {plan.title}
              </h3>
              <p className="text-gray-300 mb-6">{plan.description}</p>
              <div className="text-4xl font-bold text-green-500 mb-6">
                {plan.price}
              </div>
              <ul className="text-gray-400 space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
      </section>

    </main>
  )
}

export default HomePage