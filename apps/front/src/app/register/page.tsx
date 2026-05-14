import type { Metadata } from 'next'

import { buildPageMetadata } from '@/app/site-metadata'
import { ModalProvider } from '@/components/pages/register/ModalContext'
import { RegisterForm } from '@/components/pages/register/RegisterForm'

export const metadata: Metadata = buildPageMetadata({
  pageTitle: '사례 등록',
  description:
    '보안록에 아직 등록되지 않은 보안 사고 사례를 제보하고 함께 아카이브를 확장해 보세요.',
  path: '/register',
})

export default function RegisterPage() {
  return (
    <ModalProvider>
      <RegisterForm />
    </ModalProvider>
  )
}
