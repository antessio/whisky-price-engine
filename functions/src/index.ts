import * as functions from 'firebase-functions';
 import * as cheerio from 'cheerio';
//import axios from 'axios'
import fetch from 'cross-fetch';


// // const cheerio = require('cheerio')
// // const fetch = require('node-fetch')

const whiskyShopSearchBaseUrl = "https://whiskyshop.it/it/ricerca?controller=search&s="


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const searchWhisky = functions.https.onRequest(async (request, response) => {
        
        const searchCriteria = request.query.name;
        //const shop = request.query.shop
        //const url = whiskyShopSearchBaseUrl
        const r = await fetch(whiskyShopSearchBaseUrl+searchCriteria);
        
        
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
            //console.log(idProduct);
            if (idProduct) {
                let w = new Whisky(idProduct, distillery, whiskyName, price)
                searchResults.push(w);
            }
        }
        
    response.send(searchResults.map(w=>JSON.stringify(w)).join('\n'));
});

class Whisky{
    productId: string
    distillery: string
    name: string
    price: number

    constructor(productId:string,distillery:string,name:string,price:number){
        this.productId = productId
        this.distillery = distillery
        this.name = name
        this.price = price
    }
}
