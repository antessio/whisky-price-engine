export class Whisky{
    productId: string
    distillery: string
    name: string
    price: number
    available: boolean
    link: string
    imageLink?: string
    shop:string

    constructor(productId:string,distillery:string,name:string,price:number,available: boolean,link:string, shop: string, imageLink?:string){
        this.productId = productId
        this.distillery = distillery
        this.name = name
        this.price = price
        this.available = available
        this.link = link
        this.shop = shop
        this.imageLink = imageLink
    }
}