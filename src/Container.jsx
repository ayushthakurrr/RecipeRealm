import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'

const Container = () => {
    const [dishName, setDishName] = useState('');
    const [recipe, setRecipe] = useState([]);
    const [InitialState, SetInitialState] = useState(true)
    useEffect(() => {
        if (dishName) {  //
          axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`)
            .then(function(response) {
              console.log(response.data);
              if (response.data.meals) {
                setRecipe(response.data.meals);
              } else {
                setRecipe([]);  
              }
              SetInitialState(false)
            })
            .catch(function(error) {
              console.error("Error fetching data:", error);
            });
        }
      }, [dishName]);  
    

  return (
    <div className='flex flex-col justify-start items-center bg-[#5D001E]  h-screen w-full overflow-auto'>
        <h1 className='font-bold text-4xl text-[#E3E2DF]'>Recipe Book</h1>
        <div>
            <input
                className='my-3 outline-none rounded-md px-2 py-1'
                type="text"
                placeholder='Enter dish name...'
                onChange={e => setDishName(e.target.value)} />
        </div>
        <div className='flex flex-col gap-2 w-[95vw] items-center justify-center'>
             {InitialState ? 
                <div className='text-center font-bold text-[#E3E2DF]'>
                Please search for a recipe to get started.
                </div>
             : recipe.length === 0 ? (
                <div className='text-[#E3E2DF] font-semibold'> Recipe not found  :(  </div>
            ) : (
                recipe.map((items,i)=>{
                    return(
                    <div key={i} className='bg-[#9A1750] rounded-lg h-[400px] m-4 p-4 flex flex-col items-center overflow-auto'>

                        <h1 className='text-xl font-bold text-[#E3E2DF] m-1'>{items.strMeal}</h1>

                        <div className='flex flex-row justify-start items-center gap-2'>
                            <img className='w-[300px] m-3 shadow-xl rounded-xl '
                            src={items.strMealThumb} alt="" />
                            <p className='text-sm text-[#E3AFBC] text-center'>
                                <span className='font-bold'>
                                Instructions : </span>
                                {items.strInstructions}
                            </p>

                        </div>

                    </div>)
                })
            )}
        </div>
    </div>
  )
}

export default Container