import { Component, inject } from '@angular/core';
import { BebidaService } from '../servicios/bebida.service';
import { Bebida } from '../entidades/bebida';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../servicios/pedido.service';

@Component({
  selector: 'app-bebidas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bebidas.component.html',
  styleUrl: './bebidas.component.css'
})

export class BebidasComponent {

  private pedidoService = inject(PedidoService);

  listaCompleta: Bebida[] = [];
  listaNombre: (Bebida & { cantidadSeleccionada: number })[] = [];
  nombreBuscar: string = "";
  ingredienteBuscar: string = "";
  alcohol_no: string = "";
  categoria = '';

  categorias: any[] = [];
  gruposCategorias: any[][] = [];


  productoAgregadoId: string | null = null;

  constructor(private serviceBebida: BebidaService) {

  }
  ngOnInit() {
    this.serviceBebida.mostrarPorNombre('Margarita')

      .then(data => {

        const resultados = data.drinks ?? [];

        this.listaCompleta = resultados.map((datoApi: any) => {
          const bebida = new Bebida();

          bebida.idDrink = datoApi.idDrink;
          bebida.nombre = datoApi.strDrink;
          bebida.imagen = datoApi.strDrinkThumb;
          bebida.categoria = datoApi.strCategory;
          bebida.ingredientes = [];

          for (let i = 1; i <= 20; i++) {
            const ingrediente = datoApi[`strIngredient${i}`]?.trim();

            if (ingrediente) {
              bebida.ingredientes.push(ingrediente);
            }
          }

          bebida.precio = Math.round(Math.random() * 20000) + 30000;
          bebida.detalleCargado = true;
          return bebida;
        });
        this.listaNombre = this.listaCompleta.map(bebida => ({
          ...bebida, cantidadSeleccionada: 1
        }))

      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
      })

    this.serviceBebida.mostrarCategorias()
      .then((categorias: any[]) => {
        this.categorias = categorias;
        this.gruposCategorias = [];

        for (let i = 0; i < this.categorias.length; i += 7) {
          this.gruposCategorias.push(this.categorias.slice(i, i + 7));
        }
      })
      .catch(error => console.error('Error al cargar categorías:', error));
  }


  private preciosPorBebida = new Map<string, number>();
  private obtenerPrecio(idDrink: string): number {
    if (!this.preciosPorBebida.has(idDrink)) {
      this.preciosPorBebida.set(
        idDrink,
        Math.round(Math.random() * 20000) + 30000
      );
    }

    return this.preciosPorBebida.get(idDrink)!;
  }



  filtrarPorCategoria(nombreCategoria: string) {
    this.listaNombre = [];

    this.serviceBebida.categorias(nombreCategoria)
      .then((bebidas: any[]) => {
        this.listaNombre = bebidas.map(datoApi => {
          const bebida = new Bebida();
          bebida.idDrink = datoApi.idDrink;
          bebida.nombre = datoApi.strDrink;
          bebida.imagen = datoApi.strDrinkThumb;
          bebida.precio = this.obtenerPrecio(bebida.idDrink);
          return {
            ...bebida,
            cantidadSeleccionada: 1
          };
        });
      })
      .catch(error => console.error('Error al filtrar por categoría:', error));
  }


  bebidaNombre() {
    this.ingredienteBuscar = "";
    this.alcohol_no = "";
    this.categoria = "";
    this.serviceBebida.mostrarPorNombre(this.nombreBuscar)

      .then(data => {

        this.listaNombre = (data.drinks ?? []).map((datoApi: any) => {
          const bebida = new Bebida();

          bebida.idDrink = datoApi.idDrink;
          bebida.nombre = datoApi.strDrink;
          bebida.imagen = datoApi.strDrinkThumb;
          bebida.precio = this.obtenerPrecio(bebida.idDrink)
          bebida.ingredientes = [];
          bebida.detalleCargado = true;

          for (let i = 1; i <= 20; i++) {
            const ingrediente = datoApi[`strIngredient${i}`]?.trim();

            if (ingrediente) {
              bebida.ingredientes.push(ingrediente);
            }
          }

          return {
            ...bebida,
            cantidadSeleccionada: 1
          };
        });


      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
      })
  }


  bebidaIngrediente() {
    this.nombreBuscar = "";
    this.alcohol_no = "";
    this.categoria = "";
    this.serviceBebida.mostrarPorIngrediente(this.ingredienteBuscar)
      .then((bebidas: any[]) => {
        this.listaNombre = bebidas.map(datoApi => {
          const bebida = new Bebida();

          bebida.idDrink = datoApi.idDrink;
          bebida.nombre = datoApi.strDrink;
          bebida.imagen = datoApi.strDrinkThumb;
          bebida.ingredientes = [];
          bebida.precio = this.obtenerPrecio(bebida.idDrink);


          return {
            ...bebida,
            cantidadSeleccionada: 1
          };
        });
      })
      .catch(error => console.error('Error al buscar por ingrediente:', error));
  }

  bebidaAlcohol() {
    this.nombreBuscar = "";
    this.ingredienteBuscar = "";
    this.categoria = "";
    this.listaNombre = [];

    this.serviceBebida.mostrarPorAlcohol(this.alcohol_no)
      .then((bebidas: any[]) => {
        this.listaNombre = bebidas.map(datoApi => {
          const bebida = new Bebida();

          bebida.idDrink = datoApi.idDrink;
          bebida.nombre = datoApi.strDrink;
          bebida.imagen = datoApi.strDrinkThumb;
          bebida.precio = Math.round(Math.random() * 20000) + 30000;

          return {
            ...bebida,
            cantidadSeleccionada: 1
          };
        });
      })
      .catch(error => console.error('Error al buscar bebidas:', error));
  }


  bebidaCategoria() {
    this.nombreBuscar = "";
    this.ingredienteBuscar = "";
    this.alcohol_no = "";
    this.listaNombre = [];

    this.serviceBebida.categorias(this.categoria)
      .then((bebidas: any[]) => {
        this.listaNombre = bebidas.map(datoApi => {
          const bebida = new Bebida();

          bebida.idDrink = datoApi.idDrink;
          bebida.nombre = datoApi.strDrink;
          bebida.imagen = datoApi.strDrinkThumb;
          bebida.precio = Math.round(Math.random() * 20000) + 30000;

          return {
            ...bebida,
            cantidadSeleccionada: 1
          };
        });
      })
      .catch(error => console.error('Error al buscar por categoría:', error));
  }

  cargarIngredientes(bebida: Bebida, evento: Event) {
    const detalles = evento.target as HTMLDetailsElement;

    if (!detalles.open || bebida.detalleCargado) {
      return;
    }

    this.serviceBebida.mostrarDetalle(bebida.idDrink)
      .then((datoApi: any) => {
        bebida.ingredientes = [];

        for (let i = 1; i <= 20; i++) {
          const ingrediente = datoApi[`strIngredient${i}`]?.trim();

          if (ingrediente) {
            bebida.ingredientes.push(ingrediente);
          }
        }

        bebida.detalleCargado = true;
      })
      .catch(error => console.error('Error al cargar ingredientes:', error));
  }

  elegirBebida(
    bebida: Bebida & { cantidadSeleccionada: number }
  ): void {
    const cantidadElegida = Number(bebida.cantidadSeleccionada);

    if (!Number.isFinite(cantidadElegida) || cantidadElegida < 1) {
      return;
    }

    const precio = Number(bebida.precio)

    this.pedidoService.agregarBebida(bebida, cantidadElegida, precio);
    this.productoAgregadoId = bebida.idDrink;

    setTimeout(() => {
      if (this.productoAgregadoId === bebida.idDrink) {
        this.productoAgregadoId = null;
      }
    }, 1800);
  }
}