class ProductReference{
  productId: string
  distillery: string
  name: string
  price: number
  available: boolean
  link: string
  shop:string
  imageLink?: string


  constructor(
    productId: string, 
    distillery: string, 
    name: string, 
    price: number, 
    available: boolean, 
    link: string, 
    shop: string,
    imageLink?: string
) {
    this.productId = productId
    this.distillery = distillery
    this.name = name
    this.price = price
    this.available = available
    this.link = link
    this.imageLink = imageLink
    this.shop = shop
  }

  

    
    

    
}

class Whisky{
    id: string | null
    key: string
    distillery: string
    name: string
    productReferences: ProductReference[]



  constructor(
    id: string | null, 
    key: string, 
    distillery: string, 
    name: string, 
    productReferences: ProductReference[]
) {
    this.id = id 
    this.key = key
    this.distillery = distillery
    this.name = name
    this.productReferences = productReferences
  }

  

}

const whiskyConverter = {
  toFirestore: (whisky: Whisky)=>{
      return {
          "id": whisky.id,
          "key": whisky.key,
          "distillery": whisky.distillery,
          "productReferences": whisky.productReferences.map(pr=>{
            return {
              "productId": pr.productId,
              "distillery": pr.distillery,
              "name": pr.name,
              "price": pr.price,
              "available": pr.available,
              "link": pr.link,
              "shop": pr.shop,
              "imageLink": pr.imageLink
            }
          })
      }
  },
  fromFirestore: (doc: any)=>{
    return new Whisky(doc.id || '',
    doc.key || '',
    doc.distillery || '',
    doc.name ||'', 
    (doc.productReferences && doc.productReferences.map((pr: any)=>{
      return new ProductReference(pr.productId||'',
      pr.distillery||'',
      pr.name||'',
      pr.price||0.0, 
      pr.available||false, 
      pr.link||'',
      pr.shop||'',
      pr.imageLink||'')
    })) || [])
  }
}

export{
    Whisky,
    ProductReference,
    whiskyConverter
}