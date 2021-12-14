const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const Whisky = require('./model/whisky')


const whiskyShopSearchBaseUrl = "https://whiskyshop.it/it/ricerca?controller=search&s="

/*
    <div id="js-product-list">
        <article class="product-miniature prodotti__miniature col-sm-3" data-id-product="646" data-id-product-attribute="0" itemscope="" itemtype="http://schema.org/Product">
        <h6>Anteprima prodotto</h6>

        <a href="https://whiskyshop.it/it/whisky/646/nadurra-ff0714" class="thumbnail product-thumbnail prodotti__miniature__link" title="">
        <div class="prodotti__miniature__link__immagine prodotti__miniature__link__immagine--esaurito" style="background-image: url('https://whiskyshop.it/521/nadurra-ff0714.jpg');" data-full-size-image-url="https://whiskyshop.it/521/nadurra-ff0714.jpg" data-image="https://whiskyshop.it/521/nadurra-ff0714.jpg" data-fallback="https://whiskyshop.it/img/p/foto-campione.jpg">

        <div class="product-flags prodotti__miniature__link__immagine__etichette">

        </div>

        </div>

        <div class="prodotti__miniature__link__immagine--esaurito__sold-out"></div>

        </a>


        <h2 class="prodotti__miniature__distilleria">
        GLENLIVET
        </h2>
        <h3 class="h2 prodotti__miniature__nome" itemprop="name">
        <a href="https://whiskyshop.it/it/whisky/646/nadurra-ff0714" class="prodotti__miniature__nome__link" title="">Nadurra - FF0714</a>
        </h3>


        <div class="product-price-and-shipping prodotti__miniature__prezzo">
        <span itemprop="price" class="price prodotti__miniature__prezzo__corrente">89,00&nbsp;€</span>
        <span class="hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <span class="hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <span class="hidden-xs hidden-sm hidden-md hidden-lg"></span>
        </div>


        <div class="product-list-actions prodotti__miniature__azioni">
        <a class="prodotti__miniature__azioni__link ospite" id="wishlist_button" href="#" rel="nofollow" title="Add to whishlist">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
        <span class="prodotti__miniature__azioni__link__popup">
        Devi essere autenticato
        </span>
        </a>
        <a class="add-to-cart prodotti__miniature__azioni__link" href="https://whiskyshop.it/it/carrello?add=1&amp;id_product=646&amp;id_product_attribute=0&amp;token=88be6ba458fe09e2a06d53ce05e60b01" rel="nofollow" data-id-product="646" data-id-product-attribute="0" data-link-action="add-to-cart" title="Aggiungi al carrello"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>
        <span class="hidden-xs hidden-sm hidden-md hidden-lg">
        <div class="wrap_allert">
        <p class="buttons_bottom_block"><a href="#" id="wishlist_button" onclick="if (!window.__cfRLUnblockHandlers) return false; return false;">
        <i class="material-icons">favorite</i>
        Add to Wishlist</a></p>
        <div class="allert_note" style="display: none;">You must be logged
        <p class="login_links">
        <a class="inline" href="https://whiskyshop.it/it/account">Accedi</a> | <a class="inline" href="https://whiskyshop.it/it/account">Register</a>
        </p>
        </div>
        </div>
        </span>
        </div>


        <div class="hidden-xs hidden-sm hidden-md hidden-lg">
        </div>

        </article>

*/

function searchWhiskyShop(searchString){
    const url = whiskyShopSearchBaseUrl+searchString.replace(" ","+")
    
    return fetch(url)
    .then(r=>r.text())
    .then( (res) => {
        const html = res;
        const $ = cheerio.load(html);
        const articles = $('#js-product-list article')
        searchResults = []
        for(i=0; i<articles.length; i++){
            r=articles[i]

            idProduct = $(r).attr('data-id-product')
            distillery = $($($(r).find('.prodotti__miniature__distilleria')[0])).text().replace(/\n/g, " ");
            whiskyName = $($(r).find('.prodotti__miniature__nome__link')[0]).text().replace(/\n/g, " ");
            price = $($(r).find('.prodotti__miniature__prezzo__corrente')).text().replace(/\n/g, " ");
        
            searchResults.push(new Whisky(idProduct,distillery,whiskyName,price))
        }
        return searchResults
        
    })
}


//searchWhiskyShop("glenlivet 18").then(r=>console.log(r))

