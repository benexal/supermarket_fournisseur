import { AllUser } from "./user";

export interface GestionnaireI extends AllUser {

}
export class Gestionnaire{
    constructor(
        public id: number,
        public username: string,
        public last_name: string,
        public first_name: string,
        public email: string,
        public adresse: string,
        public num_telephone: string,      
        public deleted: boolean,
       
    ){}
}
