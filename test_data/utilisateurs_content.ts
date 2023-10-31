import { Impact, Thematique } from '../src/domain/utilisateur/onboarding/onboarding';

const minQuizzLevel = {
  alimentation: { level: 1, isCompleted: false },
  transport: { level: 1, isCompleted: false },
  logement: { level: 1, isCompleted: false },
  consommation: { level: 1, isCompleted: false },
  climat: { level: 1, isCompleted: false },
  dechet: { level: 1, isCompleted: false },
  loisir: { level: 1, isCompleted: false },
};

const ONBOARD_DATA_1134 = `{
    "transports": ["voiture", "pied"],
    "avion": 1,
    "code_postal": "91120",
    "adultes": 2,
    "enfants": 1,
    "residence": "maison",
    "proprietaire": true,
    "superficie": "superficie_35",
    "chauffage": "bois",
    "repas": "vegan",
    "consommation": "shopping"
}`;

const ONBOARDING_RES_3344 = {
  ventilation_par_thematiques: {
    alimentation: Impact.eleve,
    transports: Impact.eleve,
    logement: Impact.tres_eleve,
    consommation: Impact.tres_eleve,
  },
  ventilation_par_impacts: {
    '1': [],
    '2': [],
    '3': [Thematique.alimentation, Thematique.transports],
    '4': [Thematique.logement, Thematique.consommation],
  },
};
const ONBOARDING_RES_1122 = {
  ventilation_par_thematiques: {
    alimentation: Impact.faible,
    transports: Impact.faible,
    logement: Impact.tres_faible,
    consommation: Impact.tres_faible,
  },
  ventilation_par_impacts: {
    '1': [Thematique.logement, Thematique.consommation],
    '2': [Thematique.alimentation, Thematique.transports],
    '3': [],
    '4': [],
  },
};
const ONBOARDING_RES_1234 = {
  ventilation_par_thematiques: {
    alimentation: Impact.tres_faible,
    transports: Impact.tres_eleve,
    logement: Impact.eleve,
    consommation: Impact.faible,
  },
  ventilation_par_impacts: {
    '1': [Thematique.alimentation],
    '2': [Thematique.consommation],
    '3': [Thematique.logement],
    '4': [Thematique.transports],
  },
};
const ONBOARDING_RES_4444 = {
  ventilation_par_thematiques: {
    alimentation: Impact.tres_eleve,
    transports: Impact.tres_eleve,
    logement: Impact.tres_eleve,
    consommation: Impact.tres_eleve,
  },
  ventilation_par_impacts: {
    '1': [],
    '2': [],
    '3': [],
    '4': [
      Thematique.logement,
      Thematique.consommation,
      Thematique.alimentation,
      Thematique.transports,
    ],
  },
};

const utilisateurs = {
  michel0: {
    nom: 'Michel0',
    prenom: 'Mimi0',
    points: 0,
    interactions: [
      { cms_id: 13, cms_type: 'quizz', score: 0.5 },
      { cms_id: 6, cms_type: 'article', score: 0.5 },
      { cms_id: 3, cms_type: 'article', score: 0.5 },
      { id: 'suivi_du_jour', score: 0.5 },
      {
        id: 'ajouter_linky',
        score: 0.1,
        locked: true,
        pinned_at_position: 3,
      },
      { cms_id: 1, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5, locked: true },
    ],
    suivis: [],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1234,
  },
  michel6: {
    nom: 'Michel6',
    prenom: 'Mimi6',
    points: 36,
    interactions: [
      { id: 'suivi_du_jour', score: 0.5 },
      { cms_id: 1, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'quizz', score: 0.5 },
      { cms_id: 4, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 7, cms_type: 'quizz', score: 0.5 },
      { cms_id: 8, cms_type: 'quizz', score: 0.5 },
      { cms_id: 9, cms_type: 'quizz', score: 0.5 },
      { cms_id: 10, cms_type: 'quizz', score: 0.5 },
      { cms_id: 11, cms_type: 'quizz', score: 0.5 },
      { cms_id: 12, cms_type: 'quizz', score: 0.5 },
      { cms_id: 13, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'article', score: 0.5 },
      { cms_id: 3, cms_type: 'article', score: 0.5 },
      { cms_id: 4, cms_type: 'article', score: 0.5 },
      { cms_id: 5, cms_type: 'article', score: 0.5 },
      { cms_id: 6, cms_type: 'article', score: 0.5 },
    ],
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
  },
  michel666: {
    nom: 'michel666',
    prenom: 'Mimi666',
    points: 36,
    interactions: [
      { cms_id: 1, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'quizz', score: 0.5 },
      { cms_id: 4, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 7, cms_type: 'quizz', score: 0.5 },
      { cms_id: 8, cms_type: 'quizz', score: 0.5 },
      { cms_id: 9, cms_type: 'quizz', score: 0.5 },
      { cms_id: 10, cms_type: 'quizz', score: 0.5 },
      { cms_id: 11, cms_type: 'quizz', score: 0.5 },
      { cms_id: 12, cms_type: 'quizz', score: 0.5 },
      { cms_id: 13, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'article', score: 0.5 },
      { cms_id: 3, cms_type: 'article', score: 0.5 },
      { cms_id: 4, cms_type: 'article', score: 0.5 },
      { cms_id: 5, cms_type: 'article', score: 0.5 },
      { cms_id: 6, cms_type: 'article', score: 0.5 },
    ],
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
  },
  benoit: {
    nom: 'Benoit',
    prenom: 'B',
    points: 0,
    interactions: [
      { id: 'suivi_du_jour', score: 0.9 },
      { cms_id: 1, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'quizz', score: 0.5 },
      { cms_id: 4, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 7, cms_type: 'quizz', score: 0.5 },
      { cms_id: 8, cms_type: 'quizz', score: 0.5 },
      { cms_id: 9, cms_type: 'quizz', score: 0.5 },
      { cms_id: 10, cms_type: 'quizz', score: 0.5 },
      { cms_id: 11, cms_type: 'quizz', score: 0.5 },
      { cms_id: 12, cms_type: 'quizz', score: 0.5 },
      { cms_id: 13, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'article', score: 0.5 },
      { cms_id: 3, cms_type: 'article', score: 0.5 },
      { cms_id: 4, cms_type: 'article', score: 0.5 },
      { cms_id: 5, cms_type: 'article', score: 0.5 },
      { cms_id: 6, cms_type: 'article', score: 0.5 },
    ],
    suivis: [],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1122,
  },
  dorian: {
    nom: 'Dorian_test',
    prenom: 'D',
    points: 0,
    interactions: [
      { id: 'suivi_du_jour', score: 0.5 },
      { cms_id: 1, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'quizz', score: 0.5 },
      { cms_id: 4, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 7, cms_type: 'quizz', score: 0.5 },
      { cms_id: 8, cms_type: 'quizz', score: 0.5 },
      { cms_id: 9, cms_type: 'quizz', score: 0.5 },
      { cms_id: 10, cms_type: 'quizz', score: 0.5 },
      { cms_id: 11, cms_type: 'quizz', score: 0.5 },
      { cms_id: 12, cms_type: 'quizz', score: 0.5 },
      { cms_id: 13, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'article', score: 0.5 },
      { cms_id: 3, cms_type: 'article', score: 0.5 },
      { cms_id: 4, cms_type: 'article', score: 0.5 },
      { cms_id: 5, cms_type: 'article', score: 0.5 },
      { cms_id: 6, cms_type: 'article', score: 0.5 },
    ],
    suivis: [],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_1122,
  },
  livio: {
    nom: 'Livio_test',
    prenom: 'L',
    points: 36,
    interactions: [
      { id: 'aide_velo', score: 0.6 },
      { id: 'aide_retrofit', score: 0.1 },
      { id: 'suivi_du_jour', score: 0.9 },
      { cms_id: 1, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'quizz', score: 0.5 },
      { cms_id: 4, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 7, cms_type: 'quizz', score: 0.5 },
      { cms_id: 8, cms_type: 'quizz', score: 0.5 },
      { cms_id: 9, cms_type: 'quizz', score: 0.5 },
      { cms_id: 10, cms_type: 'quizz', score: 0.5 },
      { cms_id: 11, cms_type: 'quizz', score: 0.5 },
      { cms_id: 12, cms_type: 'quizz', score: 0.5 },
      { cms_id: 13, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'article', score: 0.5 },
      { cms_id: 3, cms_type: 'article', score: 0.5 },
      { cms_id: 4, cms_type: 'article', score: 0.5 },
      { cms_id: 5, cms_type: 'article', score: 0.5 },
      { cms_id: 6, cms_type: 'article', score: 0.5 },
    ],
    suivis: ['sa1', 'st1', 'st2'],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_3344,
  },
  wojtek: {
    nom: 'WOJCIK',
    prenom: 'Wojtek',
    points: 10,
    email: 'ww@w.com',
    mot_de_passe: 'haha',
    interactions: [
      { id: 'aide_velo', score: 0.6 },
      { id: 'aide_retrofit', score: 0.1 },
      { id: 'suivi_du_jour', score: 0.9 },
      { cms_id: 1, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'quizz', score: 0.5 },
      { cms_id: 4, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 7, cms_type: 'quizz', score: 0.5 },
      { cms_id: 8, cms_type: 'quizz', score: 0.5 },
      { cms_id: 9, cms_type: 'quizz', score: 0.5 },
      { cms_id: 10, cms_type: 'quizz', score: 0.5 },
      { cms_id: 11, cms_type: 'quizz', score: 0.5 },
      { cms_id: 12, cms_type: 'quizz', score: 0.5 },
      { cms_id: 13, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'article', score: 0.5 },
      { cms_id: 3, cms_type: 'article', score: 0.5 },
      { cms_id: 4, cms_type: 'article', score: 0.5 },
      { cms_id: 5, cms_type: 'article', score: 0.5 },
      { cms_id: 6, cms_type: 'article', score: 0.5 },
    ],
    suivis: ['sa1', 'sa2', 'sa3', 'st1', 'st2', 'st3'],
    bilans: ['bilan1'],
    badges: ['badge1', 'badge2'],
    services: ['recettes', 'linky', 'suivi_transport'],
    questionsNGC: {
      'transport . voiture . km': 30000,
    },
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_3344,
  },
  quizzman: {
    nom: 'quizzman',
    prenom: 'man',
    points: 10,
    interactions: [
      { id: 'suivi_du_jour', score: 0.5 },
      { cms_id: 1, cms_type: 'quizz', score: 0.5 },
      { cms_id: 2, cms_type: 'quizz', score: 0.5 },
      { cms_id: 4, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 5, cms_type: 'quizz', score: 0.5 },
      { cms_id: 7, cms_type: 'quizz', score: 0.5 },
      { cms_id: 8, cms_type: 'quizz', score: 0.5 },
      { cms_id: 9, cms_type: 'quizz', score: 0.5 },
      { cms_id: 10, cms_type: 'quizz', score: 0.5, done: true },
      { cms_id: 11, cms_type: 'quizz', score: 0.5 },
      { cms_id: 12, cms_type: 'quizz', score: 0.5 },
      { cms_id: 13, cms_type: 'quizz', score: 0.5, done: true },
      { cms_id: 2, cms_type: 'article', score: 0.5 },
      { cms_id: 3, cms_type: 'article', score: 0.5 },
      { cms_id: 4, cms_type: 'article', score: 0.5 },
      { cms_id: 5, cms_type: 'article', score: 0.5 },
      { cms_id: 6, cms_type: 'article', score: 0.5 },
    ],
    bilans: ['bilan1'],
    badges: ['badge1'],
    quizzLevels: minQuizzLevel,
    onboardingResult: ONBOARDING_RES_4444,
  },
};

module.exports = utilisateurs;
