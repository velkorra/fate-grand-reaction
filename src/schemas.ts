export interface ServantData {
    id: number;
    name: string;
    class_name: string;
    ascension_level: number;
    level: number;
    alignment : string;
    gender : string
    state : string
}
export interface Contract {
    servant_id : number;
    master_id : number;
    command_spells : number
    status : string
    start_date : string
    end_date : string
}
export interface master{
    id: number
    nickname : string
}