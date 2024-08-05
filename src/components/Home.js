import React from 'react'
import Notes from './Notes'
const Home = (props) => {
  const {showAlert} = props
  return (
    <div className='animate__animated animate__fadeIn'>
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home;
