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
        </div>
      </div>

      <div className={`
        h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
        ${color || 'bg-gradient-to-r from-teal-500 to-teal-600'}
      `}></div>
    </div>
  )
}

export default SummaryCard