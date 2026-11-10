import { Bebida } from "./bebida";
import { Comida } from "./comida";

export class ListaPedido {
    comida?: Comida;
    bebida?: Bebida;
    cantidadComida: number = 0;
    cantidadBebida: number = 0;
    totalComida: number = 0;
    totalBebida: number = 0;
}
