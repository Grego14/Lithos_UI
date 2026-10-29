import { Routes, Route } from 'react-router-dom'
import { BlocksIndex } from './BlocksIndex'
import { BlockPreviewPage } from './BlockPreviewPage'
import { BlockCategoryPage } from './BlockCategoryPage'

export const BlocksRoutes = () => {
  return (
    <Routes>
      <Route index element={<BlocksIndex />} />
      <Route path="preview/:slug" element={<BlockPreviewPage />} />
      <Route path=":categorySlug" element={<BlockCategoryPage />} />
    </Routes>
  )
}
