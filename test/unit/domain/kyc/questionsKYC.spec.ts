import { Thematique } from '../../../../src/domain/contenu/thematique';
import {
  TypeReponseQuestionKYC,
  CategorieQuestionKYC,
  KYCID,
} from '../../../../src/domain/kyc/questionQYC';
import { CatalogueQuestionsKYC } from '../../../../src/domain/kyc/catalogueQuestionsKYC';
import { KYCHistory } from '../../../../src/domain/kyc/kycHistory';
import { Univers } from '../../../../src/domain/univers/univers';

describe('QuestionsQYC && CollectionQuestionsKYC', () => {
  it('constructeur OK', () => {
    // WHEN
    const questionsKYC = new KYCHistory();

    // THEN
    expect(questionsKYC.getAllQuestionSet()).toHaveLength(
      CatalogueQuestionsKYC.getTailleCatalogue(),
    );
  });
  it('isQuestionAnswered :false si pas répondu', () => {
    // WHEN
    const questionsKYC = new KYCHistory();

    // THEN
    expect(questionsKYC.isQuestionAnswered('2')).toStrictEqual(false);
  });
  it('isQuestionAnswered :false si pas répondu', () => {
    // WHEN
    const questionsKYC = new KYCHistory();

    // THEN
    expect(questionsKYC.isQuestionAnswered('2')).toStrictEqual(false);
  });
  it('hasResponses :false si attribut undefined', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.choix_multiple,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: undefined,
          reponses_possibles: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
            { label: 'Ce que je mange', code: Thematique.alimentation },
            { label: 'Comment je bouge', code: Thematique.transport },
          ],
          tags: [],
          universes: [],
        },
      ],
    });

    // THEN
    expect(
      questionsKYC.getQuestionOrException(KYCID.KYC001).hasResponses(),
    ).toEqual(false);
  });
  it('hasResponses :false si attribut []', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.choix_multiple,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: [],
          reponses_possibles: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
            { label: 'Ce que je mange', code: Thematique.alimentation },
            { label: 'Comment je bouge', code: Thematique.transport },
          ],
          tags: [],
          universes: [],
        },
      ],
    });

    // THEN
    expect(
      questionsKYC.getQuestionOrException(KYCID.KYC001).hasResponses(),
    ).toEqual(false);
  });
  it('hasResponses :true si au moins un reponse valorisée', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.choix_multiple,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: [{ label: 'Le climat', code: Thematique.climat }],
          reponses_possibles: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
            { label: 'Ce que je mange', code: Thematique.alimentation },
            { label: 'Comment je bouge', code: Thematique.transport },
          ],
          tags: [],
          universes: [],
        },
      ],
    });

    // THEN
    expect(
      questionsKYC.getQuestionOrException(KYCID.KYC001).hasResponses(),
    ).toEqual(true);
  });
  it('updateQuestion : exeption si question id inconnu', () => {
    // GIVEN
    const questionsKYC = new KYCHistory();

    // WHEN
    try {
      questionsKYC.updateQuestion('1234', ['yo']);
      fail();
    } catch (error) {
      // THEN
      expect(error.code).toEqual('030');
    }
  });
  it('getQuestionOrException : rematch la reponse via code sur catalogue', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.choix_multiple,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: [{ label: 'Le climat', code: Thematique.climat }],
          reponses_possibles: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
            { label: 'Ce que je mange', code: Thematique.alimentation },
            { label: 'Comment je bouge', code: Thematique.transport },
          ],
          tags: [],
          universes: [],
        },
      ],
    });
    CatalogueQuestionsKYC.setCatalogue([
      {
        id: KYCID.KYC001,
        question: `Quel est votre sujet principal d'intéret ?`,
        type: TypeReponseQuestionKYC.choix_multiple,
        is_NGC: false,
        categorie: CategorieQuestionKYC.default,
        points: 10,
        reponses: undefined,
        reponses_possibles: [
          { label: 'AAA', code: Thematique.climat },
          { label: 'BBB', code: Thematique.logement },
          { label: 'CCC', code: Thematique.alimentation },
          { label: 'DDD', code: Thematique.transport },
        ],
        tags: [],
        universes: [],
      },
    ]);

    // WHEN
    const question = questionsKYC.getQuestionOrException(KYCID.KYC001);

    // THEN
    expect(question.reponses[0].code).toEqual(Thematique.climat);
    expect(question.reponses[0].label).toEqual('AAA');
    expect(question.reponses_possibles).toEqual([
      { label: 'AAA', code: Thematique.climat },
      { label: 'BBB', code: Thematique.logement },
      { label: 'CCC', code: Thematique.alimentation },
      { label: 'DDD', code: Thematique.transport },
    ]);
  });
  it('getQuestionOrException : si code manquant dans catalogue, reponse disparait', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.choix_multiple,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
          ],
          reponses_possibles: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
          ],
          tags: [],
          universes: [],
        },
      ],
    });
    CatalogueQuestionsKYC.setCatalogue([
      {
        id: KYCID.KYC001,
        question: `Quel est votre sujet principal d'intéret ?`,
        type: TypeReponseQuestionKYC.choix_multiple,
        is_NGC: false,
        categorie: CategorieQuestionKYC.default,
        points: 10,
        reponses: undefined,
        reponses_possibles: [
          { label: 'BBB', code: Thematique.logement },
          { label: 'CCC', code: Thematique.alimentation },
        ],
        tags: [],
        universes: [],
      },
    ]);

    // WHEN
    const question = questionsKYC.getQuestionOrException(KYCID.KYC001);

    // THEN
    expect(question.reponses).toEqual([
      {
        label: 'BBB',
        code: Thematique.logement,
      },
    ]);
    expect(question.reponses_possibles).toEqual([
      { label: 'BBB', code: Thematique.logement },
      { label: 'CCC', code: Thematique.alimentation },
    ]);

    expect(questionsKYC.answered_questions[0].reponses).toEqual([
      {
        label: 'BBB',
        code: Thematique.logement,
      },
    ]);
  });
  it('getQuestionOrException : si code manquant dans catalogue, reponse disparait', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.choix_multiple,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
          ],
          reponses_possibles: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
          ],
          tags: [],
          universes: [],
        },
      ],
    });
    CatalogueQuestionsKYC.setCatalogue([
      {
        id: KYCID.KYC001,
        question: `Quel est votre sujet principal d'intéret ?`,
        type: TypeReponseQuestionKYC.choix_multiple,
        is_NGC: false,
        categorie: CategorieQuestionKYC.default,
        points: 10,
        reponses: undefined,
        reponses_possibles: [
          { label: 'BBB', code: Thematique.logement },
          { label: 'CCC', code: Thematique.alimentation },
        ],
        tags: [],
        universes: [],
      },
    ]);

    // WHEN
    const question = questionsKYC.getQuestionOrException(KYCID.KYC001);

    // THEN
    expect(question.reponses).toEqual([
      {
        label: 'BBB',
        code: Thematique.logement,
      },
    ]);
    expect(question.reponses_possibles).toEqual([
      { label: 'BBB', code: Thematique.logement },
      { label: 'CCC', code: Thematique.alimentation },
    ]);

    expect(questionsKYC.answered_questions[0].reponses).toEqual([
      {
        label: 'BBB',
        code: Thematique.logement,
      },
    ]);
  });
  it('getQuestionOrException : si code manquant pas grave si question pas de type choix', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.entier,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: [{ label: '123', code: null }],
          reponses_possibles: [],
          tags: [],
          universes: [],
        },
      ],
    });
    CatalogueQuestionsKYC.setCatalogue([
      {
        id: KYCID.KYC001,
        question: `Quel est votre sujet principal d'intéret ?`,
        type: TypeReponseQuestionKYC.entier,
        is_NGC: false,
        categorie: CategorieQuestionKYC.default,
        points: 10,
        reponses: undefined,
        reponses_possibles: [],
        tags: [],
        universes: [],
      },
    ]);

    // WHEN
    const question = questionsKYC.getQuestionOrException(KYCID.KYC001);

    // THEN
    expect(question.reponses).toEqual([{ label: '123', code: null }]);
  });

  it('getKYCRestantes : kyc non repondu', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.choix_multiple,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: [{ label: 'Le climat', code: Thematique.climat }],
          reponses_possibles: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
            { label: 'Ce que je mange', code: Thematique.alimentation },
            { label: 'Comment je bouge', code: Thematique.transport },
          ],
          tags: [],
          universes: [],
        },
      ],
    });
    CatalogueQuestionsKYC.setCatalogue([
      {
        id: KYCID.KYC001,
        question: `Quel est votre sujet principal d'intéret ?`,
        type: TypeReponseQuestionKYC.choix_multiple,
        is_NGC: false,
        categorie: CategorieQuestionKYC.default,
        points: 10,
        reponses: undefined,
        reponses_possibles: [
          { label: 'AAA', code: Thematique.climat },
          { label: 'BBB', code: Thematique.logement },
          { label: 'CCC', code: Thematique.alimentation },
          { label: 'DDD', code: Thematique.transport },
        ],
        tags: [],
        universes: [],
      },
      {
        id: KYCID.KYC002,
        question: `Quel est votre sujet principal d'intéret ?`,
        type: TypeReponseQuestionKYC.libre,
        is_NGC: false,
        categorie: CategorieQuestionKYC.default,
        points: 10,
        reponses: undefined,
        reponses_possibles: undefined,
        tags: [],
        universes: [],
      },
    ]);

    // WHEN
    const questions = questionsKYC.getKYCRestantes(
      CategorieQuestionKYC.default,
    );

    // THEN
    expect(questions).toHaveLength(1);
    expect(questions[0].id).toEqual(KYCID.KYC002);
  });
  it('getKYCRestantes : filtrage univers', () => {
    // GIVEN
    const questionsKYC = new KYCHistory({
      version: 0,
      answered_questions: [
        {
          id: KYCID.KYC001,
          question: `Quel est votre sujet principal d'intéret ?`,
          type: TypeReponseQuestionKYC.choix_multiple,
          is_NGC: false,
          categorie: CategorieQuestionKYC.default,
          points: 10,
          reponses: [{ label: 'Le climat', code: Thematique.climat }],
          reponses_possibles: [
            { label: 'Le climat', code: Thematique.climat },
            { label: 'Mon logement', code: Thematique.logement },
            { label: 'Ce que je mange', code: Thematique.alimentation },
            { label: 'Comment je bouge', code: Thematique.transport },
          ],
          tags: [],
          universes: [],
        },
      ],
    });
    CatalogueQuestionsKYC.setCatalogue([
      {
        id: KYCID.KYC001,
        question: `Quel est votre sujet principal d'intéret ?`,
        type: TypeReponseQuestionKYC.choix_multiple,
        is_NGC: false,
        categorie: CategorieQuestionKYC.default,
        points: 10,
        reponses: undefined,
        reponses_possibles: [
          { label: 'AAA', code: Thematique.climat },
          { label: 'BBB', code: Thematique.logement },
          { label: 'CCC', code: Thematique.alimentation },
          { label: 'DDD', code: Thematique.transport },
        ],
        tags: [],
        universes: [],
      },
      {
        id: KYCID.KYC002,
        question: `Quel est votre sujet principal d'intéret ?`,
        type: TypeReponseQuestionKYC.libre,
        is_NGC: false,
        categorie: CategorieQuestionKYC.default,
        points: 10,
        reponses: undefined,
        reponses_possibles: undefined,
        tags: [],
        universes: [Univers.climat],
      },
    ]);

    // WHEN
    const questions = questionsKYC.getKYCRestantes(
      CategorieQuestionKYC.default,
      Univers.consommation,
    );

    // THEN
    expect(questions).toHaveLength(0);
  });
});
