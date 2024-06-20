import { DifficultyLevel } from '../src/domain/contenu/difficultyLevel';
import { ContentType } from '../src/domain/contenu/contentType';
import { Thematique } from '../src/domain/contenu/thematique';
import {
  Impact,
  ThematiqueOnboarding as ThemaOnbo,
} from '../src/domain/onboarding/onboarding';
import { v4 as uuidv4 } from 'uuid';
import { LiveService } from '../src/domain/service/serviceDefinition';
import { Feature } from '../src/domain/gamification/feature';

const ONBOARD_DATA_1234 = {
  transports: ['voiture', 'pied'],
  avion: 2,
  code_postal: '21000',
  commune: 'DIJON',
  adultes: 2,
  enfants: 1,
  residence: 'maison',
  proprietaire: true,
  superficie: 'superficie_70',
  chauffage: 'gaz',
  repas: 'vegan',
  consommation: 'secondemain',
};
const ONBOARD_DATA_NO_CAR_MOTO = {
  transports: ['pied'],
  avion: 2,
  code_postal: '21000',
  commune: 'DIJON',
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
    nom: 'Experimental',
    prenom: 'Exp',
    email: 'exp@agir.dev',
    mot_de_passe: 'hoho',
    revenu_fiscal: null,
    parts: null,
    version: 6,
    migration_enabled: true,
    gamification: {
      version: 0,
      points: 590,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [
        'aides',
        'services',
        'recommandations',
        'bibliotheque',
      ],
    },
    todo: {
      version: 0,
      todo_active: 0,
      liste_todo: [
        {
          numero_todo: 1,
          points_todo: 30,
          titre: 'Mission EXP',
          done_at: null,
          done: [],
          todo: [
            {
              id: uuidv4(),
              titre: 'va voir Linky',
              thematiques: [Thematique.consommation],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: ContentType.service,
              service_id: LiveService.linky,
              level: DifficultyLevel.L1,
              points: 20,
            },
            {
              id: uuidv4(),
              titre: 'Répondre à une question pour mieux vous connaître',
              thematiques: [Thematique.climat],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: ContentType.kyc,
              level: DifficultyLevel.ANY,
              points: 20,
              content_id: 'KYC001',
            },
          ],
        },
      ],
    },
    suivis: [],
    bilans: [],
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_NO_CAR_MOTO,
  },
  wojtek: {
    nom: 'WWW',
    prenom: 'Wojtek',
    email: 'ww@w.com',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  DEV: {
    nom: 'Mr Dev',
    prenom: 'Mr Dev',
    email: 'dev@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    migration_enabled: true,
    version: 6,
    gamification: {
      version: 0,
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [
        'aides',
        'services',
        'recommandations',
        'bibliotheque',
        'defis',
        'univers',
      ],
    },
    /*
    linky: {
      prm: '12345678912345',
    },
    */
    suivis: [],
    bilans: [],
    services: [],
    /*
    questionsNGC: {
      'transport . voiture . km': 30000,
    },
    */
    /*
    todo: {
      version: 0,
      todo_active: 0,
      liste_todo: [
        {
          numero_todo: 1,
          points_todo: 30,
          titre: 'Mission EXP',
          done_at: null,
          done: [],
          todo: [
            {
              id: uuidv4(),
              titre: 'Lire un article Consommation - très facile',
              thematiques: [Thematique.consommation],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: ContentType.article,
              level: DifficultyLevel.L1,
              points: 20,
            },
            {
              id: uuidv4(),
              titre: 'Réussir 2 quiz Consommation - très facile',
              thematiques: [Thematique.consommation],
              progression: { current: 0, target: 2 },
              sont_points_en_poche: false,
              type: ContentType.quizz,
              level: DifficultyLevel.L1,
              points: 20,
            },
            {
              id: uuidv4(),
              titre: 'Répondre à une question pour mieux vous connaître',
              thematiques: [Thematique.climat],
              progression: { current: 0, target: 1 },
              sont_points_en_poche: false,
              type: ContentType.kyc,
              level: DifficultyLevel.ANY,
              points: 20,
              content_id: '001',
            },
          ],
        },
      ],
    },
    */
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_1234,
  },
  recette_livio: {
    nom: 'RECETTEUR',
    prenom: 'Livio',
    email: 'livio@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  margaux: {
    nom: 'RECETTEUR',
    prenom: 'Margaux',
    email: 'margaux@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  nina: {
    nom: 'RECETTEUR',
    prenom: 'Nina',
    email: 'nina@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  lucas: {
    nom: 'RECETTEUR',
    prenom: 'Lucas',
    email: 'lucas@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  jeremie: {
    nom: 'RECETTEUR',
    prenom: 'Jeremie',
    email: 'jeremie@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  dorian: {
    nom: 'RECETTEUR',
    prenom: 'Dorian',
    email: 'dorian@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  guillaume: {
    nom: 'RECETTEUR',
    prenom: 'Guillaume',
    email: 'guillaume@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  romane: {
    nom: 'RECETTEUR',
    prenom: 'Romane',
    email: 'romane@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  claire: {
    nom: 'RECETTEUR',
    prenom: 'Claire',
    email: 'claire@agir.dev',
    mot_de_passe: 'haha',
    revenu_fiscal: null,
    parts: null,
    version: 8,
    gamification: {
      points: 0,
    },
    unlocked_features: {
      version: 1,
      unlocked_features: [Feature.univers, Feature.bibliotheque],
    },
    suivis: [],
    services: [],
  },
  fruggr: {
    nom: 'D4B',
    prenom: 'fruggr',
    email: 'fruggr@agir.dev',
    mot_de_passe: 'gofruggr',
    revenu_fiscal: 0,
    parts: null,
    version: 3,
    unlocked_features: {
      version: 1,
      unlocked_features: [
        'aides',
        'services',
        'recommandations',
        'bibliotheque',
        'defis',
      ],
    },
    gamification: {
      points: 0,
    },
    suivis: [],
    services: [],
    onboardingResult: ONBOARDING_RES_1234,
    onboardingData: ONBOARD_DATA_1234,
  },
};

module.exports = utilisateurs;
