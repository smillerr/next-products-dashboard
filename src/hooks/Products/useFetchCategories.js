import { endpoints } from "@services/storeAPI/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetchCategories = () => {
    const {categories: {getCategories}} = endpoints
    const [categories, setCategories] = useState([])

    const fetchCategories = async () =>{
        const response = await axios.get(getCategories)
        setCategories(response.data)
    }
    useEffect(()=>{
        try {
            fetchCategories()
        } catch (_) {
            setCategories([])
        }
        
    },[])
    return categories
}

export default useFetchCategories;