import { Routes } from '@angular/router';
import { ComidasComponent } from './comidas/comidas.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { PedidoComponent } from './pedido/pedido.component';
import { JuegoComponent } from './juego/juego.component';
import { InicioComponent } from './inicio/inicio.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'comida', component: ComidasComponent },
    { path: 'bebida', component: BebidasComponent },
    { path: 'pedido', component: PedidoComponent },
    { path: 'juego', component: JuegoComponent },
    { path: '**', redirectTo: '' }
];

