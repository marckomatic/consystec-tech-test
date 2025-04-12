import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditorComponent } from '../editor/editor.component';
import { MatDialog } from '@angular/material/dialog';

interface Nota {
  id: number;
  title: string;
  content: string;
  userId: number;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  notas: Nota[] = [];
  notasFiltradas: Nota[] = [];
  filtro = new FormControl('');

  constructor(private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.notas = Array.from({ length: 15 }).map((_, i) => ({
      id: i + 1,
      title: `Nota ${i + 1}`,
      content: `Este es el contenido de la nota número ${i + 1}. Contiene ideas importantes sobre el tema ${i % 3 === 0 ? 'angular' : 'typescript'}.`,
      userId: 1,
      date: `${Math.floor(Math.random() * 28 + 1)}/04/2022`
    }));
    this.notasFiltradas = this.notas;

    this.filtro.valueChanges.subscribe(valor => {
      const query = valor?.toLowerCase() || '';
      this.notasFiltradas = this.notas.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query) ||
        n.date.includes(query)
      );
    });
  }

  seleccionarNota(nota: Nota) {
    console.log('Nota seleccionada:', nota);
  }

  crearNota(nota: Nota | null){
    const dialogRef = this.dialog.open(EditorComponent, {
      width: '500px',
      data: nota,
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        console.log('Nota guardada:', result);
      } else {
        console.log('Edición cancelada');
      }
    });
  }
}
