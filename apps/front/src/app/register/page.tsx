import type { Metadata } from 'next'

import { RegisterForm } from '@/components/pages/register/RegisterForm'

export const metadata: Metadata = {
  title: '사례 등록 | 보안록',
  description: '보안록에 등록되지 않은 사례를 공유해 주세요.',
}

export default function RegisterPage() {
  return <RegisterForm />
}
