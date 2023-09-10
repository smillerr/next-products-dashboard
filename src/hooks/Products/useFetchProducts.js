import React, { useEffect, useState } from "react"
import axios from "axios"
import { endpoints } from "@services/storeAPI/endpoints"
const useFetchProducts = (offset, limit) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [allProducts, setAllProducts] = useState(0)
    const {products: {getProducts, getAllProducts}} = endpoints
    const fetchProducts = async () => {
        setLoading(true)
        const response = await axios.get(getProducts(offset,limit))
        setProducts(response.data)
        setLoading(false)
    }
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(getAllProducts)
            const data = await response.data
            setAllProducts(data.length)
        } catch (_) {
            setAllProducts(0)
        }
    }
    useEffect(()=>{
        try {
            fetchProducts()
            fetchAllProducts()
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    },[offset, limit, allProducts])
    return {products,
    loading, allProducts, setAllProducts}
}

export default useFetchProducts;