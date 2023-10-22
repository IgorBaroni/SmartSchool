import { Component, OnInit, TemplateRef } from '@angular/core';
import { Professor } from '../models/Professor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  public modalRef?: BsModalRef;

  public profForm!: FormGroup;

  public titulo = "Professores";

  public professorSelecionado: Professor | undefined | null;

  public professores = [
    {id: 1, nome: "Lauro", disciplina: 'Matemática'},
    {id: 2, nome: "Roberto", disciplina: 'Física'},
    {id: 3, nome: "Ronaldo", disciplina: 'Português'},
    {id: 4, nome: "Rodrigo", disciplina: 'Inglês'},
    {id: 5, nome: "Alexandre", disciplina: 'Programação'},
  ];


  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
   }

   ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

   criarForm(){
    this.profForm = this.fb.group({
      nome: ['', Validators.required],
      disciplina: ['', Validators.required]
    })
   }

  profSubmit() {
    console.log(this.profForm?.value);
  }


  professorSelect(professor: Professor){
    this.professorSelecionado = professor;
    this.profForm.patchValue(professor);
  }
  voltar(){
    this.professorSelecionado = null;
  }


}
