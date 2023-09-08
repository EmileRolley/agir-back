import { TestUtil } from '../../TestUtil';
import { InteractionRepository } from '../../../src/infrastructure/repository/interaction.repository';
import { Interaction } from '../../../src/domain/interaction/interaction';
import { InteractionType } from '../../../src/domain/interaction/interactionType';
import { Categorie } from '../../../src/domain/categorie';
import { UserQuizzProfile } from '../../../src/domain/quizz/userQuizzProfile';
import { Decimal } from '@prisma/client/runtime/library';
import { InteractionScore } from '../../../src/domain/interaction/interactionScore';

describe('InteractionRepository', () => {
  let interactionRepository = new InteractionRepository(TestUtil.prisma);

  beforeAll(async () => {
    await TestUtil.appinit();
  });

  beforeEach(async () => {
    await TestUtil.deleteAll();
  });

  afterAll(async () => {
    await TestUtil.appclose();
  });

  it('listMaxInteractionsByUtilisateurIdAndType : desc order by reco score , no matter difficulty', async () => {
    // GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      score: 0.1,
      difficulty: 1,
    });
    await TestUtil.create('interaction', {
      id: '2',
      score: 0.8,
      difficulty: 2,
    });
    await TestUtil.create('interaction', {
      id: '3',
      score: 0.5,
      difficulty: 3,
    });

    // WHEN
    const liste =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
        },
      );

    // THEN
    expect(liste).toHaveLength(3);
    expect(liste[0].score).toEqual(new Decimal(0.8));
    expect(liste[1].score).toEqual(new Decimal(0.5));
    expect(liste[2].score).toEqual(new Decimal(0.1));
  });
  it('listMaxInteractionsByUtilisateurIdAndType : filters by type ', async () => {
    // GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', { id: '1', type: 'quizz' });
    await TestUtil.create('interaction', { id: '2', type: 'article' });
    await TestUtil.create('interaction', { id: '3', type: 'article' });

    // WHEN
    const liste =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
          type: InteractionType.article,
        },
      );
    // THEN
    expect(liste).toHaveLength(2);
  });
  it('listMaxInteractionsByUtilisateurIdAndType : applies max number ', async () => {
    // GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', { id: '1', type: 'article' });
    await TestUtil.create('interaction', { id: '2', type: 'article' });
    await TestUtil.create('interaction', { id: '3', type: 'article' });

    // WHEN
    const liste =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
          type: InteractionType.article,
          maxNumber: 1,
        },
      );
    // THEN
    expect(liste).toHaveLength(1);
  });
  it('resetAllInteractionStatus : resets nothing when date after scheduled reset date', async () => {
    // GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', { scheduled_reset: new Date(100) });

    // WHEN
    await interactionRepository.resetAllInteractionStatus(new Date(50));
    // THEN
    const result = await TestUtil.prisma.interaction.findUnique({
      where: { id: 'interaction-id' },
    });
    expect(result.done).toStrictEqual(false);
    expect(result.clicked).toStrictEqual(false);
  });
  it('resetAllInteractionStatus : resets nothing when no scheduled_reset date', async () => {
    // GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', { scheduled_reset: null, done: true });

    // WHEN
    await interactionRepository.resetAllInteractionStatus(new Date(50));
    // THEN
    const result = await TestUtil.prisma.interaction.findUnique({
      where: { id: 'interaction-id' },
    });
    expect(result.done).toStrictEqual(true);
  });
  it('resetAllInteractionStatus : resets one only when date passed', async () => {
    // GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      scheduled_reset: new Date(100),
      done: true,
      clicked: true,
      done_at: new Date(),
      clicked_at: new Date(),
    });
    await TestUtil.create('interaction', {
      id: '2',
      scheduled_reset: new Date(200),
      done: true,
      clicked: true,
      done_at: new Date(),
      clicked_at: new Date(),
    });

    // WHEN
    await interactionRepository.resetAllInteractionStatus(new Date(150));

    // THEN
    let inter1 = await TestUtil.prisma.interaction.findUnique({
      where: { id: '1' },
    });
    let inter2 = await TestUtil.prisma.interaction.findUnique({
      where: { id: '2' },
    });

    expect(inter1.done).toStrictEqual(false);
    expect(inter1.clicked).toStrictEqual(false);
    expect(inter1.done_at).toStrictEqual(null);
    expect(inter1.clicked_at).toStrictEqual(null);
    expect(inter1.scheduled_reset).toStrictEqual(null);
    expect(inter2.done).toStrictEqual(true);
    expect(inter2.clicked).toStrictEqual(true);
    expect(inter2.done_at).not.toBeNull();
    expect(inter2.clicked_at).not.toBeNull();
    expect(inter2.scheduled_reset).not.toBeNull();
  });
  it('update : update interaction and proper update_at date', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction');
    const interactionToUpdate = new Interaction({
      points: 123,
      id: 'interaction-id',
    });

    //WHEN
    await interactionRepository.updateInteraction(interactionToUpdate);

    // THEN
    const result = await TestUtil.prisma.interaction.findUnique({
      where: { id: 'interaction-id' },
    });
    expect(result.categorie).toStrictEqual('consommation');
    expect(result.points).toStrictEqual(123);
    expect(result.updated_at).not.toBeNull();
  });
  it('listMaxInteractionsByUtilisateurIdAndTypev : select pinned interactions when asked', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', { pinned_at_position: 4 });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
          pinned: true,
        },
      );

    // THEN
    expect(result).toHaveLength(1);
  });
  it('listMaxInteractionsByUtilisateurIdAndTypev : select no pinned ineractions when not asked explicitly', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', { pinned_at_position: 4 });
    await TestUtil.create('interaction', { id: 'id-2' });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
          pinned: false,
        },
      );

    // THEN
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual('id-2');
  });
  it('listMaxInteractionsByUtilisateurIdAndTypev : select no pinned ineractions when not pinned', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction');

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
          pinned: true,
        },
      );

    // THEN
    expect(result).toHaveLength(0);
  });
  it('listMaxInteractionsByUtilisateurIdAndTypev : select no pinned ineractions when not asked implicitly', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', { pinned_at_position: 4 });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
        },
      );

    // THEN
    expect(result).toHaveLength(0);
  });
  it('listMaxInteractionsByUtilisateurIdAndType : locked boolean optional', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', { id: '1', locked: true });
    await TestUtil.create('interaction', { id: '2', locked: false });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
        },
      );

    // THEN
    expect(result).toHaveLength(2);
  });
  it('listMaxInteractionsByUtilisateurIdAndType : target quizz difficulty', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      difficulty: 1,
      categorie: Categorie.alimentation,
      type: InteractionType.quizz,
    });
    await TestUtil.create('interaction', {
      id: '2',
      difficulty: 2,
      categorie: Categorie.alimentation,
      type: InteractionType.quizz,
    });
    await TestUtil.create('interaction', {
      id: '3',
      difficulty: 3,
      categorie: Categorie.alimentation,
      type: InteractionType.quizz,
    });
    await TestUtil.create('interaction', {
      id: '4',
      type: InteractionType.article,
    });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
          quizzProfile: new UserQuizzProfile({
            alimentation: { level: 2, isCompleted: false },
          }),
          type: InteractionType.quizz,
        },
      );

    // THEN
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual('2');
  });
  it('listMaxInteractionsByUtilisateurIdAndType : filtre par codes postaux', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      type: InteractionType.article,
      codes_postaux: ['123', '456'],
    });
    await TestUtil.create('interaction', {
      id: '2',
      type: InteractionType.article,
      codes_postaux: ['456', '789'],
    });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
          code_postal: '123',
        },
      );

    // THEN
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual('1');
  });
  it('listMaxInteractionsByUtilisateurIdAndType : ne filtre pas par codes postaux si pas de code postal dans le filtre de recherche', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      type: InteractionType.article,
      codes_postaux: ['123', '456'],
    });
    await TestUtil.create('interaction', {
      id: '2',
      type: InteractionType.article,
      codes_postaux: ['456', '789'],
    });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
        },
      );

    // THEN
    expect(result).toHaveLength(2);
  });
  it('listMaxInteractionsByUtilisateurIdAndType : retourne des interations sans code postal même si code postal en filtre', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      type: InteractionType.article,
      codes_postaux: ['123', '456'],
    });
    await TestUtil.create('interaction', {
      id: '2',
      type: InteractionType.article,
      codes_postaux: [],
    });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
          code_postal: '123',
        },
      );

    // THEN
    expect(result).toHaveLength(2);
  });
  it('listMaxInteractionsByUtilisateurIdAndType : retourne des interations avec et sans code postal  quand pas de code postal en filtre', async () => {
    //GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      type: InteractionType.article,
      codes_postaux: ['123', '456'],
    });
    await TestUtil.create('interaction', {
      id: '2',
      type: InteractionType.article,
      codes_postaux: [],
    });

    //WHEN
    const result =
      await interactionRepository.listMaxEligibleInteractionsByUtilisateurIdAndType(
        {
          utilisateurId: 'utilisateur-id',
        },
      );

    // THEN
    expect(result).toHaveLength(2);
  });
  it('listInteractionScores : liste par categories ', async () => {
    // GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      categorie: Categorie.alimentation,
    });
    await TestUtil.create('interaction', {
      id: '2',
      categorie: Categorie.climat,
    });
    await TestUtil.create('interaction', {
      id: '3',
      categorie: Categorie.consommation,
    });
    await TestUtil.create('interaction', {
      id: '4',
      categorie: Categorie.consommation,
    });
    await TestUtil.create('interaction', {
      id: '5',
      categorie: Categorie.loisir,
    });

    // WHEN
    const liste = await interactionRepository.listInteractionScores(
      'utilisateur-id',
      [Categorie.alimentation, Categorie.consommation],
    );
    // THEN
    expect(liste).toHaveLength(3);
  });
  it('updateInteractionScores : update propelry ', async () => {
    // GIVEN
    await TestUtil.create('utilisateur');
    await TestUtil.create('interaction', {
      id: '1',
      categorie: Categorie.alimentation,
      score: 0.1,
    });
    await TestUtil.create('interaction', {
      id: '2',
      categorie: Categorie.climat,
      score: 0.2,
    });

    let input = [
      new InteractionScore('1', new Decimal(0.11)),
      new InteractionScore('2', new Decimal(0.22)),
    ];

    // WHEN
    const liste = await interactionRepository.updateInteractionScores(input);

    // THEN
    let dbInterations = await TestUtil.prisma.interaction.findMany({
      orderBy: { id: 'asc' },
    });
    expect(dbInterations[0].score).toEqual(new Decimal(0.11));
    expect(dbInterations[1].score).toEqual(new Decimal(0.22));
  });
});
