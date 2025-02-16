import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/foodDisplay'
import AppDownload from '../components/AppDownload'

const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div id='home'>
<Header/>
<ExploreMenu category={category} setCategory={setCategory}/>
<FoodDisplay category={category} />
<AppDownload/>
    </div>
  )
}

export default Home