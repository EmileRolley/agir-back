import { SuiviType } from '../../../src/domain/suivi/suiviType';
import { DB, TestUtil } from '../../TestUtil';

describe('/utilisateurs/id/suivi_dashboard (API test)', () => {
  beforeAll(async () => {
    await TestUtil.appinit();
    await TestUtil.generateAuthorizationToken('utilisateur-id');
  });

  beforeEach(async () => {
    await TestUtil.deleteAll();
  });

  afterAll(async () => {
    await TestUtil.appclose();
  });

  it('GET /utilisateurs/id/suivi_dashboard - get empty dashboard when nothing in DB', async () => {
    // GIVEN
    await TestUtil.create(DB.utilisateur);
    // WHEN
    const response = await TestUtil.GET(
      '/utilisateurs/utilisateur-id/suivi_dashboard',
    );
    // THEN
    expect(response.status).toBe(200);
  });
  it('GET /utilisateurs/id/suivi_dashboard - 403 when other one dashboard', async () => {
    // GIVEN
    await TestUtil.create(DB.utilisateur);
    // WHEN
    const response = await TestUtil.GET('/utilisateurs/123/suivi_dashboard');
    // THEN
    expect(response.status).toBe(403);
  });
  it('GET /utilisateurs/id/suivi_dashboard - get dashboard with proper last suivi date', async () => {
    // GIVEN
    await TestUtil.create(DB.utilisateur);
    await TestUtil.create(DB.suivi, {
      id: '1',
      data: {
        total_impact: 10,
      },
      created_at: TestUtil.getDate('2023-01-01'),
    });
    await TestUtil.create(DB.suivi, {
      id: '2',
      data: {
        total_impact: 20,
      },
      created_at: TestUtil.getDate('2023-01-01'),
    });
    await TestUtil.create(DB.suivi, {
      id: '3',
      created_at: TestUtil.getDate('2023-01-15'),
      data: {
        total_impact: 50,
      },
    });
    // WHEN
    const response = await TestUtil.GET(
      '/utilisateurs/utilisateur-id/suivi_dashboard',
    );
    // THEN
    expect(response.status).toBe(200);
    expect(Date.parse(response.body.date_dernier_suivi)).toEqual(
      Date.parse('2023-01-15'),
    );
    expect(response.body.impact_dernier_suivi).toEqual(50);
  });
  it('GET /utilisateurs/id/suivi_dashboard - get dashboard with proper merged last suivi date', async () => {
    // GIVEN
    await TestUtil.create(DB.utilisateur);
    await TestUtil.create(DB.suivi, {
      id: '1',
      created_at: TestUtil.getDate('2023-01-15'),
      type: SuiviType.alimentation,
      data: {
        total_impact: 10,
        viande_rouge: 12,
      },
    });
    await TestUtil.create(DB.suivi, {
      id: '2',
      created_at: TestUtil.getDate('2023-01-30'),
      type: SuiviType.transport,
      data: {
        total_impact: 20,
        km_voiture: 10,
      },
    });
    await TestUtil.create(DB.suivi, {
      id: '3',
      created_at: TestUtil.getDate('2023-01-30'),
      type: SuiviType.alimentation,
      data: {
        total_impact: 50,
        viande_blanche: 36,
      },
    });
    // WHEN
    const response = await TestUtil.GET(
      '/utilisateurs/utilisateur-id/suivi_dashboard',
    );
    // THEN
    expect(response.status).toBe(200);
    expect(Date.parse(response.body.date_dernier_suivi)).toEqual(
      Date.parse('2023-01-30'),
    );
    expect(response.body.impact_dernier_suivi).toEqual(70);
    expect(response.body.variation).toEqual(60);
    expect(response.body.dernier_suivi.km_voiture).toEqual(10);
    expect(response.body.dernier_suivi.viande_blanche).toEqual(36);
    expect(response.body.moyenne).toEqual(40);
    expect(response.body.derniers_totaux[0].valeur).toEqual(10);
    expect(Date.parse(response.body.derniers_totaux[0].date)).toEqual(
      Date.parse('2023-01-15'),
    );
    expect(response.body.derniers_totaux[1].valeur).toEqual(70);
    expect(Date.parse(response.body.derniers_totaux[1].date)).toEqual(
      Date.parse('2023-01-30'),
    );
  });
});
