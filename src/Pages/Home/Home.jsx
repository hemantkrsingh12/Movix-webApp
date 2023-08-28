import React from 'react'
import Herobanner from './Herobanner/Herobanner'
import Trending from './Trending/Trending'
import "./Home.scss"
import Popular from './Popular/Popular'
import TopRated from './TopRated/TopRated'

const Home = () => {
  return (
    <div className='homepage'><Herobanner/>
    <Trending/>
    <Popular/>
   <TopRated />
    </div>
  )
}

export default Home