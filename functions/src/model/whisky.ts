export class Whisky{
    productId: string
    distillery: string
    name: string
    price: number
    available: boolean
    link: string
    imageLink?: string

    constructor(productId:string,distillery:string,name:string,price:number,available: boolean,link:string, imageLink?:string){
        this.productId = productId
        this.distillery = distillery
        this.name = name
        this.price = price
        this.available = available
        this.link = link
        this.imageLink = imageLink
    }
}