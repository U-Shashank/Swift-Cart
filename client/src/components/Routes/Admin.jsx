import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Admin = () => {
  const [ok, setOk] = useState(false)
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/auth/admin-auth`)
        if (res.data.ok) {
          setOk(true)
        } else {
          setOk(false)
          navigate("/login")
        }
      } catch (error) {
        console.log(error);
      }

    }
    if (auth.token) authCheck()
  }, [auth.token, navigate])

  return (
    ok ? <Outlet /> : null
  )

}

export default Admin