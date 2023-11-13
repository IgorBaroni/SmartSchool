export class Professor {
    
    constructor(){
        this.id = 0;
        this.nome = '';
        this.disciplina = '';
        this.disciplinas = [];
    }

    id!: number;
    nome: string | undefined;
    disciplina: string | undefined;
    disciplinas!: object;
}
