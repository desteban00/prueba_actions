import {Entity, model, property} from '@loopback/repository';

@model()
export class DetalleVenta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
  })
  ventaId?: number;

  @property({
    type: 'number',
  })
  productoId?: number;

  constructor(data?: Partial<DetalleVenta>) {
    super(data);
  }
}

export interface DetalleVentaRelations {
  // describe navigational properties here
}

export type DetalleVentaWithRelations = DetalleVenta & DetalleVentaRelations;
