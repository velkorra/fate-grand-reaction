export class Servant {
    id: number;
    name: string;
    className: string;
    ascensionLevel: number;
    level: number;
    alignment : string;
    gender : string

    constructor(id: number, name: string, className: string, ascensionLevel: number, level: number, alignment : string, gender : string) {
        this.id = id;
        this.name = name;
        this.className = className;
        this.ascensionLevel = ascensionLevel;
        this.level = level;
        this.alignment = alignment
        this.gender = gender
    }
}