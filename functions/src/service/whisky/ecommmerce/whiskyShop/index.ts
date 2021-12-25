
import * as cheerio from 'cheerio';
import fetch from 'cross-fetch';
import { WhiskyEcommerceSearchServiceInterface } from '..';
import { EcommerceWhisky } from '../model/whisky';


const searchBaseUrl = "https://whiskyshop.it/it/ricerca?controller=search&s="

class WhiskyShopService implements WhiskyEcommerceSearchServiceInterface{

    async search(searchCriteria: string): Promise<EcommerceWhisky[]> {
        
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
            const available = $(r_1).find('.prodotti__miniature__link__immagine--esaurito__sold-out').length==0
            const imageLink = $(r_1).find('.prodotti__miniature__link__immagine').attr('data-image')??""
            const link = $(r_1).find('a.prodotti__miniature__nome__link').attr('href')??""
            if (idProduct) {
                let w = new EcommerceWhisky(idProduct, distillery, whiskyName, price,available,link, 'WHISKY_SHOP',imageLink)
                searchResults.push(w);
            }
        }
        return searchResults
    }
    
    
}

export{
    WhiskyShopService
}