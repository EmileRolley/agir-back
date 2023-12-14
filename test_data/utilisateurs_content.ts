import { DifficultyLevel } from '../src/domain/difficultyLevel';
import { InteractionType } from '../src/domain/interaction/interactionType';
import { Thematique } from '../src/domain/thematique';
import {
  Impact,
  Thematique as ThemaOnbo,
} from '../src/domain/utilisateur/onboarding/onboarding';

const minQuizzLevel = {
  alimentation: { level: 1, isCompleted: false },
  transport: { level: 1, isCompleted: false },
  logement: { level: 1, isCompleted: false },
  consommation: { level: 1, isCompleted: false },
  climat: { level: 1, isCompleted: false },
  dechet: { level: 1, isCompleted: false },
  loisir: { level: 1, isCompleted: false },
};

const ALL_INTERACTIONS = [
  { cms_id: 2, cms_type: 'quizz', score: 0.5 },
  { cms_id: 4, cms_type: 'quizz', score: 0.5 },
  { cms_id: 5, cms_type: 'quizz', score: 0.5 },
  { cms_id: 6, cms_type: 'quizz', score: 0.5 },
  { cms_id: 7, cms_type: 'quizz', score: 0.5 },
  { cms_id: 8, cms_type: 'quizz', score: 0.5 },
  { cms_id: 9, cms_type: 'quizz', score: 0.5 },
  { cms_id: 10, cms_type: 'quizz', score: 0.5 },
  { cms_id: 11, cms_type: 'quizz', score: 0.5 },
  { cms_id: 12, cms_type: 'quizz', score: 0.5 },
  { cms_id: 13, cms_type: 'quizz', score: 0.5 },
  { cms_id: 14, cms_type: 'quizz', score: 0.5 },
  { cms_id: 15, cms_type: 'quizz', score: 0.5 },
  { cms_id: 16, cms_type: 'quizz', score: 0.5 },
  { cms_id: 17, cms_type: 'quizz', score: 0.5 },
  { cms_id: 18, cms_type: 'quizz', score: 0.5 },
  { cms_id: 19, cms_type: 'quizz', score: 0.5 },
  { cms_id: 20, cms_type: 'quizz', score: 0.5 },
  { cms_id: 21, cms_type: 'quizz', score: 0.5 },

  { cms_id: 2, cms_type: 'article', score: 0.5 },
  { cms_id: 3, cms_type: 'article', score: 0.5 },
  { cms_id: 4, cms_type: 'article', score: 0.5 },
  { cms_id: 5, cms_type: 'article', score: 0.5 },
  { cms_id: 6, cms_type: 'article', score: 0.5 },
  { cms_id: 11, cms_type: 'article', score: 0.5 },
  { cms_id: 12, cms_type: 'article', score: 0.5 },
  { cms_id: 13, cms_type: 'article', score: 0.5 },
  { cms_id: 14, cms_type: 'article', score: 0.5 },
  { cms_id: 15, cms_type: 'article', score: 0.5 },
  { cms_id: 16, cms_type: 'article', score: 0.5 },
  { cms_id: 17, cms_type: 'article', score: 0.5 },
  { cms_id: 18, cms_type: 'article', score: 0.5 },
  { cms_id: 19, cms_type: 'article', score: 0.5 },
  { cms_id: 20, cms_type: 'article', score: 0.5 },
  { cms_id: 21, cms_type: 'article', score: 0.5 },
  { cms_id: 22, cms_type: 'article', score: 0.5 },
  { cms_id: 23, cms_type: 'article', score: 0.5 },
  { cms_id: 24, cms_type: 'article', score: 0.5 },
  { cms_id: 25, cms_type: 'article', score: 0.5 },
  { cms_id: 26, cms_type: 'article', score: 0.5 },
  { cms_id: 27, cms_type: 'article', score: 0.5 },
  { cms_id: 28, cms_type: 'article', score: 0.5 },
  { cms_id: 29, cms_type: 'article', score: 0.5 },
  { cms_id: 30, cms_type: 'article', score: 0.5 },
];

const ONBOARD_DATA_1234 = {
  transports: ['voiture', 'pied'],
  avion: 2,
  code_postal: '91120',
  adultes: 2,
  enfants: 1,
  residence: 'maison',
  proprietaire: true,
  superficie: 'superficie_70',
  chauffage: 'gaz',
  repas: 'vegan',
  consommation: 'secondemain',
};

const ONBOARDING_RES_1234 = {
  ventilation_par_thematiques: {
    alimentation: Impact.tres_faible,
    transports: Impact.tres_eleve,
    logement: Impact.eleve,
    consommation: Impact.faible,
  },
  ventilation_par_impacts: {
    '1': [ThemaOnbo.alimentation],
    '2': [ThemaOnbo.consommation],
    '3': [ThemaOnbo.logement],
    '4': [ThemaOnbo.transports],
  },
};

const utilisateurs = {
  michel0: {
    nom: 'Michel0',
    prenom: 'Mimi0',
    email: 'michel0@beta.com',
    mot_de_passe: 'incroyable',
    code_postal: '49100',
    commune: 'ANGERS',
    revenu_fiscal: null,
    parts: null,
    gamification: {
      points: 0,
    },
    interactions: ALL_INTERACTIONS,
    suivis: [],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_1234,
  },
  michel6: {
    nom: 'Michel6',
    prenom: 'Mimi6',
    email: 'michel6@beta.com',
    mot_de_passe: 'incroyable',
    code_postal: '49100',
    commune: 'ANGERS',
    revenu_fiscal: 0,
    parts: 2.5,
    gamification: {
      points: 0,
    },
    todo: {
      todo_active: 0,
      liste_todo: [
        {
          numero_todo: 2,
          points_todo: 25,
          titre: 'Des quiz, mais aussi des articles !',
          done_at: null,
          done: [],
          todo: [
            {
              id: 1,
              titre: 'Faire 1 quizz logement',
              thematiques: [Thematique.logement],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.quizz,
              level: DifficultyLevel.ANY,
              points: 10,
            },
            {
              id: 2,
              titre: `Allez découvrir le catalogue d'aides !`,
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.aides,
              points: 33,
            },
            {
              id: 3,
              titre: `Consultez votre profile et complétez le si besoin`,
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.profile,
              points: 21,
            },
            {
              id: 4,
              titre: `Allez voir les recommandations pour vous`,
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.recommandations,
              points: 5,
            },
            {
              id: 5,
              titre: 'lire un premier article transport',
              thematiques: [Thematique.transport],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.article,
              level: DifficultyLevel.ANY,
              points: 10,
            },
          ],
        },
      ],
    },
    interactions: ALL_INTERACTIONS,
    suivis: [
      'sa1',
      'sa2',
      'sa3',
      'sa4',
      'sa5',
      'st1',
      'st2',
      'st3',
      'st4',
      'st5',
    ],
    bilans: ['bilan1'],
    badges: [],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_1234,
  },
  wojtek: {
    nom: 'WOJCIK',
    prenom: 'Wojtek',
    email: 'ww@w.com',
    mot_de_passe: 'haha',
    code_postal: '91120',
    commune: 'PALAISEAU',
    revenu_fiscal: null,
    parts: 7.5,
    gamification: {
      points: 0,
    },
    suivis: ['sa1', 'sa2', 'sa3', 'st1', 'st2', 'st3'],
    bilans: ['bilan1'],
    badges: ['badge1', 'badge2'],
    services: [],
    questionsNGC: {
      'transport . voiture . km': 30000,
    },
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_1234,
  },
  recette_livio: {
    nom: 'RECETTEUR',
    prenom: 'Livio',
    email: 'recette_livio@agir.dev',
    mot_de_passe: 'haha',
    code_postal: '91120',
    commune: 'PALAISEAU',
    revenu_fiscal: null,
    parts: null,
    gamification: {
      points: 0,
    },
    suivis: [],
    services: [],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_1234,
  },
  recette_benoit: {
    nom: 'RECETTEUR',
    prenom: 'Benoit',
    email: 'recette_benoit@agir.dev',
    mot_de_passe: 'haha',
    code_postal: '91120',
    commune: 'PALAISEAU',
    revenu_fiscal: null,
    parts: null,
    gamification: {
      points: 0,
    },
    suivis: [],
    services: [],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_1234,
  },
  fruggr: {
    nom: 'D4B',
    prenom: 'fruggr',
    email: 'fruggr@agir.dev',
    mot_de_passe: 'gofruggr',
    code_postal: '75001',
    commune: 'PARIS',
    revenu_fiscal: null,
    parts: null,
    gamification: {
      points: 0,
    },
    suivis: [],
    services: [],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_1234,
  },
};

module.exports = utilisateurs;
