const newNode = (
  name: string,
  attrs: { [key: string]: string },
  children: HTMLElement[] = []
) => {
  const dom = document.createElement(name)
  Object.entries(attrs).forEach(([k, v]) => {
    dom.setAttribute(k, v)
  })
  children.forEach((c) => {
    dom.appendChild(c)
  })
  return dom
}

const generateHatebu = (url: string, className: string): HTMLElement => {
  const pos = url.indexOf('#')
  if (pos >= 0) {
    url = url.substr(0, pos) + '%23' + url.substr(pos + 1)
  }
  return newNode(
    'a',
    {
      href: 'http://b.hatena.ne.jp/entry/' + url,
      target: '_blank',
      class: className,
    },
    [newNode('img', { src: '//b.hatena.ne.jp/entry/image/' + url })]
  )
}

const config = {
  attributes: false,
  childList: true,
  subtree: true,
}

const contentObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const target = mutation.target as HTMLElement
    if (mutation.target.nodeType === 1) {
      const contents = target.getElementsByClassName('content')
      const isTitleOnly = document
        ?.getElementById('headerBar')
        ?.classList.contains('title-only')

      for (const node of contents) {
        const links = node.querySelectorAll('a')
        const anchorCount = isTitleOnly ? 1 : 2
        if (links.length <= anchorCount) {
          const [link] = links
          const hatebu = generateHatebu(
            link.getAttribute('href') || '',
            'fh-list'
          )
          link.insertAdjacentElement('afterend', hatebu)
        }
      }
    }
  }
})

const initialObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const target = mutation.target as HTMLElement
    if (target.id === 'feedlyPageFX') {
      contentObserver.observe(target, config)
      initialObserver.disconnect()
    }
  }
})

initialObserver.observe(document.body, config)
