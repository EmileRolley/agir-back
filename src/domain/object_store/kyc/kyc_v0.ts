import { Versioned } from '../versioned';
import { KYC } from '../../kyc/kyc';
import {
  CategorieQuestionKYC,
  QuestionKYC,
  TypeReponseQuestionKYC,
} from '../../../../src/domain/kyc/questionQYC';
import { Thematique } from '../../../../src/domain/contenu/thematique';
import { Tag } from '../../../../src/domain/utilisateur/ponderationTags';

export class QuestionKYC_v0 {
  id: string;
  question: string;
  type: TypeReponseQuestionKYC;
  categorie: CategorieQuestionKYC;
  points: number;
  is_NGC: boolean;
  reponse?: string[];
  reponses_possibles?: string[];
  ngc_key?: string;
  thematique?: Thematique;
  tags: Tag[];

  static map(elem: QuestionKYC): QuestionKYC_v0 {
    return {
      id: elem.id,
      question: elem.question,
      type: elem.type,
      categorie: elem.categorie,
      points: elem.points,
      is_NGC: elem.is_NGC,
      reponse: elem.reponse,
      reponses_possibles: elem.reponses_possibles,
      ngc_key: elem.ngc_key,
      thematique: elem.thematique,
      tags: elem.tags,
    };
  }
}

export class KYC_v0 extends Versioned {
  answered_questions: QuestionKYC_v0[];

  static serialise(domain: KYC): KYC_v0 {
    return {
      version: 0,
      answered_questions: domain.answered_questions.map((e) =>
        QuestionKYC_v0.map(e),
      ),
    };
  }
}
