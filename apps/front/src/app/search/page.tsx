import { SearchResults } from '@/components/pages/search/SearchResults'

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', category } = await searchParams
  return <SearchResults category={category} query={q} />
}
