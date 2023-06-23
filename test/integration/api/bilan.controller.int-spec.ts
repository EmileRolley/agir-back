import * as request from 'supertest';
import { TestUtil } from '../../TestUtil';

describe('/bilan (API test)', () => {
  beforeAll(async () => {
    await TestUtil.appinit();
  });

  beforeEach(async () => {
    await TestUtil.deleteAll();
  });

  afterAll(async () => {
    await TestUtil.appclose();
  });

  it('GET /bilan/name - get a dashboard by name with proper compteurs, badges, quizz', async () => {
    await TestUtil.prisma.utilisateur.create({
      data: { id: '1', name: 'bob' },
    });

    await TestUtil.prisma.empreinte.create({
      data: {
        id: 'empreinteID',
        utilisateurId: '1',
        situation: `{ "transport . voiture . propriétaire": "'false'","transport . voiture . gabarit": "'SUV'","transport . voiture . motorisation": "'thermique'",   "alimentation . boisson . chaude . café . nombre": 4,   "transport . voiture . thermique . carburant": "'essence E85'" }`,
      },
    });

    const response = await request(TestUtil.app.getHttpServer()).get(
      '/bilan/bob',
    );

    expect(response.status).toBe(200);
    // cette valeur est amenée à évoluer avec le modéle publicode co2
    expect(parseInt(response.text)).toBe(7700);
  });
});
