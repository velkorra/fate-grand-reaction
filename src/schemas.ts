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

export interface servantLocalization {
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
export interface Contract {
    servant_id: number;
    master_id: number;
    command_spells: number
    status: string
    start_date: string
    end_date: string
}

export interface ServantWhithLocalization extends ServantData {
    localizations : servantLocalization[]
}


export interface master {
    id: number
    nickname: string
}