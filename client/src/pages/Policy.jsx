import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
  return (
    <Layout>
      <div className="h-full p-8 flex flex-col justify-around items-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h2>

          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed
            ultricies dolor. Nullam auctor, odio et finibus congue, metus odio
            congue neque, ut ullamcorper elit nisi id ligula. Fusce euismod ex ut
            erat accumsan, ut tincidunt tortor luctus. Nulla facilisi. Nulla
            facilisi. In hac habitasse platea dictumst. Suspendisse potenti. Nam
            eu turpis vel arcu dictum efficitur.
          </p>

          <p className="text-gray-700">
            Proin nec laoreet leo. Sed vel eleifend leo. Suspendisse potenti.
            Integer euismod augue et justo tristique, eget convallis odio
            fermentum. Vestibulum vestibulum, orci vel malesuada tincidunt, nunc
            purus vestibulum orci, et posuere augue nunc vel enim. Sed
            sollicitudin, mi a tincidunt fermentum, velit ex venenatis justo,
            vitae efficitur dolor orci eu justo. Nunc pharetra, odio ut lacinia
            ullamcorper, erat felis auctor elit, nec bibendum augue elit eu
            mauris.
          </p>

          <p className="text-gray-700">
            Mauris interdum, nibh vel euismod scelerisque, mi urna bibendum ex,
            vitae facilisis quam elit id orci. Aenean tristique, est id semper
            fringilla, turpis massa fermentum odio, ac facilisis purus nunc ut
            turpis. Curabitur malesuada metus sit amet sapien euismod, vitae
            ultrices felis consectetur. Nulla facilisi. Donec a fermentum neque.
            In hac habitasse platea dictumst.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
