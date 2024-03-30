import { useLiveQuery } from "dexie-react-hooks";
import { Basket, Product, db } from "../../db";
import { useEffect, useState } from "react";

export function CustomerList() {
    const [basket,setBasket]=useState({} as Basket);
    const basketArray = useLiveQuery(() => db.basket.toArray());
    console.log(basketArray,1)
   useEffect(()=>{
        if(basketArray){
            setBasket(basketArray[0])
        }
   },[basketArray])
   console.log(basket)
    return (
      <>
        {basket.customer &&
            <div>
        <p>name: {basket.customer}</p>
        <p>discount: {basket.discount}</p>
            {basket.products.map((item:Product)=>(
                <ul style={{display:"flex", alignItems:"center",gap:"0.5rem",listStyleType:"none"}} key={item.code}>
                    <li>{item.brand}</li>
                    <li>{item.code}</li>
                    <li>{item.name}</li>
                </ul>
            ))}
        </div>
    }
    </>
      
    );
  }