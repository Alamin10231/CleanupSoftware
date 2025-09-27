
const PricingSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Choose Your Plan
        </h2>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-white border rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Starter</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              $29
              <span className="text-base font-medium text-gray-500">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
            </ul>
            <button className="mt-8 w-full border-2 border-purple-500 text-purple-600 font-medium py-2 rounded-lg hover:bg-purple-50">
              Get Started
            </button>
          </div>

          {/* Growth Plan (Most Popular) */}
          <div className="bg-white border-2 border-blue-600 rounded-xl shadow-lg p-8 text-center relative">
            {/* Badge */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
            <h3 className="text-lg font-semibold text-gray-800">Growth</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              $79
              <span className="text-base font-medium text-gray-500">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
            </ul>
            <button className="mt-8 w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white border rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Enterprise</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              $199
              <span className="text-base font-medium text-gray-500">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
              <li>✔ Lorem Ipsum</li>
            </ul>
            <button className="mt-8 w-full border-2 border-purple-500 text-purple-600 font-medium py-2 rounded-lg hover:bg-purple-50">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
