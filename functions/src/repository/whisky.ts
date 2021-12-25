import { db } from '../config/firebase'


class WhiskyRepository{
     
    whiskyCollection=db.collection("whisky");
    
    addWhiskies(whiskies: object[]){
        return Promise.all(whiskies.map(w=>{
            return this.whiskyCollection.add(w)
            .then(r=>{
                return {id: r.id, ...w}
            })
        }))
    }

    addWhisky(whisky: any){
        return this.whiskyCollection.add(whisky)
        .then(r=>{
            console.log(r.id)
            return {...whisky,id: r.id}
        })
    }
    updateWhisky(whisky: any){
        return this.whiskyCollection.doc(whisky.id).set(whisky);
        
    }
    findByKey(key:string){
        return this.whiskyCollection.where('key','==',key).limit(1).get()
    }
}

export {
    WhiskyRepository
}