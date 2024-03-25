import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'

const Private = () => {
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [auth] = useAuth()
  const location = useLocation()


  useEffect(() => {
    const authCheck = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/auth/user-auth`)
        console.log(data.ok)
        if (data?.ok) {
          setOk(true)
        } else {
          setOk(false)
        }
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
  
    }
    if (auth?.token) authCheck()
  }, [auth?.token])

  useEffect(() => {
    console.log(ok);
  }, [ok])


  console.log(ok);

  if (loading) return <h1>loading</h1>
  return (
    ok ? <Outlet /> : <Spinner/>
  )

}

export default Private    