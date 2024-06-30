export class Master {
    id: number;
    nickname: string;
    display_name: string;
    level: number
    constructor(id: number, nickname: string, display_name: string, level: number) {
        this.id = id
        this.nickname = nickname
        this.display_name = display_name
        this.level = level
    }
}
