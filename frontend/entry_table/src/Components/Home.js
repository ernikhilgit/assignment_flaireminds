

import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

function Home() {
   
    const [product,setProduct] = useState({})
    const [count,setCount] = useState()
    const [flag,setFlag] = useState(false);
    const { register,handleSubmit,watch,reset, formState:{errors}} = useForm()



    // dynamic Submit button
    const productf = watch('product')
    const weekdayf = watch('weekday')
    const quantityf = watch('quantity')
    // handle button > isValid
    const isValid = productf && weekdayf && quantityf
    const isFinish = count



    async function saveData(data){
 

        const resp = await axios.post(`http://localhost:8000/product/`,data)  
        
        if(resp.status===201){
            reset()
            setFlag(!flag)
          }
        

    }


    async function fetchAllProducts(){
        const res = await axios.get(`http://localhost:8000/product/`)
        const data = res.data
        const productsByWeekdays = {'Monday':[], 'Tuesday':[],'Wednesday':[], 'Thursday':[], 'Friday':[], 'Saturday':[], 'Sunday':[]}
        for(let ele of data){
            const weekday = ele.weekday
            productsByWeekdays[weekday].push(ele)
        }
        
        setProduct(productsByWeekdays)
        if (data.length > 0){
            setCount(1)
        }
        
    }


    useEffect(
        ()=>{fetchAllProducts();},[flag]
      )

    function closeWindow(){
        window.close();
    }

    return (
    <>
    <br/><br/>
    <div className='container jumbotron bg-light col-10 ' >
        <div className='col-3 float-left'>   
            <form onSubmit={handleSubmit(saveData)}>
                <select id='product_id' className='form-control' {...register('product')}>
                <h6>errors.product?.message</h6>
                    <option value="">--Select Product--</option>
                    <option value='product#1'>Product #1</option>
                    <option value='product#2'>Product #2</option>
                    <option value='product#3'>Product #3</option>
                    <option value='product#4'>Product #4</option>
                    <option value='product#5'>Product #5</option>
                    <option value='product#6'>Product #6</option>
                </select>
                <br/><br/>
                <select id='weekday_id' class="form-select" className='form-control' {...register('weekday')}>
                                                                                        
                    <option value="">--Select Weekday--</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>
                <br/><br/>
                <input id='quantity' type='text' name='quantity' placeholder='quantity' className='form-control' {...register('quantity',{
                    pattern:{
                        value:/^[\d]+$/,
                        message:"Quantity should be a natural number only",
                        
                        
                    }
                })}/>                                                  
                                                                                    
                <h6  style={{ color: 'red' }}>{errors.quantity && <p>{errors.quantity.message}</p>} </h6>

                <br/><br/>
                <input type='submit' id='add' value='ADD' className='btn btn-success col-3 float-right' disabled = {!isValid} ></input>

            </form>
        </div > 
        <div className='col-8 float-right'>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Weekday</th>
                    <th>Products</th>
                    <th>Quntity</th>
                    </tr>
                </thead>
                <tbody>
                {
                    Object.keys(product).map( key =>{
                        return(
                            <>
                            {product[key].length &&
                                
                                        product[key].map((p,index) =>{
                                            return(
                                                
                                                <>
                                                {index === 0 ?<>
                                                    <tr>
                                                    <td rowSpan={product[key].length}>{key}</td>
                                                    <td>
                                                        {p.product}
                                                    </td>
                                                    <td>
                                                        {p.quantity}
                                                    </td></tr>
                                                </>:<>
                                                    <tr>
                                                        <td>{p.product}</td>
                                                        <td>{p.quantity}</td>
                                                    </tr>
                                                </>}
                                                </>
                                            
                                            )
                                        })
                                    }
                            </>
                        
                        )
                    })
                }
                </tbody>
            </table>  
            <button className='btn btn-info col-3 float-right' onClick={closeWindow} disabled={!isFinish}>Finish</button>
        </div>
        
        

    </div>
    
   
    </>
  )
}

export default Home
