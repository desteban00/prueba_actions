import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Producto, ProductoRelations, DetalleVenta} from '../models';
import {DetalleVentaRepository} from './detalle-venta.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detalleVentas: HasManyRepositoryFactory<DetalleVenta, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.PostgresqlDS') dataSource: PostgresqlDsDataSource, @repository.getter('DetalleVentaRepository') protected detalleVentaRepositoryGetter: Getter<DetalleVentaRepository>,
  ) {
    super(Producto, dataSource);
    this.detalleVentas = this.createHasManyRepositoryFactoryFor('detalleVentas', detalleVentaRepositoryGetter,);
    this.registerInclusionResolver('detalleVentas', this.detalleVentas.inclusionResolver);
  }
}
