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

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM pokemans;
      `
    );
    return rows.map((row) => new Pokemon(row));
  }
};
