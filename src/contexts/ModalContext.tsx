import { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
  isModalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    // Return default values if used outside provider
    return { isModalOpen: false, setModalOpen: () => {} }
  }
  return context
}

