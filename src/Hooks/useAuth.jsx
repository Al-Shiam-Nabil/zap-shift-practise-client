import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function useAuth() {
    const info=useContext(AuthContext)
  return info
}
