import React from 'react'
import Layout from '../components/Layout/Layout'


const About = () => {
  return (
    <Layout>
      <div className="bg-gray-100 h-full p-8 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
          </p>
          <p className="text-gray-700 mb-4">
            Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
          </p>
          <p className="text-gray-700 mb-4">
            Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
          </p>
          <p className="text-gray-700">
            Vestibulum vel quam quis felis faucibus nonummy. Suspendisse potenti. Nam aliquet, augue nec adipiscing interdum, lacus tellus malesuada massa, quis varius mi purus non odio. Pellentesque condimentum, magna ut suscipit hendrerit, ipsum augue ornare nulla, non luctus diam neque sit amet urna.
          </p>
        </div>
      </div>
    </Layout>
  )
}


export default About