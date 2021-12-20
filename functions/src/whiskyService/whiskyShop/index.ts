
 import * as cheerio from 'cheerio';
//import axios from 'axios'
import fetch from 'cross-fetch';
import { WhiskyService } from '..';
import { Whisky } from '../../model/whisky';


const searchBaseUrl = "https://whiskyshop.it/it/ricerca?controller=search&s="

class WhiskyShopService implements WhiskyService{

    async search(searchCriteria: string): Promise<Whisky[]> {
        
    
        //const shop = request.query.shop
        //const url = whiskyShopSearchBaseUrl
        const r = await fetch(searchBaseUrl+searchCriteria);


        const res = await r.text();
        const html = res;
        const $ = cheerio.load(html);
        const articles = $('#js-product-list article');
        let searchResults: any[] | PromiseLike<any[]> = [];
        for (let i = 0; i < articles.length; i++) {
            const r_1 = articles[i];

            const idProduct = $(r_1).attr('data-id-product') ?? '';
            const distillery = $($($(r_1).find('.prodotti__miniature__distilleria')[0])).text().trim().replace(/\n/g, " ");
            const whiskyName = $($(r_1).find('.prodotti__miniature__nome__link')[0]).text().trim().replace(/\n/g, " ");
            const price = parseFloat($($(r_1).find('.prodotti__miniature__prezzo__corrente')).text().trim().replace(/\n/g, " "));
            if (idProduct) {
                let w = new Whisky(idProduct, distillery, whiskyName, price,true,"","")
                searchResults.push(w);
            }
        }
        return searchResults
    }
    
    
}

export{
    WhiskyService
}