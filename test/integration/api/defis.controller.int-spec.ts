import { UtilisateurRepository } from '../../../src/infrastructure/repository/utilisateur/utilisateur.repository';
import { DB, TestUtil } from '../../TestUtil';
import { CatalogueDefis } from '../../../src/domain/defis/catalogueDefis';
import { Thematique } from '../../../src/domain/contenu/thematique';
import { Tag } from '../../../src/domain/scoring/tag';
import { ThematiqueRepository } from '../../../src/infrastructure/repository/thematique.repository';
import { DefiStatus } from '../../../src/domain/defis/defi';
import { DefiAPI } from '../../../src/infrastructure/api/types/defis/DefiAPI';
import { DefiHistory_v0 } from '../../../src/domain/object_store/defi/defiHistory_v0';

describe('/utilisateurs/id/defis (API test)', () => {
  const utilisateurRepository = new UtilisateurRepository(TestUtil.prisma);
  let thematiqueRepository = new ThematiqueRepository(TestUtil.prisma);
  const DAY_IN_MS = 1000 * 60 * 60 * 24;

  beforeAll(async () => {
    await TestUtil.appinit();
    await TestUtil.generateAuthorizationToken('utilisateur-id');
  });

  beforeEach(async () => {
    await TestUtil.deleteAll();
  });

  afterAll(async () => {
    await TestUtil.appclose();
    CatalogueDefis.resetCatalogue();
  });

  it('GET /defis - liste defis catalogue', async () => {
    // GIVEN
    await TestUtil.create(DB.utilisateur);

    // WHEN
    const response = await TestUtil.GET('/defis');

    // THEN
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(CatalogueDefis.getTailleCatalogue());
  });
  it('GET /utilisateurs/id/defis/id - correct data defis du catalogue', async () => {
    // GIVEN
    await TestUtil.create(DB.utilisateur);
    ThematiqueRepository.resetThematiques();
    await TestUtil.create(DB.thematique, {
      id: '1',
      id_cms: 1,
      titre: 't1',
    });
    await thematiqueRepository.loadThematiques();

    CatalogueDefis.setCatalogue([
      {
        id: '1',
        points: 5,
        tags: [Tag.interet_transports],
        titre: 'titre',
        thematique: Thematique.alimentation,
        astuces: 'astuce',
        date_acceptation: new Date(Date.now() - 3 * DAY_IN_MS),
        pourquoi: 'pourquoi',
        sous_titre: 'sous_titre',
        status: DefiStatus.todo,
      },
    ]);

    // WHEN
    const response = await TestUtil.GET('/utilisateurs/utilisateur-id/defis/1');

    // THEN
    expect(response.status).toBe(200);

    const defi: DefiAPI = response.body;

    expect(defi.id).toBe('1');
    expect(defi.points).toBe(5);
    expect(defi.thematique).toBe(Thematique.alimentation);
    expect(defi.astuces).toBe('astuce');
    expect(defi.pourquoi).toBe('pourquoi');
    expect(defi.jours_restants).toBe(4);
    expect(defi.titre).toBe('titre');
    expect(defi.sous_titre).toBe('sous_titre');
    expect(defi.thematique_label).toBe('t1');
    expect(defi.status).toBe(DefiStatus.todo);
  });
  it('GET /utilisateurs/id/defis/id - correct data defis utlisateur', async () => {
    // GIVEN
    const defis: DefiHistory_v0 = {
      version: 0,
      defis: [
        {
          id: '001',
          points: 10,
          tags: [Tag.R10],
          titre: 'titre',
          thematique: Thematique.alimentation,
          astuces: 'ASTUCE',
          date_acceptation: new Date(Date.now() - 2 * DAY_IN_MS),
          pourquoi: 'POURQUOI',
          sous_titre: 'SOUS TITRE',
          status: DefiStatus.en_cours,
        },
      ],
    };
    await TestUtil.create(DB.utilisateur, { defis: defis });
    ThematiqueRepository.resetThematiques();
    await TestUtil.create(DB.thematique, {
      id: '1',
      id_cms: 1,
      titre: 't1',
    });
    await thematiqueRepository.loadThematiques();

    // WHEN
    const response = await TestUtil.GET(
      '/utilisateurs/utilisateur-id/defis/001',
    );

    // THEN
    expect(response.status).toBe(200);

    const defi: DefiAPI = response.body;

    expect(defi.id).toBe('001');
    expect(defi.points).toBe(10);
    expect(defi.thematique).toBe(Thematique.alimentation);
    expect(defi.astuces).toBe('ASTUCE');
    expect(defi.pourquoi).toBe('POURQUOI');
    expect(defi.jours_restants).toBe(5);
    expect(defi.titre).toBe('titre');
    expect(defi.sous_titre).toBe('SOUS TITRE');
    expect(defi.thematique_label).toBe('t1');
    expect(defi.status).toBe(DefiStatus.en_cours);
  });
  it('PATCH /utilisateurs/id/defis/id - patch le status d un defi en cours', async () => {
    // GIVEN
    const defis: DefiHistory_v0 = {
      version: 0,
      defis: [
        {
          id: '001',
          points: 10,
          tags: [Tag.R10],
          titre: 'titre',
          thematique: Thematique.alimentation,
          astuces: 'ASTUCE',
          date_acceptation: new Date(Date.now() - 2 * DAY_IN_MS),
          pourquoi: 'POURQUOI',
          sous_titre: 'SOUS TITRE',
          status: DefiStatus.en_cours,
        },
      ],
    };
    await TestUtil.create(DB.utilisateur, { defis: defis });

    // WHEN
    const response = await TestUtil.PATCH(
      '/utilisateurs/utilisateur-id/defis/001',
    ).send({
      status: DefiStatus.fait,
    });

    // THEN
    expect(response.status).toBe(200);

    const userDB = await utilisateurRepository.getById('utilisateur-id');

    expect(userDB.defi_history.getDefiOrException('001').status).toBe(
      DefiStatus.fait,
    );
  });
  it('PATCH /utilisateurs/id/defis/id - patch le status d un defi du catalogue', async () => {
    // GIVEN
    await TestUtil.create(DB.utilisateur);

    CatalogueDefis.setCatalogue([
      {
        id: '1',
        points: 5,
        tags: [Tag.interet_transports],
        titre: 'titre',
        thematique: Thematique.alimentation,
        astuces: 'astuce',
        date_acceptation: new Date(Date.now() - 3 * DAY_IN_MS),
        pourquoi: 'pourquoi',
        sous_titre: 'sous_titre',
        status: DefiStatus.todo,
      },
    ]);

    // WHEN
    const response = await TestUtil.PATCH(
      '/utilisateurs/utilisateur-id/defis/1',
    ).send({
      status: DefiStatus.fait,
    });

    // THEN
    expect(response.status).toBe(200);

    const userDB = await utilisateurRepository.getById('utilisateur-id');

    expect(userDB.defi_history.getDefiOrException('1').status).toBe(
      DefiStatus.fait,
    );
    expect(userDB.defi_history.defis).toHaveLength(2);
  });
});
