import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComidaService } from '../servicios/comida.service';
import { BebidaService } from '../servicios/bebida.service';

type TipoCarta = 'comida' | 'bebida' | 'vacia';

interface Carta {
  tipo: TipoCarta;
  imagen?: string;
  revelada: boolean;
  encontrada: boolean;
}

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent implements OnInit {

  tarjetas: Carta[] = [];
  bloqueado = false;
  mensaje = '';
  imagenComida = '';
  imagenBebida = '';

  constructor(
    private serviceComida: ComidaService,
    private serviceBebida: BebidaService
  ) { }

  ngOnInit(): void {

    Promise.all([
      this.serviceComida.mostrarPorNombre('Kung Pao Chicken'),
      this.serviceBebida.mostrarPorNombre('Margarita')
    ]).then(([datosComida, datosBebida]) => {
      this.imagenComida = datosComida.meals?.[0]?.strMealThumb ?? '';
      this.imagenBebida = datosBebida.drinks?.[0]?.strDrinkThumb ?? '';

      this.iniciarJuego();
    })
      .catch(error => {
        console.error('Error al cargar las imágenes del juego:', error);
      });
  }

  iniciarJuego(): void {
    this.mensaje = '';
    this.bloqueado = false;

    this.tarjetas = [
      {
        tipo: 'comida',
        imagen: this.imagenComida,
        revelada: false,
        encontrada: false
      },
      {
        tipo: 'bebida',
        imagen: this.imagenBebida,
        revelada: false,
        encontrada: false
      },
      ...Array.from({ length: 14 }, () => ({
        tipo: 'vacia' as TipoCarta,
        revelada: false,
        encontrada: false
      }))
    ];

    for (let i = this.tarjetas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tarjetas[i], this.tarjetas[j]] =
        [this.tarjetas[j], this.tarjetas[i]];
    }
  }

  voltear(carta: Carta): void {
    if (this.bloqueado || carta.revelada) {
      return;
    }
    carta.revelada = true;

    if (carta.tipo === 'vacia') {
      return;
    }

    carta.encontrada = true;

    const encontroComida = this.tarjetas.some(
      tarjeta => tarjeta.tipo === 'comida' && tarjeta.encontrada
    );

    const encontroBebida = this.tarjetas.some(
      tarjeta => tarjeta.tipo === 'bebida' && tarjeta.encontrada
    );

    if (encontroComida && encontroBebida) {
      this.bloqueado = true;
      this.mensaje = '¡Ganaste! Encontraste el plato y la bebida de Manila. El juego se reiniciará.';

      setTimeout(() => this.iniciarJuego(), 2500);
    } else if (carta.tipo === 'comida') {
      this.mensaje = '¡Encontraste la comida! Ahora encuentra la bebida.';
    } else {
      this.mensaje = '¡Encontraste la bebida! Ahora encuentra la comida.';
    }
  }
}
