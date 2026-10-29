import { Routes, Route } from 'react-router-dom'
import { TemplatesIndex } from './TemplatesIndex'
import { TemplatePreviewPage } from './TemplatePreviewPage'
import { TemplateCategoryPage } from './TemplateCategoryPage'

export const TemplatesRoutes = () => {
  return (
    <Routes>
      <Route index element={<TemplatesIndex />} />
      <Route path="preview/:slug" element={<TemplatePreviewPage />} />
      <Route path=":categorySlug" element={<TemplateCategoryPage />} />
    </Routes>
  )
}
