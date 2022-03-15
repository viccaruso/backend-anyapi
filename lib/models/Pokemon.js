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
};
