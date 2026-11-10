import { Injectable } from '@angular/core';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  constructor() { }

  private urlComidaNombre = "https://www.themealdb.com/api/json/v1/1/search.php?s="

  mostrarPorNombre(nombre: string) {
    return fetch(this.urlComidaNombre + nombre)

      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data
      })

      .catch(error => {
        console.error("Error al obtener los datos:", error)
        throw error;
      })

  }

  private urlComidaIngrediente =
    'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

  mostrarPorIngrediente(ingrediente: string) {
    const url =
      this.urlComidaIngrediente + encodeURIComponent(ingrediente);

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const comidasEncontradas = data.meals ?? [];
        return comidasEncontradas;
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        throw error;
      });
  }

  private urlDetalle =
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  mostrarDetalle(idMeal: string) {
    return fetch(this.urlDetalle + encodeURIComponent(idMeal))
      .then(response => response.json())
      .then(data => data.meals?.[0] ?? null)
      .catch(error => {
        console.error('Error al mostrar los detalles:', error);
        throw error;
      });
  }


  private urlCategorias =
    'https://www.themealdb.com/api/json/v1/1/categories.php';

  mostrarCategorias() {
    return fetch(this.urlCategorias)
      .then(response => response.json())
      .then(data => data.categories ?? []);
  }

  private urlMostrarPorCategoria =
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  categorias(nombreCategoria: string) {
    const url = this.urlMostrarPorCategoria + encodeURIComponent(nombreCategoria)
    return fetch(url)
      .then(response => response.json())
      .then(data => data.meals ?? []);
  }

  cantidadIngredientes(comida: any): number {

    let cantidad = 0;

    for (let i = 1; i <= 20; i++) {

      const ingrediente = comida['strIngredient' + i];

      if (ingrediente && ingrediente.trim() !== '') {
        cantidad++;
      }

    }

    return cantidad;
  }
}
