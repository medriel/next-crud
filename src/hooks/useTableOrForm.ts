import { useState } from 'react'

export default function useTableOrform() {
  const [isVisibled, setIsVisibled] = useState<'table' | 'form'>('table')

  const displayForm = () => setIsVisibled('form')
  const displayTable = () => setIsVisibled('table')

  return {
    formIsVisibled: isVisibled === 'form',
    displayForm,
    tableIsVisibled: isVisibled === 'table',
    displayTable,
  }
}