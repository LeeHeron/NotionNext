import { siteConfig } from '@/lib/config'
import { SVGDesign } from './svg/SVGDesign'
import { SVGEssential } from './svg/SVGEssential'
import { SVGGifts } from './svg/SVGGifts'
import { SVGTemplate } from './svg/SVGTemplate'
import Link from 'next/link'
import LazyImage from '@/components/LazyImage'
import { useState } from 'react'

/**
 * 产品特性相关，将显示在首页中
 * 增加点击图片和按钮弹出模态窗口功能
 */
export const Features = () => {
  // 状态：是否显示模态窗口，及当前选中图片 URL
  const [isOpen, setIsOpen] = useState(false)
  const [currentSrc, setCurrentSrc] = useState('')

  // 打开模态窗口
  const openModal = (src: string) => {
    setCurrentSrc(src)
    setIsOpen(true)
  }

  // 关闭模态窗口
  const closeModal = () => {
    setIsOpen(false)
    setCurrentSrc('')
  }

  // 按钮要展示的图片 URL（可配置）
  const buttonImg = siteConfig('PROXIO_FEATURE_BUTTON_IMG_URL', '')

  return (
    <>
      {/* ====== Features Section Start */}
      <section className='pb-8 pt-20 dark:bg-dark lg:pb-[40px] lg:pt-[120px]'>
        <div className='container'>

          <div className='-mx-4 flex flex-wrap wow fadeInUp' data-wow-delay='.2s'>
            <div className='w-full px-4'>
              <div className='mx-auto mb-12 lg:mb-[40px]'>
                <span className='px-3 py-0.5 rounded-2xl dark:bg-dark-1 border border-gray-200 dark:border-[#333333] dark:text-white'>
                  {siteConfig('PROXIO_FEATURE_TITLE')}
                </span>
                <h2 className='my-5 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]'>
                  {siteConfig('PROXIO_FEATURE_TEXT_1')}
                </h2>
                <p className='text-base text-body-color dark:text-dark-6'>
                  {siteConfig('PROXIO_FEATURE_TEXT_2')}
                </p>
              </div>
            </div>
          </div>

          <div className='-mx-4 flex flex-col md:flex-row gap-4 px-4'>
            {[1, 2, 3].map((i) => {
              const iconUrl = siteConfig(`PROXIO_FEATURE_${i}_ICON_IMG_URL`)
              return (
                <div key={i} className='w-full p-6 rounded-xl border border-gray-200 dark:border-[#333333]'>
                  <div className='wow fadeInUp group flex-col space-y-2 flex' data-wow-delay='.1s'>
                    <div
                      className='flex w-12 h-12 cursor-pointer'
                      onClick={() => openModal(iconUrl)}
                    >
                      <div className='overflow-hidden w-full flex justify-center items-center rounded-xl border border-gray-200 dark:border-[#333333] dark:text-white'>
                        <LazyImage src={iconUrl} className='z-10' />
                      </div>
                    </div>
                    <h4 className='mb-3 text-xl font-bold text-dark dark:text-white'>
                      {siteConfig(`PROXIO_FEATURE_${i}_TITLE_1`)}
                    </h4>
                    <p className='mb-8 text-body-color dark:text-dark-6 lg:mb-9'>
                      {siteConfig(`PROXIO_FEATURE_${i}_TEXT_1`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='mt-8 w-full flex justify-center items-center'>
            {/* 将原有按钮替换为可触发模态窗口的按钮 */}
            <button
              onClick={() => openModal(buttonImg)}
              className='px-4 py-2 rounded-3xl border dark:border-gray-200 border-[#333333] text-base font-medium text-dark hover:bg-gray-100 dark:text-white dark:hover:bg-white dark:hover:text-black duration-200'
            >
              {siteConfig('PROXIO_FEATURE_BUTTON_TEXT')}
              <i className="pl-4 fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>
      {/* ====== Features Section End */}

      {/* 模态窗口 */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
          onClick={closeModal}
        >
          <div
            className='max-w-lg max-h-full overflow-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <img src={currentSrc} alt="Feature Icon" className='rounded-lg shadow-lg' />
            <button
              className='mt-4 px-4 py-2 bg-white rounded-full text-black'
              onClick={closeModal}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  )
}
