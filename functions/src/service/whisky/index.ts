//TODO: whisky service CRUD 

import { WhiskyRepository } from "../../repository/whisky";
import { Whisky,whiskyConverter } from "../model/whisky";

class WhiskyService{
    async insert(whisky: Whisky): Promise<Whisky> {
      return await this.whiskyRepository.addWhisky(whiskyConverter.toFirestore(whisky))
      .then(r=>{
            console.log(r)
          return whiskyConverter.fromFirestore(r)
        })
    }
    async update(whisky: Whisky): Promise<Whisky> {
      return await this.whiskyRepository.updateWhisky(whiskyConverter.toFirestore(whisky))
      .then(r=>whiskyConverter.fromFirestore(r))
    }
    private whiskyRepository: WhiskyRepository;

    constructor(whiskyRepository: WhiskyRepository){
        this.whiskyRepository = whiskyRepository;
    }

    async getByKey(key: string){
        return await this.whiskyRepository.findByKey(key)
        .then(snapshot=>{
            if(snapshot.docs.length>0){
                return whiskyConverter.fromFirestore({...snapshot.docs[0].data(),id: snapshot.docs[0].id})
            }else{
                return null
            }
        });
    }
}

export{
    WhiskyService
}