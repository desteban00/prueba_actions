import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Venta, VentaRelations, DetalleVenta} from '../models';
import {DetalleVentaRepository} from './detalle-venta.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly detalleVentas: HasManyRepositoryFactory<DetalleVenta, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.PostgresqlDS') dataSource: PostgresqlDsDataSource, @repository.getter('DetalleVentaRepository') protected detalleVentaRepositoryGetter: Getter<DetalleVentaRepository>,
  ) {
    super(Venta, dataSource);
    this.detalleVentas = this.createHasManyRepositoryFactoryFor('detalleVentas', detalleVentaRepositoryGetter,);
    this.registerInclusionResolver('detalleVentas', this.detalleVentas.inclusionResolver);
  }
}
