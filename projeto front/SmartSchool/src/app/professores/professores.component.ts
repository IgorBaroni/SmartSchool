import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Professor } from '../models/Professor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfessorService } from './professor.service';


@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  @Input() botoes: boolean | undefined;

  public modalRef?: BsModalRef;

  public profForm!: FormGroup;

  public titulo = "Professores";

  public professorSelecionado: Professor | undefined | null;

  public professores: Professor[] | undefined;

  public modo?= 'post';


  constructor(private fb: FormBuilder, private modalService: BsModalService, private professorService: ProfessorService) {
    this.criarForm();
  }

  ngOnInit() {
    this.carregarProfessor();
  }

  carregarProfessor() {
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro: any) => {
        console.log(erro)
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm() {
    this.profForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      // disciplina: ['', Validators.required],
      disciplinas: [null]
    })
  }

  salvarProf(prof: Professor) {
    (prof.id === 0) ? this.modo = 'post' : this.modo = 'put';

    if (this.modo == 'post') {
      this.professorService.post(prof).subscribe(
        (retorno: Professor | any) => {
          console.log(retorno);
          this.carregarProfessor();
        },
        (erro: any) => {
          console.log(erro);
        }
      )
    }

    else if (this.modo == 'put') {
      prof.disciplinas = []
      this.professorService.put(prof).subscribe(
        (retorno: Professor | any) => {
          console.log(retorno);
          this.carregarProfessor();
        },
        (erro: any) => {
          console.log(erro);
        }
      )
    }


  }

  deletarProf(id: number, prof: Professor) {
    let r = confirm(`Remover professor ${prof.nome} ?`);
    if (r) {
      this.professorService.delete(id).subscribe(
        (model: any) => {
          console.log(model);
          this.carregarProfessor();
        },
        (erro: any) => {
          console.log(erro)
        }
      )
      alert(`Professor ${prof.nome} removido com sucesso!`);
    }
  }

  profSubmit() {
    this.salvarProf(this.profForm.value);
  }

  professorNovo() {
    this.professorSelecionado = new Professor();
    this.profForm.patchValue(this.professorSelecionado);
  }


  professorSelect(professor: Professor) {
    this.professorSelecionado = professor;
    this.profForm.patchValue(professor);
  }
  voltar() {
    this.professorSelecionado = null;
  }


}
