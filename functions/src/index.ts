import * as functions from 'firebase-functions';
import { Whisky } from './model/whisky';
import { BernabeiService } from './whiskyService/bernabei';
//import { WhiskyShopService } from './whiskyService/whiskyShop';


export const searchWhisky = functions.https.onRequest(async (request, response) => {
        
    const searchCriteria = <string> request.query.name;
    new BernabeiService().search(searchCriteria)
    //new WhiskyShopService().search(searchCriteria)
    .then((searchResults:Whisky[])=>{
        
        response.send(JSON.stringify(
            {
                "has_more": false,
                "data": searchResults
            }
        ));
    })
    
});
