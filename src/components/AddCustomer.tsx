import { useEffect, useState } from "react";
import {Basket, Product, db} from '../../db.ts'

const inputMaker=[
  {name:"discount",type:"string"},
  {name:"customer",type:"string"},
]

export default function AddFCustomer() {
    const [product,setProduct]=useState<Product>({code:"",name:"",brand:""});
    const [basket,setBasket]=useState({discount:0,customer:"",products:[] as Product[]});

    async function addProducts() {
      try {
        const isCustomerExist = await db.basket
        .where('customer')
        .equals(basket.customer)
        .toArray();
        console.log(isCustomerExist.length)
        if(isCustomerExist.length===0){
          await db.basket.add(basket)
        }else{
          console.log("isCustomerExist")
        }
      } catch (error) {
        console.log(error)
      }
    }
    const submitProduct=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setBasket({...basket,products:[...basket.products,product]})
      setProduct({code:"",name:"",brand:""})
    }
  
    return (
      <>
        <p style={{fontSize: '5vw'}}>String Test</p>
        <div>
        customer:
        <input
          type="string"
          value={basket.customer}
          onChange={(ev) => setBasket({...basket,customer:ev.target.value})}
        />
        </div>
       <div>
       discount:
        <input
          type="number"
          value={basket.discount}
          onChange={(ev) => setBasket({...basket,discount:Number(ev.target.value)})}
        />
       </div>
       <div>
        <h1>products section</h1>
       <form onSubmit={submitProduct}>
       <div>
       prorduct name:
        <input
          type="text"
          value={product.name}
          onChange={(ev) => setProduct({...product,name:ev.target.value})}
        />
       </div>
       <div>
       product brand:
        <input
          type="text"
          value={product.brand}
          onChange={(ev) => setProduct({...product,brand:ev.target.value})}
        />
       </div>
        <div>
        product code:
        <input
          type="text"
          value={product.code}
          onChange={(ev) => setProduct({...product,code:ev.target.value})}
        />
        </div>
        <input type="submit" value="Add product" />
       </form>
       </div>
        
        <button onClick={addProducts}>Add</button>
      </>
    );
  }