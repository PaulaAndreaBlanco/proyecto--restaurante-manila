import { Component, OnInit, inject } from '@angular/core';
import { ComidaService } from '../servicios/comida.service';
import { Comida } from '../entidades/comida';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../servicios/pedido.service';


@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comidas.component.html',
  styleUrl: './comidas.component.css'
})

export class ComidasComponent implements OnInit {

  private pedidoService = inject(PedidoService);


  listaCompleta: Comida[] = [];
  listaNombre: (Comida & { cantidadSeleccionada: number })[] = [];
  nombreBuscar: string = "";
  ingredienteBuscar: string = "";

  categorias: any[] = [];
  gruposCategorias: any[][] = [];

  productoAgregadoId: string | null = null;

  constructor(private serviceComida: ComidaService) {

  }


  ngOnInit() {

    this.serviceComida.mostrarPorNombre('')
      .then(data => {
        const resultados = data.meals ?? [];

        this.listaCompleta = resultados.map((datoApi: any) => {
          const comida = new Comida();

          comida.idMeal = datoApi.idMeal;
          comida.nombre = datoApi.strMeal;
          comida.imagen = datoApi.strMealThumb;
          comida.categoria = datoApi.strCategory;
          comida.ingredientes = [];

          for (let i = 1; i <= 20; i++) {
            const ingrediente = datoApi[`strIngredient${i}`]?.trim();

            if (ingrediente) {
              comida.ingredientes.push(ingrediente);
            }
          }

          comida.precio = Math.round(Math.random() * 20000) + 30000;
          comida.detalleCargado = true;

          return comida;
        });

        this.listaNombre = this.listaCompleta.map(comida => ({
          ...comida,
          cantidadSeleccionada: 1
        }));
      })
      .catch(error => console.error('Error al cargar comidas:', error));


    this.serviceComida.mostrarCategorias()
      .then((categorias: any[]) => {
        this.categorias = categorias;
        this.gruposCategorias = [];

        for (let i = 0; i < this.categorias.length; i += 7) {
          this.gruposCategorias.push(this.categorias.slice(i, i + 7));
        }
      })
      .catch(error => console.error('Error al cargar categorías:', error));
  }



  private preciosPorComida = new Map<string, number>();

  private obtenerPrecio(idMeal: string): number {
    if (!this.preciosPorComida.has(idMeal)) {
      this.preciosPorComida.set(
        idMeal,
        Math.round(Math.random() * 20000) + 30000
      );
    }

    return this.preciosPorComida.get(idMeal)!;
  }

  filtrarPorCategoria(nombreCategoria: string) {
    this.listaNombre = [];

    this.serviceComida.categorias(nombreCategoria)
      .then((comidas: any[]) => {
        this.listaNombre = comidas.map(datoApi => {
          const comida = new Comida();
          comida.idMeal = datoApi.idMeal;
          comida.nombre = datoApi.strMeal;
          comida.imagen = datoApi.strMealThumb;
          comida.precio = this.obtenerPrecio(comida.idMeal);
          return {
            ...comida,
            cantidadSeleccionada: 1
          };
        });
      })
      .catch(error => console.error('Error al filtrar por categoría:', error));
  }

  comidaNombre() {
    this.ingredienteBuscar = "";
    this.serviceComida.mostrarPorNombre(this.nombreBuscar)
      .then(data => {
        this.listaNombre = (data.meals ?? []).map((datoApi: any) => {
          const comida = new Comida();

          comida.idMeal = datoApi.idMeal;
          comida.nombre = datoApi.strMeal;
          comida.imagen = datoApi.strMealThumb;
          comida.precio = this.obtenerPrecio(comida.idMeal);
          comida.detalleCargado = true;

          comida.ingredientes = [];
          for (let i = 1; i <= 20; i++) {
            const ingrediente = datoApi[`strIngredient${i}`]?.trim();
            if (ingrediente)
              comida.ingredientes.push(ingrediente);
          }

          return {
            ...comida,
            cantidadSeleccionada: 1
          };
        });
      })
      .catch(error => console.error('Error al buscar por nombre:', error));
  }


  comidaIngrediente() {
    this.nombreBuscar = "";
    this.serviceComida.mostrarPorIngrediente(this.ingredienteBuscar)
      .then((comidas: any[]) => {
        this.listaNombre = comidas.map(datoApi => {
          const comida = new Comida();

          comida.idMeal = datoApi.idMeal;
          comida.nombre = datoApi.strMeal;
          comida.imagen = datoApi.strMealThumb;
          comida.precio = this.obtenerPrecio(comida.idMeal);

          return {
            ...comida,
            cantidadSeleccionada: 1
          };
        });
      })
      .catch(error => console.error('Error al buscar por ingrediente:', error));
  }

  cargarIngredientes(comida: Comida, evento: Event) {
    const detalles = evento.target as HTMLDetailsElement;

    if (!detalles.open || comida.detalleCargado) {
      return;
    }

    this.serviceComida.mostrarDetalle(comida.idMeal)
      .then((datoApi: any) => {
        comida.ingredientes = [];

        for (let i = 1; i <= 20; i++) {
          const ingrediente = datoApi[`strIngredient${i}`]?.trim();

          if (ingrediente) {
            comida.ingredientes.push(ingrediente);
          }

          comida.cantidadIngredientes = comida.ingredientes.length;
        }

        comida.detalleCargado = true;
      })
      .catch(error => console.error('Error al cargar ingredientes:', error));
  }

  elegirComida(
    comida: Comida & { cantidadSeleccionada: number }
  ): void {
    const cantidadElegida = Number(comida.cantidadSeleccionada);

    if (!Number.isFinite(cantidadElegida) || cantidadElegida < 1) {
      return;
    }

    const precio = Number(comida.precio)

    this.pedidoService.agregarComida(comida, cantidadElegida, precio);
    this.productoAgregadoId = comida.idMeal;

    setTimeout(() => {
      if (this.productoAgregadoId === comida.idMeal) {
        this.productoAgregadoId = null;
      }
    }, 1800);
  }

}
