import { motion } from 'framer-motion';
import { useAuth } from '../../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const AdminDashboard = () => {
  const [auth] = useAuth();
  const name = auth.user.name.toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50">
        <AdminMenu />
        
        <div className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-2xl p-6 lg:p-8 w-full max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl lg:text-4xl font-bold text-white">
                  {name.charAt(0)}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-800 mb-2">
                {name}
              </h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 text-gray-700 p-3 bg-gray-50 rounded-lg text-sm lg:text-base"
              >
                <FaEnvelope className="text-blue-500 flex-shrink-0" />
                <span className="font-poppins truncate">{auth.user.email}</span>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 text-gray-700 p-3 bg-gray-50 rounded-lg text-sm lg:text-base"
              >
                <FaPhone className="text-blue-500 flex-shrink-0" />
                <span className="font-poppins">{auth.user.phone}</span>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 text-gray-700 p-3 bg-gray-50 rounded-lg text-sm lg:text-base"
              >
                <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                <span className="font-poppins truncate">{auth.user.address}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;