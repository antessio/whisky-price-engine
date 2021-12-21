import * as functions from 'firebase-functions';
//import { Whisky } from './model/whisky';
import { BernabeiService } from './whiskyService/bernabei';
import { WhiskyShopService } from './whiskyService/whiskyShop';
import { db } from './config/firebase'

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

export const searchWhisky = functions.https.onRequest(async (request, response) => {
        
    const searchCriteria = <string> request.query.name;
    //
    const whiskyShopResults=await new WhiskyShopService().search(searchCriteria);
    const bernabeiResults = await new BernabeiService().search(searchCriteria);
    //TODO: merge results, write results by id. when the results have the same id on firestore then it is the same product
    const results = [...whiskyShopResults, ...bernabeiResults];
    const whiskyCollection=db.collection("whisky");
    
    const mapByKey = groupBy(results, w=>w.getKey())
    //TODO merge
    console.log(mapByKey)
    results
    .map(w=>Object.assign({}, w))
    .forEach(w=>{
        whiskyCollection.add(w);
    })
    response.send(JSON.stringify(
        {
            "has_more": false,
            "data": results
        }));
        
    
});
