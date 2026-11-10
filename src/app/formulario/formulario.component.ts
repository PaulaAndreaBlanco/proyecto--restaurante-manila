import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../entidades/cliente';
import { PedidoService } from '../servicios/pedido.service';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  private pedidoService = inject(PedidoService);

  cliente: Cliente = new Cliente();

  async realizarPedido(): Promise<void> {

    if (
      !this.cliente.nombreCompleto.trim() ||
      !this.cliente.celular.trim() ||
      !this.cliente.direccion.trim()
    ) {
      alert('Completa todos los datos de entrega para generar el pedido.');
      return;
    }

    const lista = this.pedidoService.listaPedido();

    if (lista.length === 0) {
      alert('Agrega al menos un producto antes de generar el pedido.');
      return;
    }

    this.pedidoService.guardarCliente(this.cliente);
    const pedido = this.pedidoService.obtenerPedidoCompleto();
    const pdf = new jsPDF();

    const verde: [number, number, number] = [23, 76, 60];
    const verdeClaro: [number, number, number] = [230, 241, 236];

    const logoCircular = await this.cargarLogoCircular();

    const moneda = (valor: number) =>
      `$ ${new Intl.NumberFormat('es-CO', {
        maximumFractionDigits: 0
      }).format(valor)}`;


    // Encabezado
    pdf.setFillColor(...verde);
    pdf.rect(0, 0, 210, 32, 'F');

    pdf.addImage(logoCircular, 'PNG', 18, 5, 26, 26);

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('RESTAURANTE MANILA', 105, 14, { align: 'center' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text('Factura de pedido', 105, 24, { align: 'center' });

    // Datos del cliente
    pdf.setFillColor(...verdeClaro);
    pdf.roundedRect(15, 40, 180, 35, 3, 3, 'F');

    pdf.setTextColor(...verde);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Datos del cliente', 22, 49);

    pdf.setTextColor(40, 40, 40);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Nombre: ${pedido.cliente.nombreCompleto}`, 22, 57);
    pdf.text(`Celular: ${pedido.cliente.celular}`, 22, 64);
    pdf.text(`Dirección: ${pedido.cliente.direccion}`, 110, 57);
    pdf.text(
      `Fecha: ${pedido.fechaActual.toLocaleDateString('es-CO')}`,
      110,
      64
    );
    pdf.text(`Hora: ${pedido.horaActual.toLocaleTimeString('es-CO')} `, 110, 71);

    // Una fila por producto
    const filas: (string | number)[][] = [];

    for (const item of pedido.listaPedido) {
      if (item.comida) {
        filas.push([
          item.comida.nombre,
          item.cantidadComida,
          moneda(item.totalComida)
        ]);
      }

      if (item.bebida) {
        filas.push([
          item.bebida.nombre,
          item.cantidadBebida,
          moneda(item.totalBebida)
        ]);
      }
    }

    autoTable(pdf, {
      startY: 84,
      head: [['Nombre del producto', 'Cantidad', 'Total']],
      body: filas,
      theme: 'grid',
      headStyles: {
        fillColor: verde,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [242, 249, 247]
      },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 4
      },
      columnStyles: {
        1: { halign: 'center', cellWidth: 30 },
        2: { halign: 'right', cellWidth: 45 }
      }
    });

    // Suma las unidades de todas las comidas y bebidas
    const totalUnidades = pedido.listaPedido.reduce(
      (suma, item) =>
        suma + item.cantidadComida + item.cantidadBebida,
      0
    );

    // Ubica el bloque final después de la tabla
    const tablaPdf = pdf as jsPDF & { lastAutoTable?: { finalY: number } };
    let posicionY = (tablaPdf.lastAutoTable?.finalY ?? 84) + 12;

    if (posicionY > 260) {
      pdf.addPage();
      posicionY = 25;
    }

    pdf.setTextColor(...verde);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(`Total de unidades: ${totalUnidades}`, 20, posicionY);

    pdf.setFillColor(...verde);
    pdf.roundedRect(15, posicionY + 8, 180, 20, 3, 3, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text('TOTAL A PAGAR', 22, posicionY + 21);
    pdf.text(
      moneda(pedido.totalPagar),
      188,
      posicionY + 21,
      { align: 'right' }
    );

    pdf.save('factura-restaurante-manila.pdf');
  }


  private async cargarLogoCircular(): Promise<string> {
    const imagen = new Image();
    imagen.src = 'assets/manila.png';
    await imagen.decode();

    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 900;

    const contexto = canvas.getContext('2d');
    if (!contexto) {
      throw new Error('No se pudo preparar el logo');
    }

    // Recorta el sello circular del centro de la imagen adjunta.
    const lado = 900;
    const x = (imagen.naturalWidth - lado) / 2;
    const y = (imagen.naturalHeight - lado) / 2;

    contexto.beginPath();
    contexto.arc(450, 450, 450, 0, Math.PI * 2);
    contexto.clip();
    contexto.drawImage(imagen, x, y, lado, lado, 0, 0, lado, lado);

    return canvas.toDataURL('image/png');
  }
}

