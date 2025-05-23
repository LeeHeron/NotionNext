import { siteConfig } from '@/lib/config'
import { compressImage, mapImgUrl } from '@/lib/notion/mapImage'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import mediumZoom from '@fisch0920/medium-zoom'
import 'katex/dist/katex.min.css'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { NotionRenderer } from 'react-notion-x'
import EmojiReaction from '@/themes/proxio/components/EmojiReaction'
import emojisData from '@/data/emojis.json'

const NotionPage = ({ post, className }) => {
  const POST_DISABLE_GALLERY_CLICK = siteConfig('POST_DISABLE_GALLERY_CLICK')
  const POST_DISABLE_DATABASE_CLICK = siteConfig('POST_DISABLE_DATABASE_CLICK')
  const SPOILER_TEXT_TAG = siteConfig('SPOILER_TEXT_TAG')

  const zoom =
    isBrowser &&
    mediumZoom({
      background: 'rgba(0, 0, 0, 0.2)',
      margin: getMediumZoomMargin()
    })

  const zoomRef = useRef(zoom ? zoom.clone() : null)
  const IMAGE_ZOOM_IN_WIDTH = siteConfig('IMAGE_ZOOM_IN_WIDTH', 1200)

  useEffect(() => {
    autoScrollToHash()
  }, [])

  useEffect(() => {
    if (POST_DISABLE_GALLERY_CLICK) {
      processGalleryImg(zoomRef?.current)
    }

    if (POST_DISABLE_DATABASE_CLICK) {
      processDisableDatabaseUrl()
    }

    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (mutation.target.classList.contains('medium-zoom-image--opened')) {
            setTimeout(() => {
              const src = mutation?.target?.getAttribute('src')
              mutation?.target?.setAttribute(
                'src',
                compressImage(src, IMAGE_ZOOM_IN_WIDTH)
              )
            }, 800)
          }
        }
      })
    })

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
    }
  }, [post])

  useEffect(() => {
    if (SPOILER_TEXT_TAG) {
      import('lodash/escapeRegExp').then(escapeRegExp => {
        Promise.all([
          loadExternalResource('/js/spoilerText.js', 'js'),
          loadExternalResource('/css/spoiler-text.css', 'css')
        ]).then(() => {
          window.textToSpoiler &&
            window.textToSpoiler(escapeRegExp.default(SPOILER_TEXT_TAG))
        })
      })
    }

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.notion-collection-page-properties')
      elements?.forEach(element => {
        element?.remove()
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [post])

  const customBlockComponents = {
    html: ({ block }) => {
      const htmlContent = block?.properties?.html?.[0]?.[0]
      if (!htmlContent) return null

      const match = htmlContent.match(/<ins\s+data-emoji-id="([^"]+)"\s*\/?>/)
      if (match) {
        const id = match[1]
        return (
          <EmojiReaction
            id={id}
            emojisData={emojisData}
            emojiList={['👍', '❤️', '😂', '🎉']}
          />
        )
      }

      return null
    }
  }

  return (
    <div id="notion-article" className={`mx-auto overflow-hidden ${className || ''}`}>
      <NotionRenderer
        recordMap={post?.blockMap}
        mapPageUrl={mapPageUrl}
        mapImageUrl={mapImgUrl}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          Tweet,
          EmojiReaction: ({ id }) => (
            <EmojiReaction
              id={id}
              emojiList={['👍', '😂', '❤️', '🎉', '🤔']}
              emojisData={emojisData}
            />
          ),
          ...customBlockComponents
        }}
      />
      <AdEmbed />
      <PrismMac />
    </div>
  )
}

const processDisableDatabaseUrl = () => {
  if (isBrowser) {
    const links = document.querySelectorAll('.notion-table a')
    for (const e of links) {
      e.removeAttribute('href')
    }
  }
}

const processGalleryImg = zoom => {
  setTimeout(() => {
    if (isBrowser) {
      const imgList = document?.querySelectorAll('.notion-collection-card-cover img')
      if (imgList && zoom) {
        for (let i = 0; i < imgList.length; i++) {
          zoom.attach(imgList[i])
        }
      }

      const cards = document.getElementsByClassName('notion-collection-card')
      for (const e of cards) {
        e.removeAttribute('href')
      }
    }
  }, 800)
}

const autoScrollToHash = () => {
  setTimeout(() => {
    const hash = window?.location?.hash
    const needToJumpToTitle = hash && hash.length > 0
    if (needToJumpToTitle) {
      const tocNode = document.getElementById(hash.substring(1))
      if (tocNode && tocNode?.className?.indexOf('notion') > -1) {
        tocNode.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }, 180)
}

const mapPageUrl = id => {
  return '/' + id.replace(/-/g, '')
}

function getMediumZoomMargin() {
  const width = window.innerWidth

  if (width < 500) return 8
  else if (width < 800) return 20
  else if (width < 1280) return 30
  else if (width < 1600) return 40
  else if (width < 1920) return 48
  else return 72
}

const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then(async m => m.Code),
  { ssr: false }
)

const Equation = dynamic(
  () =>
    import('@/components/Equation').then(async m => {
      await import('@/lib/plugins/mhchem')
      return m.Equation
    }),
  { ssr: false }
)

const Pdf = dynamic(() => import('@/components/Pdf').then(m => m.Pdf), {
  ssr: false
})

const PrismMac = dynamic(() => import('@/components/PrismMac'), {
  ssr: false
})

const TweetEmbed = dynamic(() => import('react-tweet-embed'), {
  ssr: false
})

const AdEmbed = dynamic(
  () => import('@/components/GoogleAdsense').then(m => m.AdEmbed),
  { ssr: true }
)

const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then(m => m.Collection),
  { ssr: true }
)

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  { ssr: false }
)

const Tweet = ({ id }) => {
  return <TweetEmbed tweetId={id} />
}

export default NotionPage
