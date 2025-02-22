import {
  QuizzAttempt,
  QuizzHistory,
} from '../../../../src/domain/history/quizzHistory';
import { ArticleHistory } from '../../../../src/domain/history/articleHistory';
import { History } from '../../../../src/domain/history/history';
import { Versioned } from '../versioned';

export class ArticleHistory_v0 {
  content_id: string;
  read_date?: Date;
  like_level?: number;
  points_en_poche: boolean;
  favoris: boolean;

  static map(elem: ArticleHistory): ArticleHistory_v0 {
    return {
      content_id: elem.content_id,
      read_date: elem.read_date,
      like_level: elem.like_level,
      points_en_poche: elem.points_en_poche,
      favoris: elem.favoris,
    };
  }
}

export class QuizzAttempt_v0 {
  score: number;
  date: Date;

  static map(elem: QuizzAttempt): QuizzAttempt_v0 {
    return {
      score: elem.score,
      date: elem.date,
    };
  }
}

export class QuizzHistory_v0 {
  content_id: string;
  attempts: QuizzAttempt_v0[];
  like_level?: number;
  points_en_poche: boolean;

  static map(elem: QuizzHistory): QuizzHistory_v0 {
    return {
      content_id: elem.content_id,
      attempts: elem.attempts.map((e) => QuizzAttempt_v0.map(e)),
      like_level: elem.like_level,
      points_en_poche: elem.points_en_poche,
    };
  }
}

export class History_v0 extends Versioned {
  article_interactions: ArticleHistory_v0[];
  quizz_interactions: QuizzHistory_v0[];

  static serialise(domain: History): History_v0 {
    return {
      version: 0,
      article_interactions: domain.article_interactions.map((elem) =>
        ArticleHistory_v0.map(elem),
      ),
      quizz_interactions: domain.quizz_interactions.map((elem) =>
        QuizzHistory_v0.map(elem),
      ),
    };
  }
}
