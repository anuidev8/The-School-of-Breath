import axios from "axios"
import { CategoryType } from "../components/menu/CategorySelector"
import { urlApi } from "../utils/api"


class Category {
    public async getCategories():Promise<CategoryType[]> {
        const res =  await axios.get<CategoryType[]>(`${urlApi}/categories/`)
        return res.data
    }
}

export default new Category()