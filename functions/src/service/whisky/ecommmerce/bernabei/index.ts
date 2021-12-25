
 import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';
import { WhiskyEcommerceSearchServiceInterface } from '..';

import { EcommerceWhisky } from '../model/whisky';



const searchBaseUrl = "https://www.bernabei.it/catalogsearch/result/?q="

class BernabeiService implements WhiskyEcommerceSearchServiceInterface{

    async search(searchCriteria: string): Promise<EcommerceWhisky[]> {
   
        const r = await fetch(searchBaseUrl+searchCriteria);
        
        
        const res = await r.text();
        const html = res;
        const $ = cheerio.load(html);
        const articles = $('.products-grid li.show-addtocart')
        let searchResults: any[] | PromiseLike<any[]> = [];
        console.log(articles.length)
        for (let i = 0; i < articles.length; i++) {
            const r_1 = articles[i];
            
            const distillery = "";
            const pageLink = $($(r_1).find('div.item-img-info a')[0]);
            const whiskyName = pageLink.text().trim().replace(/\n/g, " ");
            const link = pageLink.attr('href')??'';
            const idProduct = link.replace('https://www.bernabei.it/','');
            const price = parseFloat($($(r_1).find('.special-price .price')[0]).text().trim().replace('€','').replace(',','.'));
            
            if (idProduct) {
                let w = new EcommerceWhisky(idProduct, distillery, whiskyName, price,true,link,'BERNABEI','')
                searchResults.push(w);
            }
        }
        return searchResults
    }
    
    
}

export{
    BernabeiService
}