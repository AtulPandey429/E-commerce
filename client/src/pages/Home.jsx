import React from 'react'
import Layout from './../components/layout/Layout';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const [auth,setauth]=useAuth()
  return (
    <Layout title={'HomePage'}>
      HomePage
      <h1>
        {JSON.stringify(auth)}
      </h1>
    </Layout>
  )
}

export default Home