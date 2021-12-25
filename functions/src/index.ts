import * as functions from 'firebase-functions';
//import { Whisky } from './model/whisky';
import { WhiskyService } from './service/whisky';
import { WhiskyRepository } from './repository/whisky';
import { ProductReference, Whisky } from './service/model/whisky';
import { WhiskyEcommerceSearchService } from './service/whisky/ecommmerce';

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

const whiskyShopService = new WhiskyEcommerceSearchService();
const whiskyRepository = new WhiskyRepository()
const whiskyService = new WhiskyService(whiskyRepository);

export const searchWhisky = functions.https.onRequest(async (request, response) => {
        
    const searchCriteria = <string> request.query.name;
    //
    const searchResults = await whiskyShopService.search(searchCriteria);
    const mapByKey = groupBy(searchResults, w=>w.getKey())

    const results = await Promise.all(Object.keys(mapByKey)
    .map(async(k)=>{
      const existingWhisky=await whiskyService.getByKey(k)
      const ecommerceWhisky = mapByKey[k][0]
      let id = null
      if(existingWhisky && existingWhisky.id){
        //update
        id = existingWhisky.id
      }
      const whisky=new Whisky(id,k, ecommerceWhisky.distillery,ecommerceWhisky.name,[
        new ProductReference(
          ecommerceWhisky.productId,
          ecommerceWhisky.distillery,
          ecommerceWhisky.name,
          ecommerceWhisky.price,
          ecommerceWhisky.available,
          ecommerceWhisky.link,
          ecommerceWhisky.shop,
          ecommerceWhisky.imageLink
        )
      ])
      if(whisky.id){
        //return await whiskyService.update(whisky)
        return whisky
      }else{
        return await whiskyService.insert(whisky)
      }
    }))
  
    
    response.send(JSON.stringify(
        {
            "has_more": false,
            "data": results
        }));
        
    
});
