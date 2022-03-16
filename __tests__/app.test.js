const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pokemon = require('../lib/models/Pokemon');

describe('backend-anyapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Creates a pokemon', async () => {
    const expected = {
      name: 'Raichu',
      primaryType: 'Electric',
      secondaryType: null
    };
    const res = await request(app).post('/api/v1/pokemans').send(expected);
    console.log(res.body);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('Gets a list of all pokemans', async () => {
    const expected = await Pokemon.getAll();
    const res = await request(app).get('/api/v1/pokemans');
    expect(res.body).toEqual(expected);
  });

  it('Gets a pokemon by id', async () => {
    const expected = await Pokemon.getById(1);
    const res = await request(app).get(`/api/v1/pokemans/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('Deletes a pokemon with a given id', async () => {
    const newPokemon = await Pokemon.insert({ name: 'Zapdos', primaryType: 'Electric', secondaryType: null });
    const expected = await Pokemon.getById(newPokemon.id);
    const res = await request(app).delete(`/api/v1/pokemans/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('Updates the primary_type of a pokemon with a given id', async () => {
    const expected = { id: expect.any(String), name: 'Zapdos', primaryType: 'Fire', secondaryType: null };
    const newPokemon = await Pokemon.insert({ name: 'Zapdos', primaryType: 'Electric', secondaryType: null });
    const res = await request(app).patch(`/api/v1/pokemans/${newPokemon.id}`).send({ primaryType: 'Fire' });
    expect(res.body).toEqual(expected);
  });

});
