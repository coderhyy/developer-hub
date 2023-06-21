import { slugifyWithCounter } from '@sindresorhus/slugify'
import { useRouter } from 'next/router'

import { products } from '@/components/products'

export function usePage(pageProps) {
  const { pathname } = useRouter()
  const title = pageProps.markdoc?.frontmatter.title ?? 'Metaplex Documentation'
  const product = getProductFromPathname(pathname)
  const activeSection = getActiveSection(pathname, product, pageProps)
  const activeHero = getActiveHero(pathname, product, pageProps)

  return {
    title,
    metaTitle: pageProps.markdoc?.frontmatter.metaTitle ?? title,
    pathname,
    product,
    activeHero,
    activeSection,
    isIndexPage:  product?.path ? pathname === `/${product.path}` : false,
    tableOfContents: pageProps.markdoc?.content
      ? parseTableOfContents(pageProps.markdoc.content)
      : [],
  }
}

function getProductFromPathname(pathname) {
  const path = pathname.replace(/^\/|\/$/, '').split('/')?.[0]
  return products.find((product) => product.path === path)
}

function getActiveHero(pathname, product, pageProps) {
  if (!product?.heroes) return undefined
  return product.heroes.find((hero) => {
    return hero.doesPageHaveHero
      ? hero.doesPageHaveHero({ pathname, hero, product, pageProps })
      : pathname === hero.path
  })?.component ?? undefined
}

function getActiveSection(pathname, product, pageProps) {
  if (!product?.sections) return undefined

  // Find active section.
  const foundSection = product.sections.find((section) => {
    const defaultIsPageFromSection = () => {
      if (section.isFallbackSection) return false
      return pathname.startsWith(`${section.href}/`) || pathname === section.href
    }
    return section.isPageFromSection
      ? section.isPageFromSection({ pathname, section, product, pageProps })
      : defaultIsPageFromSection()
  })
  const fallbackSection = product.sections.find((section) => section.isFallbackSection)
  const activeSection = foundSection || fallbackSection
    ? { ...(foundSection ?? fallbackSection) }
    : undefined

  // Add navigation helpers.
  if (activeSection && activeSection.navigation) {
    const allLinks = activeSection.navigation.flatMap((group) => group.links)
    const linkIndex = allLinks.findIndex((link) => link.href === pathname)
    activeSection.previousPage = allLinks[linkIndex - 1]
    activeSection.nextPage = allLinks[linkIndex + 1]
    activeSection.navigationGroup = activeSection.navigation.find((group) =>
      group.links.find((link) => link.href === pathname)
    )
  }

  return activeSection
}

function parseTableOfContents(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...parseTableOfContents(node.children ?? [], slugify))
  }

  return sections
}

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}
