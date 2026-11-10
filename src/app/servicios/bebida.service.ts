import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {

  private urlBebidaNombre = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  mostrarPorNombre(nombre: string) {
    const url = this.urlBebidaNombre + encodeURIComponent(nombre);
    return fetch(url)

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


  private urlBebidaIngrediente =
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

  mostrarPorIngrediente(ingrediente: string) {
    const url = this.urlBebidaIngrediente + encodeURIComponent(ingrediente.trim());

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const bebidasEncontradas = data.drinks ?? [];
        return bebidasEncontradas;
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        throw error;
      });
  }

  private urlBebidaAlcohol =
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=';


  mostrarPorAlcohol(alcohol: string) {
    return fetch(
      this.urlBebidaAlcohol + encodeURIComponent(alcohol)
    )
      .then(response => response.json())
      .then(data => data.drinks ?? [])
      .catch(error => {
        console.error('Error al filtrar bebidas por alcohol:', error);
        throw error;
      });
  }

  private urlDetalleB =
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  mostrarDetalle(idDrink: string) {
    return fetch(this.urlDetalleB + encodeURIComponent(idDrink))
      .then(response => response.json())
      .then(data => data.drinks?.[0] ?? null)
      .catch(error => {
        console.error('Error al mostrar los detalles:', error);
        throw error;
      });
  }

  private urlBebidaCategoria =
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  mostrarCategorias() {
    return fetch(this.urlBebidaCategoria)
      .then(response => response.json())
      .then(data => {
        const categorias = data.drinks ?? [];

        return Promise.all(
          categorias.map((categoria: any) =>
            this.categorias(categoria.strCategory)
              .then((bebidas: any[]) => ({
                ...categoria,
                imagen: bebidas[0]?.strDrinkThumb ?? ''
              }))
          )
        );
      });
  }

  private urlMostrarPorCategoria =
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  categorias(nombreCategoria: string) {
    const url = this.urlMostrarPorCategoria + encodeURIComponent(nombreCategoria);

    return fetch(url)
      .then(response => response.json())
      .then(data => data.drinks ?? []);
  }
}
