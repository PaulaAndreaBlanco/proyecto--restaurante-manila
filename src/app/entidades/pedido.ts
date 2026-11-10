import { Cliente } from "./cliente";
import { ListaPedido } from "./lista-pedido";

export class Pedido {
    cliente: Cliente = new Cliente();
    fechaActual: Date = new Date;
    horaActual: Date = new Date();
    /*[] puede almacenar varios objetos */
    listaPedido: ListaPedido[] = [];
    totalPagar: number = 0;

}
