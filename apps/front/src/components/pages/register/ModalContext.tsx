'use client'
import { createContext, useContext, useState } from 'react'

import { CopyModal } from './CopyModal'

interface ModalState {
  content: string
  issueUrl: string
}

interface ModalContextValue {
  openCopyModal: (content: string, issueUrl: string) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null)

  return (
    <ModalContext.Provider
      value={{ openCopyModal: (content, issueUrl) => setModal({ content, issueUrl }) }}
    >
      {children}
      {modal !== null && (
        <CopyModal
          content={modal.content}
          issueUrl={modal.issueUrl}
          onClose={() => setModal(null)}
        />
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
