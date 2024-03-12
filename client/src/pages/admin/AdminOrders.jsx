import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../../context/auth'
import axios from 'axios'
import moment from 'moment'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [auth] = useAuth()

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/auth/all-orders`)
      console.log(data);
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleStatus = async (id, value) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_HOST_URL}/auth/order/${id}`, {
        status: value
      })

    } catch (error) {
      console.log(error)
    }

    finally {
      getOrders()
    }
  }

  return (
    <Layout>
      <div className='flex h-full'>
        <AdminMenu />
        <div className='bg-red-100 flex-grow text-center my-auto'>
          <h1 className="text-center text-xl font-bold mb-4">All AdminOrders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border border-gray-300 shadow rounded-md mb-4">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Buyer</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Payment</th>
                      <th className="px-4 py-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">
                        <select
                          defaultValue={o.status}
                          onChange={(e) => handleStatus(o._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">{o?.buyer?.name}</td>
                      <td className="px-4 py-2">{moment(o?.createAt).fromNow()}</td>
                      <td className="px-4 py-2">{o?.payment.success ? "Success" : "Failed"}</td>
                      <td className="px-4 py-2">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="flex items-center border border-gray-300 rounded-md p-3 mb-2" key={p._id}>
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
                        <p>Price : {p.price}</p>
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

export default AdminOrders