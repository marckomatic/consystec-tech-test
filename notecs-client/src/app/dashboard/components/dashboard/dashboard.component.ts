import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  ngOnInit(): void {
    // Notas simuladas
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
    // Aquí puedes navegar a una vista de detalle si lo deseas
  }
}
