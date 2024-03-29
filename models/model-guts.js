module.exports = ({
  knex = {},
  name = 'name',
  tableName = 'table-name',
  selectableProps = [],
  timeout = 1000,
}) => {
  const create = (props) => {
    delete props.id;

    return knex
      .insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout);
  };

  const findAll = () =>
    knex.select(selectableProps).from(tableName).timeout(timeout);

  const find = (filters, selects = selectableProps) =>
    knex.select(selects).from(tableName).where(filters).timeout(timeout);

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = (filters, selects = selectableProps) =>
    find(filters, selects).then((results) => {
      if (!Array.isArray(results)) return results;
      return results[0];
    });

  const findById = (id) =>
    knex.select(selectableProps).from(tableName).where({ id }).timeout(timeout);

  const update = (id, props) => {
    delete props.id;

    return knex
      .update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout);
  };

  const destroy = (id) =>
    knex.del().from(tableName).where({ id }).timeout(timeout);

  async function batchUpdate (table, id, collection) {
    return knex.transaction((trx) => {
      const queries = collection.map(async (tuple) => {
        const [tupleId] = await knex(table)
          .where(`${id}`, tuple[id])
          .update(tuple)
          .transacting(trx)
          .returning(id);

        return tupleId;
      });

      return Promise.all(queries).then(trx.commit).catch(trx.rollback);
    });
  }

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
    batchUpdate,
  };
};
