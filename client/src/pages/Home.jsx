import React,{useState} from 'react'
import Auth from '../components/Auth'

const Home = () => {
    const [showAuth, setShowAuth] = useState(false);
  return (
    <div className=''>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setShowAuth(true)}>
            
        </button>
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Home