import { Component, OnInit, TemplateRef } from '@angular/core';
import { Aluno } from '../models/Aluno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public modalRef?: BsModalRef;

  public alunoForm!: FormGroup;

  public titulo = 'Alunos';

  public alunoSelecionado: Aluno | undefined | null;

  public textSimple: string | undefined;


  public alunos = [
    { id: 1, nome: 'Marta', sobrenome: 'Kent', telefone: '492853256' },
    { id: 2, nome: 'Paula', sobrenome: 'Isabela', telefone: '847572845' },
    { id: 3, nome: 'Laura', sobrenome: 'Antonia', telefone: '322345849' },
    { id: 4, nome: 'Luiza', sobrenome: 'Maria', telefone: '482759202' },
    { id: 5, nome: 'Lucas', sobrenome: 'Machado', telefone: '194720475' },
    { id: 6, nome: 'Pedro', sobrenome: 'Alvares', telefone: '385627456' },
    { id: 7, nome: 'Paulo', sobrenome: 'José', telefone: '274859376' },
  ];

  
  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm() {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSubmit() {
    console.log(this.alunoForm?.value);
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar() {
    this.alunoSelecionado = null;
  }

}
