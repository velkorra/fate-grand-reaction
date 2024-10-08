export interface ServantData {
    id: number;
    name: string;
    className: string;
    ascensionLevel: number;
    level: number;
    alignment: string;
    gender: string;
    state: string;
    trueName: string;
}

export interface ServantLocalization {
    language: string;
    name: string;
    description: string;
    history: string;
    prototypePerson: string;
    illustrator: string;
    voiceActor: string;
    temper: string;
    intro: string;
}

export interface ServantWhithLocalization extends ServantData {
    localizations : ServantLocalization[]
}

export interface ServantUpdate {
    name: string;
    className: string;
    alignment: string;
    gender: string;
}
export interface FullServant extends ServantUpdate {

}

export interface Contract {
    servant_id: number;
    master_id: number;
    command_spells: number
    status: string
    start_date: string
    end_date: string
}



export interface master {
    id: number
    nickname: string
}