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

const ModalCtx = createContext<ModalContextValue | null>(null)

export function ModalContext({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null)

  return (
    <ModalCtx.Provider
      value={{
        openCopyModal: (content, issueUrl) => setModal({ content, issueUrl }),
      }}
    >
      {children}
      {modal !== null && (
        <CopyModal
          content={modal.content}
          issueUrl={modal.issueUrl}
          onClose={() => setModal(null)}
        />
      )}
    </ModalCtx.Provider>
  )
}

export function useModalContext() {
  const ctx = useContext(ModalCtx)
  if (!ctx) throw new Error('useModalContext must be used within ModalContext')
  return ctx
}
