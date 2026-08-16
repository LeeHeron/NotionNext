import { siteConfig } from '@/lib/config'

export default function PoweredBy(props) {
  return (
    <div className={`inline text-sm font-serif ${props.className || ''}`}>
      <span className='mr-1'>Powered by</span>
      <a
        href='https://github.com/govmoe/XuHome-Theme'
        className='underline justify-start'>
        大雷科技
      </a>
      .
    </div>
  )
}
