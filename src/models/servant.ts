export class Servant {
    id: number;
    name: string;
    className: string;
    ascensionLevel: number;
    level: number;
    alignment : string;
    gender : string;
    state : string

    constructor(id: number, name: string, className: string, ascensionLevel: number, level: number, alignment : string, gender : string, state : string) {
        this.id = id;
        this.name = name;
        this.className = className;
        this.ascensionLevel = ascensionLevel;
        this.level = level;
        this.alignment = alignment
        this.gender = gender
        this.state = state
    }
}