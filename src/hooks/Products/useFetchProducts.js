import React, { useEffect, useState } from "react"
import axios from "axios"
import { endpoints } from "@services/storeAPI/endpoints"
const useFetchProducts = (offset, limit) => {
    const [products, setProducts] = useState([])
    const {products: {getProducts}} = endpoints

    const fetchProducts = async () => {
        const response = await axios.get(getProducts(offset,limit))
        setProducts(response.data)
    }
    useEffect(()=>{
        try {
            fetchProducts()
        } catch (error) {
            console.log(error);
        }
    },[offset, limit])
    return products
}

export default useFetchProducts;