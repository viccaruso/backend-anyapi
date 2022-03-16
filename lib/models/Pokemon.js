const pool = require('../utils/pool');

module.exports = class Pokemon {
  id;
  name;
  primaryType;
  secondaryType;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.primaryType = row.primary_type;
    this.secondaryType = row.secondary_type;
  }

  static async insert({ name, primaryType, secondaryType }) {
    const { rows } = await pool.query(
      `
      INSERT INTO pokemans (name, primary_type, secondary_type)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [name, primaryType, secondaryType]
    );
    if (!rows[0]) return null;
    return new Pokemon(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM pokemans
      `
    );
    if (!rows[0]) return null;
    return rows.map((row) => new Pokemon(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM pokemans
      WHERE id=$1;
      `, [id]
    );
    if (!rows[0]) return null;
    return new Pokemon(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM pokemans
      WHERE id=$1
      RETURNING *
      `, [id]
    );
    if (!rows[0]) return null;
    return new Pokemon(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const pokemon = await Pokemon.getById(id);
    const updatedPokemon = { ...pokemon, ...newAttributes };
    const { name, primaryType, secondaryType } = updatedPokemon;
    const { rows } = await pool.query(
      `
      UPDATE pokemans
      SET name=$2, primary_type=$3, secondary_type=$4
      WHERE id=$1
      RETURNING *
      `, [id, name, primaryType, secondaryType]
    );
    if (!rows[0]) return null;
    return new Pokemon(rows[0]);
  }

};
