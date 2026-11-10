import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComidaService } from '../servicios/comida.service';
import { BebidaService } from '../servicios/bebida.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  private comidaService = inject(ComidaService);
  private bebidaService = inject(BebidaService);

  comidaEstrella: any = null;
  bebidaEstrella: any = null;

  ngOnInit(): void {
    this.comidaService.mostrarPorNombre('Kung Pao Chicken')
      .then(data => {
        this.comidaEstrella = data.meals?.[0] ?? null;
      })
      .catch(error => console.error('Error al cargar comida estrella:', error));

    this.bebidaService.mostrarPorNombre('Margarita')
      .then(data => {
        this.bebidaEstrella = data.drinks?.[0] ?? null;
      })
      .catch(error => console.error('Error al cargar bebida estrella:', error));
  }

}
