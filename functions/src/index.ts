import * as functions from 'firebase-functions';
//import { Whisky } from './model/whisky';
import { BernabeiService } from './whiskyService/bernabei';
import { WhiskyShopService } from './whiskyService/whiskyShop';
import { db } from './config/firebase'

export const searchWhisky = functions.https.onRequest(async (request, response) => {
        
    const searchCriteria = <string> request.query.name;
    //
    const whiskyShopResults=await new WhiskyShopService().search(searchCriteria);
    const bernabeiResults = await new BernabeiService().search(searchCriteria);
    //TODO: merge results, write results by id. when the results have the same id on firestore then it is the same product
    const results = [...whiskyShopResults, ...bernabeiResults];
    const whiskyCollection=db.collection("whisky");
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
