export function StatsSection() {
  const stats = [
    { label: 'Active Students', value: '12,000+', color: 'text-[#58CC02]' },
    { label: 'Courses Completed', value: '45,000+', color: 'text-[#FF6F61]' },
    { label: 'Tokens Earned', value: '2.5M+', color: 'text-[#4E6C50]' },
    { label: 'Success Rate', value: '94%', color: 'text-[#58CC02]' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}