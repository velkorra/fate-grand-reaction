export class servantLocalization {
    name: string;
    description: string;
    history: string;
    prototype_person: string;
    illustrator: string;
    voice_actor: string;
    temper: string;
    intro: string;
    constructor(name: string,
        description: string,
        history: string,
        prototype_person: string,
        illustrator: string,
        voice_actor: string,
        temper: string,
        intro: string) {
        this.name = name
        this.description = description
        this.history = history
        this.prototype_person = prototype_person
        this.illustrator = illustrator
        this.voice_actor = voice_actor
        this.temper = temper
        this.intro = intro
    }
}