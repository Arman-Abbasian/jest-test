import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

type Post={
        userId: number,
        id: number,
        title: string,
        body:string
}

const JestTest=()=>{
    const [loading,setLoading]=useState(true)
    const [posts,setPosts]=useState<Post[]>([] as Post[])
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(({data})=>{
            setPosts(data as Post[]);
            setLoading(false)
        })
        .catch(err=>console.log(err))
    },[])
    if(loading) return <div>loading .....</div>
    return(
        <div>
            {posts.map(item=>{
                return <p>{item.title}</p>
            })}
        </div>
    )
}
export default JestTest;