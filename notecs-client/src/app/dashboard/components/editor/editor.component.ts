import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Tarea {
  id?: number;
  title: string;
  content: string;
  userId?: number;
  date: string;
  completed: boolean;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  standalone: false,
})
export class EditorComponent {
  tarea: Tarea;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tarea | null,
    private dialogRef: MatDialogRef<EditorComponent>
  ) {

    this.tarea = data? { ...data }
      : {
          title: 'Sin Título',
          content: '',
          date: '',
          completed: false
        };

        console.log(this.tarea)

  }

  guardar() {
    const fecha = new Date();
    this.tarea.date = this.formatDate(fecha);

    this.dialogRef.close(this.tarea);
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  formatDate(date:Date) {
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
}