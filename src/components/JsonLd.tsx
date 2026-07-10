const BASE_URL = 'https://www.waves-jp.com'

type Props = {
  data: Record<string, unknown>
}

/** schema.org 構造化データを埋め込む */
export function JsonLd({ data }: Props) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** 下層ページ用のパンくず構造化データを組み立てる */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}
