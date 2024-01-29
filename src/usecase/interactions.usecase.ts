import { Injectable } from '@nestjs/common';
import { Recommandation } from '../../src/domain/recommandation';
import { RecommandationUsecase } from './recommandation.usecase';

@Injectable()
export class InteractionsUsecase {
  constructor(private recommandationUsecase: RecommandationUsecase) {}

  async listInteractions(utilisateurId: string): Promise<Recommandation[]> {
    return await this.recommandationUsecase.listRecommandations(utilisateurId);
  }
}
