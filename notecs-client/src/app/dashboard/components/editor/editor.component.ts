import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Nota {
  id?: number;
  title: string;
  content: string;
  userId?: number;
  date: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  standalone: false,
})
export class EditorComponent {
  nota: Nota;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Nota | null,
    private dialogRef: MatDialogRef<EditorComponent>
  ) {

    this.nota = data? { ...data }
      : {
          title: 'Sin Título',
          content: '',
          date: '',
        };

        console.log(this.nota)

  }

  guardar() {
    const fecha = new Date();
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const fechaFormateada = `${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;

    this.nota.date = fechaFormateada;

    this.dialogRef.close(this.nota);
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}