import { useState, useEffect } from "react";

export const useLocalStorage = (key)=>{
    const [keyword, setKeyword] = useState(()=>{
        const savedKeyword = window.localStorage.getItem(key);
        if(savedKeyword){
          return savedKeyword;
        }
        return ''
    });
    // window.localStorage.setItem("key", value);
    // window.localStorage.getItem('key')
  
    useEffect(()=>{
      window.localStorage.setItem(key, keyword)
    }, [keyword])

    return {
        keyword,
        setKeyword
    }

}