import {Entity, model, property, hasMany} from '@loopback/repository';
import {DetalleVenta} from './detalle-venta.model';

@model()
export class Venta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
  })
  clienteId?: number;

  @hasMany(() => DetalleVenta)
  detalleVentas: DetalleVenta[];

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
