import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Aluno } from '../models/Aluno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlunoService } from './aluno.service';



@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  @Input() botoes: boolean | undefined;

  public modalRef?: BsModalRef;

  public alunoForm!: FormGroup;

  public titulo = 'Alunos';

  public alunoSelecionado: Aluno | undefined | null;

  public textSimple: string | undefined;

  public modo?= 'post';


  public alunos: Aluno[] | undefined;


  constructor(private fb: FormBuilder, private modalService: BsModalService, private alunoService: AlunoService) {
    this.criarForm();
  }

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunoService.getAll().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm() {
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required],
      alunosDisciplinas: [null]
    });
  }

  salvarAluno(aluno: Aluno) {
    (aluno.id === 0) ? this.modo = 'post' : this.modo = 'put';

    if (this.modo == 'post') {
      this.alunoService.post(aluno).subscribe(
        (retorno: Aluno | any) => {
          console.log(retorno);
          this.carregarAlunos();
        },
        (erro: any) => {
          console.log(erro);
        }
      );
    }

    else if (this.modo == 'put') {
      aluno.alunosDisciplinas = []
      this.alunoService.put(aluno).subscribe(
        (retorno: Aluno | any) => {
          console.log(retorno);
          this.carregarAlunos();
        },
        (erro: any) => {
          console.log(erro);
        }
      );
    }

  }

  deletarAluno(id: number, aluno: Aluno) {
    let r = confirm(`Remover aluno ${aluno.nome} ?`);
    if (r) {
      this.alunoService.delete(id).subscribe(
        (model: any) => {
          console.log(model);
          this.carregarAlunos();
        },
        (erro: any) => {
          console.log(erro)
        }
      )
      alert(`Aluno ${aluno.nome} removido com sucesso!`);
    }
  }

  alunoSubmit() {
    this.salvarAluno(this.alunoForm.value);
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  alunoNovo() {
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

  voltar() {
    this.alunoSelecionado = null;
  }

}
