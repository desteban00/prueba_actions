import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {DetalleVenta, DetalleVentaRelations} from '../models';

export class DetalleVentaRepository extends DefaultCrudRepository<
  DetalleVenta,
  typeof DetalleVenta.prototype.id,
  DetalleVentaRelations
> {
  constructor(
    @inject('datasources.PostgresqlDS') dataSource: PostgresqlDsDataSource,
  ) {
    super(DetalleVenta, dataSource);
  }
}
