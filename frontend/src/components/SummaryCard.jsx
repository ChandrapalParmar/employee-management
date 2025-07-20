const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 card-hover border border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50"></div>

      <div className="relative flex items-center p-6">
        <div className={`
          flex items-center justify-center w-16 h-16 rounded-2xl text-white text-2xl
          shadow-lg transform group-hover:scale-110 transition-all duration-300
          ${color || 'bg-gradient-to-br from-teal-500 to-teal-600'}
        `}>
          <div className="relative">
            {icon}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        <div className="flex-1 ml-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {text}
            </p>
            <p className="text-3xl font-bold text-gray-900 font-inter">
              {number}
            </p>
          </div>

          <div className="flex items-center mt-2 text-xs">
            <div className="flex items-center text-green-600">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
              <span className="font-medium">+12%</span>
            </div>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-100/30 to-transparent rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full -ml-8 -mb-8"></div>
      </div>

      <div className={`
        h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
        ${color || 'bg-gradient-to-r from-teal-500 to-teal-600'}
      `}></div>
    </div>
  )
}

export default SummaryCard