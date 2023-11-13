export class Aluno {

    constructor(){
        this.id = 0;
        this.nome = '';
        this.sobrenome = '';
        this.telefone = '';
        this.alunosDisciplinas = [];
    }

    id!: number;
    nome: string | undefined;
    sobrenome: string | undefined;
    telefone: number | string | undefined;
    alunosDisciplinas!: object;
}
