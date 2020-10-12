import { useContext } from 'react'
import { Context } from '../contexts/XSushiProvider'

const useXSushi = () => {
  const { xsushi } = useContext(Context)
  return xsushi
}

export default useXSushi
