import { Whisky } from "../model/whisky";

export interface WhiskyService{
    search(searchCriteria:string):Promise<Whisky[]>
}