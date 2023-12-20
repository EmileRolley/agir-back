import { DifficultyLevel } from '../src/domain/difficultyLevel';
import { InteractionType } from '../src/domain/interaction/interactionType';
import { Thematique } from '../src/domain/thematique';
import {
  Impact,
  Thematique as ThemaOnbo,
} from '../src/domain/utilisateur/onboarding/onboarding';
import { v4 as uuidv4 } from 'uuid';
import { LiveService } from '../src/domain/service/serviceDefinition';

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
  experimental: {
    nom: 'Erimental',
    prenom: 'Exp',
    email: 'exp@agir.dev',
    mot_de_passe: 'hoho',
    code_postal: '49100',
    commune: 'ANGERS',
    revenu_fiscal: null,
    parts: null,
    gamification: {
      points: 0,
    },
    todo: {
      todo_active: 0,
      liste_todo: [
        {
          numero_todo: 1,
          points_todo: 30,
          titre: 'Votre 1ère mission',
          done_at: null,
          done: [
            {
              id: uuidv4(),
              titre: `Faire le bilan simplifié de vos impacts`,
              thematiques: [],
              progression: { current: 1, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.onboarding,
              level: null,
              points: 10,
            },
          ],
          todo: [
            {
              id: uuidv4(),
              titre: 'Réussir 1 quiz Climat - très facile',
              thematiques: [Thematique.climat],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.quizz,
              level: DifficultyLevel.L1,
              points: 20,
            },
          ],
        },
        {
          numero_todo: 2,
          points_todo: 30,
          titre: 'Mission 2',
          done_at: null,
          done: [],
          todo: [
            {
              id: uuidv4(),
              titre: 'Réussir 2 quiz Climat - très facile',
              thematiques: [Thematique.climat],
              progression: { current: 1, target: 2 },
              sont_points_en_poche: false,
              type: InteractionType.quizz,
              level: DifficultyLevel.L1,
              points: 20,
            },
            {
              id: uuidv4(),
              titre: 'Lire un article Transports - très facile',
              thematiques: [Thematique.transport],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.article,
              level: DifficultyLevel.L1,
              points: 20,
            },
          ],
        },
        {
          numero_todo: 3,
          points_todo: 30,
          titre: 'Mission 3',
          done_at: null,
          done: [],
          todo: [
            {
              id: uuidv4(),
              titre: `Réussir 2 quiz Transports - très facile`,
              thematiques: [Thematique.transport],
              progression: { current: 0, target: 2 },
              sont_points_en_poche: false,
              type: InteractionType.quizz,
              level: DifficultyLevel.L1,
              points: 20,
            },
            {
              id: uuidv4(),
              titre: 'Lire un article Alimentation - très facile',
              thematiques: [Thematique.alimentation],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.article,
              level: DifficultyLevel.L1,
              points: 20,
            },
          ],
        },
        {
          numero_todo: 4,
          points_todo: 30,
          titre: 'Mission 4',
          done_at: null,
          done: [],
          todo: [
            {
              id: uuidv4(),
              titre: `Installer "Fruits et légumes de saison"`,
              thematiques: [Thematique.alimentation],
              progression: { current: 0, target: 1 },
              service_id: LiveService.fruits,
              sont_points_en_poche: false,
              type: InteractionType.service,
              points: 20,
              level: DifficultyLevel.ANY,
            },
            {
              id: uuidv4(),
              titre: `Réussir 3 quiz Logement - très facile`,
              thematiques: [Thematique.logement],
              progression: { current: 0, target: 3 },
              sont_points_en_poche: false,
              type: InteractionType.quizz,
              level: DifficultyLevel.L1,
              points: 20,
            },
          ],
        },
        {
          numero_todo: 5,
          points_todo: 30,
          titre: 'Mission 5',
          done_at: null,
          done: [],
          todo: [
            {
              id: uuidv4(),
              titre: 'Lire un article Consommation - très facile',
              thematiques: [Thematique.consommation],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.article,
              level: DifficultyLevel.L1,
              points: 20,
            },
            {
              id: uuidv4(),
              titre: 'Réussir 3 quiz Consommation - très facile',
              thematiques: [Thematique.consommation],
              progression: { current: 0, target: 3 },
              sont_points_en_poche: false,
              type: InteractionType.quizz,
              level: DifficultyLevel.L1,
              points: 20,
            },
            {
              id: uuidv4(),
              titre: 'Lire un article Déchets - très facile',
              thematiques: [Thematique.dechet],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: InteractionType.article,
              level: DifficultyLevel.L1,
              points: 20,
            },
          ],
        },
      ],
    },
    interactions: ALL_INTERACTIONS,
    suivis: [],
    bilans: [],
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
    parts: null,
    gamification: {
      points: 0,
    },
    suivis: [],
    bilans: [],
    badges: [],
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
    revenu_fiscal: 0,
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
    revenu_fiscal: 0,
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
    revenu_fiscal: 0,
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
