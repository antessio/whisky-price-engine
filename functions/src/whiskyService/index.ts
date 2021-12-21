import { Whisky } from "../model/whisky";

//https://www.aquavitae.shop/search?search=caol+ila&description=true&limit=25
//https://www.bernabei.it/catalogsearch/result/?q=caol+ila
//https://bevingrosso.it/?s=caol+ila&post_type=product
//https://www.tannico.it/catalogsearch/result/?q=caol+ila
export interface WhiskyService{
    search(searchCriteria:string):Promise<Whisky[]>
}