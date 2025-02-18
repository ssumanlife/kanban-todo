import React from 'react'

const Skeleton = () => {
  const commonStyle = {
    wrapper: 'rounded-md bg-gray-600',
    item: 'rounded-md bg-gray-500',
  }

  return (
    <div
      className={`${commonStyle.wrapper} w-full h-[304px] p-6 flex justify-between items-center gap-4`}
    >
      <div className={`${commonStyle.item} w-[32px] h-[32px]`}></div>
      <div className={`${commonStyle.wrapper} w-full h-full p-2 flex flex-col gap-3`}>
        <div className={`${commonStyle.item} w-[220px] h-[36px]`}></div>
        <div className={`${commonStyle.item} w-[160px] h-[32px]`}></div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className={`${commonStyle.item} h-[116px]`}></div>
          ))}
        </div>
        <div className="flex justify-end">
          <div className={`${commonStyle.item} w-[100px] h-[20px]`}></div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
