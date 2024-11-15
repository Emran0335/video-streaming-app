import React from 'react'

const InfoBox = ({title, value, icon}) => {
  return (
    <div className="border p-4 rounded-md border-gray-600 mt-2">
        <div className="mb-4 block">
            <span className="inline-block rounded-full bg-[#f8c3fa] p-1 text-pink-400">
                {icon}
            </span>
        </div>
        <h6 className="text-gray-300">{title}</h6>
        <p className="text-3xl font-semibold text-gray-300">{value}</p>
    </div>
  )
}

export default InfoBox