import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Producto,
  DetalleVenta,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetalleVentaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Array of Producto has many DetalleVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleVenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DetalleVenta>,
  ): Promise<DetalleVenta[]> {
    return this.productoRepository.detalleVentas(id).find(filter);
  }

  @post('/productos/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleVenta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVenta, {
            title: 'NewDetalleVentaInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) detalleVenta: Omit<DetalleVenta, 'id'>,
  ): Promise<DetalleVenta> {
    return this.productoRepository.detalleVentas(id).create(detalleVenta);
  }

  @patch('/productos/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Producto.DetalleVenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVenta, {partial: true}),
        },
      },
    })
    detalleVenta: Partial<DetalleVenta>,
    @param.query.object('where', getWhereSchemaFor(DetalleVenta)) where?: Where<DetalleVenta>,
  ): Promise<Count> {
    return this.productoRepository.detalleVentas(id).patch(detalleVenta, where);
  }

  @del('/productos/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Producto.DetalleVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DetalleVenta)) where?: Where<DetalleVenta>,
  ): Promise<Count> {
    return this.productoRepository.detalleVentas(id).delete(where);
  }
}
