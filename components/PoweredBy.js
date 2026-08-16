import { siteConfig } from '@/lib/config'

export default function PoweredBy(props) {
  return (
    <div className={`inline text-sm font-serif ${props.className || ''}`}>
      <span className='mr-1'>Powered by</span>
      <a
        href='https://www.bilibili.com/video/BV1RuMC6eE8s/?share_source=copy_web&vd_source=bc152f3020fcf928d0cce820575a8692'
        className='underline justify-start'>
        大雷科技
      </a>
      .
    </div>
  )
}
