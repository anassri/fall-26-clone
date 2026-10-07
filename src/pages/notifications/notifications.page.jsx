import { SearchComposer } from "../home/home.page";
import {useState} from "react";

export const Notifications = ()=>{
    const [searchKeyword, setSearchKeyword] = useState('');
    
    const handleSearch = ()=>{
        
        window.alert('search is clicked')
    }
    
    const handleClear = ()=>{
        setSearchKeyword('')
    }
    return <>
    <span>Notifications.</span>
    <SearchComposer 
        searchKeyword={searchKeyword} 
        handleSearch={handleSearch} 
        setSearchKeyword={setSearchKeyword} 
        handleClear={handleClear}
        />
    </>
}