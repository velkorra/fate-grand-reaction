export class Servant {
    id: number;
    name: string;
    className: string;
    ascensionLevel: number;
    level: number;

    constructor(id: number, name: string, className: string, ascensionLevel: number, level: number) {
        this.id = id;
        this.name = name;
        this.className = className;
        this.ascensionLevel = ascensionLevel;
        this.level = level;
    }
}