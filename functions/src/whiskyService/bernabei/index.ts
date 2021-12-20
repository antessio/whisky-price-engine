
 import * as cheerio from 'cheerio';
//import axios from 'axios'
import fetch from 'cross-fetch';
import { WhiskyService } from '..';
import { Whisky } from '../../model/whisky';



// // const cheerio = require('cheerio')
// // const fetch = require('node-fetch')

/*
<li class="span4 item show-addtocart first">
                    <div class="sponsorizzato"></div>
                    <div class="item-inner clearfix ">
                	<div class="item-img have-icosale clearfix">
                    	<div class="list-right-icons">
                            <span class="ico-product ico-sale"><strong>-21% 39.9000</strong> off</span>                        </div>
                        
                                                

                        <div class="item-img-info">

                            <div class="item-title">
                                <a href="https://www.bernabei.it/the-glenlivet-single-malt-scotch-whisky-15-anni-70cl" title="The Glenlivet Single Malt Scotch Whisky 15 Anni 70cl (Astucciato)">
                                    The Glenlivet Single Malt Scotch Whisky 15 Anni 70cl (Astucciato)                                </a>
                            </div>

                            <a href="https://www.bernabei.it/the-glenlivet-single-malt-scotch-whisky-15-anni-70cl" title="The Glenlivet Single Malt Scotch Whisky 15 Anni 70cl (Astucciato)" class="product-image">

                                                                    <div class="ratings">
        <meta itemprop="ratingValue" content="98">
        <meta itemprop="reviewCount" content="10">
        <meta itemprop="bestRating" content="100">
        <meta itemprop="worstRating" content="0">
        
                    <div class="blocco-rating">
                <div class="rating-box">
                    <div class="rating" style="width:98%"></div>
                    
                </div>
                <h4>&nbsp; 4.9 &nbsp; (10 Recensioni)</h4>
                <span>&nbsp;(10)</span>
                <div class="clearer"></div>
            </div>
                <!--
        <p class="rating-links">
            <a href=""></a>
            <span class="separator">|</span>
            <a href="#review-form"></a>
        </p>
        -->
    </div>
                                                                <span class="img-main">
                                    <img src="https://resizer.bernabei.it/ARTICOLI200/S_4332.png" alt="The Glenlivet Single Malt Scotch Whisky 15 Anni 70cl (Astucciato)">
                                </span>
                            </a>
                                                                                    <div class="item-box-hover number-buttom2">
                                <div class="box-inner">
                                <div class="actions">
                                    <ul class="add-to-links">
                                                                                    <li><a title="Aggiungi alla Wishlist" href="https://www.bernabei.it/wishlist/index/add/product/5350/form_key/1p2glozCcLbKjpQb/" class="link-wishlist" data-toggle="tooltip" data-original-title="Aggiungi alla Wishlist"></a></li>
                                                                                                                            <li><a title="Confronta" href="" class="link-compare" data-toggle="tooltip" data-original-title="Confronta"></a></li>
                                                                            </ul>
                                </div>
                                                                </div>
                            </div>
                                                    </div>

                    </div>
                    <div class="item-info">
                        <div class="info-inner">
                            <div class="item-content">
                                <div class="item-price">
                                                                        

                        
    <div class="price-box">
                                            
        
                            <p class="special-price">
                    <span class="price-label">Special Price</span>
                <span itemprop="price" class="price" id="product-price-53501940317951639766761">
                    39,90&nbsp;€                </span>
                </p>
            
            <p class="old-price">
                <span class="price-label">Prezzo di listino:</span>
                <span class="price priceOld" id="old-price-53501940317951639766761">
                    50,80&nbsp;€                </span>
            </p>

        
    
        <div class="clearer"></div>
    </div>


                                </div>
                            </div>
                        </div>
                    </div>
			                        <div class="cart-wrap">
                                                    <button title="Aggiungi al carrello" class="btn-cart sku4332 " onclick="setLocation('https://www.bernabei.it/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYmVybmFiZWkuaXQvY2F0YWxvZ3NlYXJjaC9yZXN1bHQvP3E9Z2xlbmxpdmV0/product/5350/form_key/1p2glozCcLbKjpQb/')" data-toggle="tooltip" data-original-title="Aggiungi al carrello">Aggiungi al carrello</button>
                                                                            </div>
                        		</div>
            </li>
*/

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
            const r_1 = articles[i];
            
            const distillery = "";
            const pageLink = $($(r_1).find('div.item-img-info a')[0]);
            const whiskyName = pageLink.text().trim().replace(/\n/g, " ");
            const link = pageLink.attr('href')??'';
            const idProduct = link.replace('https://www.bernabei.it','');
            const price = parseFloat($($(r_1).find('.special-price .price')[0]).text().trim().replace('€','').replace(',','.'));
            // const price = parseFloat($($(r_1).find('.prodotti__miniature__prezzo__corrente')).text().trim().replace(/\n/g, " "));
            
            // const available = $($($(r_1).find('.prodotti__miniature__link__immagine--esaurito__sold-out'))).length>0
            // const link = $($(r_1).find('.prodotti__miniature__link')[0]).attr('href')??'';
            // //console.log(idProduct);
            if (idProduct) {
                let w = new Whisky(idProduct, distillery, whiskyName, price,true,link,'BERNABEI')
                searchResults.push(w);
            }
        }
        return searchResults
    }
    
    
}

export{
    BernabeiService
}