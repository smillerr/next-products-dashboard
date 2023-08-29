import React, { useEffect, useState } from "react"
import axios from "axios"
import { endpoints } from "@services/storeAPI/endpoints"
const useFetchProducts = (offset, limit) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {products: {getProducts}} = endpoints

    const fetchProducts = async () => {
        setLoading(true)
        const response = await axios.get(getProducts(offset,limit))
        setProducts(response.data)
        setLoading(false)
    }
    useEffect(()=>{
        try {
            fetchProducts()
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    },[offset, limit])
    return {products,
    loading}
}

export default useFetchProducts;