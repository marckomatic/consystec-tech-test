import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth.service';
import { TaskService } from '../../../services/task/task.service';
import { AlertService } from '../../../services/alert/alert.service';
import { EditorComponent } from '../editor/editor.component';

interface Tarea {
  id: number;
  title: string;
  content: string;
  userId: number;
  date: string;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  tareas: Tarea[] = [];
  tareasFiltradas: Tarea[] = [];
  filtro = new FormControl('');
  estadoSeleccionado: string = "Todas";
  userName: string | undefined;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private taskService: TaskService,
              private alertService: AlertService) {
    this.userName = authService.getCurrentUser()?.name;
    this.populateTasks();
  }

  ngOnInit(): void {
    this.populateTasks();
    this.filtro.valueChanges.subscribe(valor => {
      this.filtrarTareas();
    });
  }

  creartarea(tarea: Tarea | null) {
    const dialogRef = this.dialog.open(EditorComponent, {
      width: '500px',
      data: tarea,
    });
  
    dialogRef.afterClosed().subscribe((result: Tarea) => {
      if (!result.id) {
        this.taskService.createTask(result.title, result.content, result.date, this.authService.getCurrentUser()?.id)
            .then((res: any) => {
              this.populateTasks();
            })
            .catch(error => {
              console.error(error);
              this.alertService.openSnackBar(error.error, "Ok");
            });
      } else {
        this.taskService.editTask(result)
            .then((res: any) => {
              this.populateTasks();
            })
            .catch(error => {
              console.error(error);
              this.alertService.openSnackBar(error.error, "Ok");
            });
      }
    });
  }

  populateTasks() {
    this.taskService.getTasks(this.authService.getCurrentUser()?.id)
        .then((result: any) => {
          this.tareas = result;
          this.filtrarTareas();
        })
        .catch(error => {
          console.error(error);
          this.alertService.openSnackBar(error.error, "Ok");
        });
  }

  filtrarTareas() {
    const query = this.filtro.value?.toLowerCase() || '';
    this.tareasFiltradas = this.tareas.filter(n => {
      const coincideTexto = n.title.toLowerCase().includes(query) ||
                            n.content.toLowerCase().includes(query) ||
                            n.date.includes(query);
      if (this.estadoSeleccionado === "Todas") {
        return coincideTexto;
      } else if (this.estadoSeleccionado === "Completada") {
        return coincideTexto && n.completed === true;
      } else if (this.estadoSeleccionado === "No completada") {
        return coincideTexto && n.completed === false;
      }
      return true;
    });
  }

  onEstadoChange(nuevoEstado: string) {
    this.estadoSeleccionado = nuevoEstado;
    this.filtrarTareas();
  }

  deleteTask(tarea: Tarea, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.taskService.deleteTask(tarea)
        .then((result) => {
          this.populateTasks();
        })
        .catch(error => {
          this.populateTasks();
        });
  }

  confirmTask(tarea: Tarea, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.taskService.completeTask(tarea)
        .then((result) => {
          tarea.completed = !tarea.completed;
        })
        .catch(error => {
          console.error(error);
          this.alertService.openSnackBar("Error al actualizar la tarea", "Ok");
        });
  }
}
