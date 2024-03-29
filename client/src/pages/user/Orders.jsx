import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../../context/auth'
import axios from 'axios'
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [auth] = useAuth()

  const getOrders = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_HOST_URL}/auth/orders`)
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
    <div className='flex h-full'>
      <UserMenu />
      <div className='min-w-2xl w-screen p-5 text-[#3282B8] overflow-auto'>
        <h1 className="text-center text-xl font-bold mb-4 text-[#0F4C75]">All Orders</h1>
        {orders?.map((o, i) => {
          return (
            <div className="border border-gray-300 shadow rounded-md mb-4 bg-white overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-center">{i + 1}</td>
                    <td className="px-4 py-2 text-center">{o?.status}</td>
                    <td className="px-4 py-2 text-center">{moment(o?.createAt).fromNow()}</td>
                    <td className="px-4 py-2 text-center">{o?.payment.success ? "Success" : "Failed"}</td>
                    <td className="px-4 py-2 text-center">{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full px-2">
                {o?.products?.map((p, i) => (
                  <div className="flex items-center w-full border border-gray-300 rounded-md p-3 mb-2" key={p._id}>
                    <div className="flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_HOST_URL}/product/photo/${p._id}`}
                        className="w-24 h-24 object-cover"
                        alt={p.name}
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">{p.name}</p>
                      <p>{p.description.substring(0, 30)}...</p>
                      <p className="text-[#3282B8] font-bold">Price : ₹{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </Layout>
  )
}

export default Orders
