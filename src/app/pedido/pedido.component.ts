import { Component, inject } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';
import { PedidoService } from '../servicios/pedido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [FormularioComponent, CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {

  pedidoService = inject(PedidoService);

}
