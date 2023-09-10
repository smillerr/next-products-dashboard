import axios from "axios"
import { endpoints } from "./endpoints"
export const deleteProduct = async (id, errorMessage) =>{
    const {products: {deleteProduct}} = endpoints
    const config = {
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.delete(deleteProduct(id),config)
        return response.data
    } catch (error) {
        errorMessage('We are having problems right now deleting this product, please try again later')
    }
    
}