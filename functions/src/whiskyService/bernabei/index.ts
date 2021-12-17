
 import * as cheerio from 'cheerio';
//import axios from 'axios'
import fetch from 'cross-fetch';
import { WhiskyService } from '..';
import { Whisky } from '../../model/whisky';



// // const cheerio = require('cheerio')
// // const fetch = require('node-fetch')

const searchBaseUrl = "https://www.bernabei.it/catalogsearch/result/?q="

class BernabeiService implements WhiskyService{

    async search(searchCriteria: string): Promise<Whisky[]> {
        
        //const shop = request.query.shop
        //const url = whiskyShopSearchBaseUrl
        const r = await fetch(searchBaseUrl+searchCriteria);
        
        
        const res = await r.text();
        const html = res;
        const $ = cheerio.load(html);
        const articles = $('.products-grid li.show-addtocart')
        let searchResults: any[] | PromiseLike<any[]> = [];
        console.log(articles.length)
        for (let i = 0; i < articles.length; i++) {
            //const r_1 = articles[i];
            

            // const idProduct = $(r_1).attr('data-id-product') ?? '';
            // const distillery = $($($(r_1).find('.prodotti__miniature__distilleria')[0])).text().trim().replace(/\n/g, " ");
            // const whiskyName = $($(r_1).find('.prodotti__miniature__nome__link')[0]).text().trim().replace(/\n/g, " ");
            // const price = parseFloat($($(r_1).find('.prodotti__miniature__prezzo__corrente')).text().trim().replace(/\n/g, " "));
        
            // const available = $($($(r_1).find('.prodotti__miniature__link__immagine--esaurito__sold-out'))).length>0
            // const link = $($(r_1).find('.prodotti__miniature__link')[0]).attr('href')??'';
            // //console.log(idProduct);
            // if (idProduct) {
            //     let w = new Whisky(idProduct, distillery, whiskyName, price,available,link)
            //     searchResults.push(w);
            // }
        }
        return searchResults
    }
    
    
}

export{
    BernabeiService
}