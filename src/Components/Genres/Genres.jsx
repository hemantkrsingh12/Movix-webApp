import React from 'react'
import "./Genres.scss"
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getGenres } from '../../store/HomeSlice';


const Genres = (props) => {
    const genres= useSelector((state)=>state.homeSlice.genres);

  return (
    <div className='genres'>
        {props.data?.map((item)=>{
            if(!genres[item]?.name) return;
            return(               
              <div className='genre' key={item}> 
               {genres[item]?.name}
              </div>
            )
        })}
    </div>
  )
}

export default Genres