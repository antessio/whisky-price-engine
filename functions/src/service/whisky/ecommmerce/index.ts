import { BernabeiService } from "./bernabei";
import { EcommerceWhisky } from "./model/whisky";
import { WhiskyShopService } from "./whiskyShop";

//https://www.aquavitae.shop/search?search=caol+ila&description=true&limit=25
//https://www.bernabei.it/catalogsearch/result/?q=caol+ila
//https://bevingrosso.it/?s=caol+ila&post_type=product
//https://www.tannico.it/catalogsearch/result/?q=caol+ila

interface WhiskyEcommerceSearchServiceInterface{
    search(searchCriteria:string):Promise<EcommerceWhisky[]>
}

class WhiskyEcommerceSearchService {
    providers: WhiskyEcommerceSearchServiceInterface[]

    constructor(){
        this.providers = [
            new WhiskyShopService(),
            new BernabeiService()
        ]
    }

    search(searchCriteria: string): Promise<EcommerceWhisky[]> {
        return Promise.all(this.providers.map(p=>p.search(searchCriteria)))
        .then(result=>{
            return result.flat()
        })
    }
    
}


export {
    WhiskyEcommerceSearchServiceInterface,
    WhiskyEcommerceSearchService
}

