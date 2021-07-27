import { useEffect, useState } from "react"

export const useDomloaded = ()=>{
    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{
        setLoaded(true)
    },[])

    return loaded
}