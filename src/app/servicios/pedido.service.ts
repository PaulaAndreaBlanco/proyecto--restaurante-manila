import { Injectable, signal } from '@angular/core';
import { ListaPedido } from '../entidades/lista-pedido';
import { Comida } from '../entidades/comida';
import { Bebida } from '../entidades/bebida';
import { Cliente } from '../entidades/cliente';
import { Pedido } from '../entidades/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public listaPedido = signal<ListaPedido[]>([]);


  agregarComida(comida: Comida, cantidad: number, precio: number): void {
    const listaActual = this.listaPedido();

    const existente = listaActual.some(
      item => item.comida?.idMeal === comida.idMeal
    );

    const nuevoItem = new ListaPedido();
    nuevoItem.comida = comida;
    nuevoItem.cantidadComida = cantidad;
    nuevoItem.totalComida = precio * cantidad;

    const listaActualizada = existente
      ? listaActual.map(item =>
        item.comida?.idMeal === comida.idMeal
          ? {
            ...item,
            cantidadComida: item.cantidadComida + cantidad,
            totalComida: item.totalComida + precio * cantidad
          }
          : item
      )
      : [...listaActual, nuevoItem];

    this.guardarPedido(listaActualizada);
  }

  private guardarPedido(lista: ListaPedido[]): void {
    this.listaPedido.set(lista);
  }

  quitarItem(indice: number): void {
    const listaActualizada = this.listaPedido()
      .filter((_, i) => i !== indice);

    this.guardarPedido(listaActualizada);
  }

  agregarBebida(bebida: Bebida, cantidad: number, precio: number): void {
    const listaActual = this.listaPedido();

    const existente = listaActual.some(
      item => item.bebida?.idDrink === bebida.idDrink
    );

    const nuevoItem = new ListaPedido();
    nuevoItem.bebida = bebida;
    nuevoItem.cantidadBebida = cantidad;
    nuevoItem.totalBebida = precio * cantidad;

    const listaActualizada = existente
      ? listaActual.map(item =>
        item.bebida?.idDrink === bebida.idDrink
          ? {
            ...item,
            cantidadBebida: item.cantidadBebida + cantidad,
            totalBebida: item.totalBebida + precio * cantidad
          }
          : item
      )
      : [...listaActual, nuevoItem];

    this.guardarPedido(listaActualizada);
  }

  totalPedido(): number {
    return this.listaPedido().reduce(
      (suma, item) => suma + item.totalComida + item.totalBebida,
      0
    );
  }


  clienteActual = signal<Cliente>(new Cliente());

  guardarCliente(cliente: Cliente): void {
    this.clienteActual.set({ ...cliente });
  }

  obtenerPedidoCompleto(): Pedido {
    const pedido = new Pedido();

    pedido.cliente = this.clienteActual();
    pedido.listaPedido = this.listaPedido();
    pedido.totalPagar = this.totalPedido();

    return pedido;
  }
}
