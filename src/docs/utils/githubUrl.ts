import { registry } from '../../cli/registry'

const GITHUB_REPO_BASE = 'https://github.com/lithosui/Lithos_UI/blob/main/src'
const RAW_BASE = 'https://raw.githubusercontent.com/lithosui/Lithos_UI/main/src'

/**
 * Resolves the GitHub repository URL for a given component slug.
 * Consumes the existing registry metadata and maps component paths accurately,
 * including components that live in their own subdirectory.
 */
export const getComponentGithubUrl = (slug: string): string => {
  const normalizedSlug = slug.toLowerCase()
  const item = registry[normalizedSlug]
  if (!item) return ''

  const normalizedName = item.name.replace(/\s+/g, '')

  const componentFileInDir = item.requires?.find((req) => {
    const lowerReq = req.toLowerCase()
    return (
      lowerReq === `components/ui/${normalizedSlug}/${normalizedSlug}.tsx` ||
      lowerReq === `components/ui/${normalizedSlug}/${normalizedName.toLowerCase()}.tsx`
    )
  })

  if (componentFileInDir) {
    return `${GITHUB_REPO_BASE}/${componentFileInDir}`
  }

  if (normalizedSlug === 'toast') {
    const toastProvider = item.requires?.find((req) => req.endsWith('/ToastProvider.tsx'))
    if (toastProvider) {
      return `${GITHUB_REPO_BASE}/${toastProvider}`
    }
  }

  return item.githubUrl.replace(RAW_BASE, GITHUB_REPO_BASE)
}
