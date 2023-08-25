import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Interaction as DBInteraction } from '@prisma/client';
import { Interaction } from '../../domain/interaction/interaction';
import { v4 as uuidv4 } from 'uuid';
import { SearchFilter } from '../../../src/domain/interaction/searchFilter';
import { InteractionType } from '../../../src/domain/interaction/interactionType';
import { Categorie } from '../../../src/domain/categorie';

@Injectable()
export class InteractionRepository {
  constructor(private prisma: PrismaService) {}

  async getInteractionById(interactionId): Promise<Interaction | null> {
    const result = await this.prisma.interaction.findUnique({
      where: { id: interactionId },
    });
    return result ? new Interaction(result) : null;
  }

  async insertInteractionForUtilisateur(
    utilisateurId: string,
    interaction: Interaction,
  ) {
    return this.prisma.interaction.create({
      data: {
        ...interaction,
        id: uuidv4(),
        utilisateurId,
      },
    });
  }

  async listMaxEligibleInteractionsByUtilisateurIdAndType(
    filter: SearchFilter,
  ): Promise<Interaction[] | null> {
    let quizz_difficulty_filter;
    if (filter.type === InteractionType.quizz) {
      quizz_difficulty_filter = [];
      for (const cat in Categorie) {
        if (filter.quizzProfile.getLevel(cat as Categorie)) {
          quizz_difficulty_filter.push({
            type: InteractionType.quizz,
            categorie: cat,
            difficulty: filter.quizzProfile.getLevel(cat as Categorie),
          });
        }
      }
    }
    const interList = await this.prisma.interaction.findMany({
      take: filter.maxNumber,
      where: {
        utilisateurId: filter.utilisateurId,
        done: false,
        type: filter.type,
        pinned_at_position: filter.pinned ? { not: null } : null,
        locked: filter.locked,
        OR: quizz_difficulty_filter,
      },
      orderBy: [
        {
          reco_score: 'asc',
        },
      ],
    });
    return interList.map((interactionDB) => new Interaction(interactionDB));
  }

  async partialUpdateInteraction(
    interaction: Interaction,
  ): Promise<DBInteraction | null> {
    return this.prisma.interaction.update({
      where: {
        id: interaction.id,
      },
      data: {
        ...interaction,
        updated_at: undefined, // pour forcer la mise à jour auto
      },
    });
  }

  async resetAllInteractionStatus(date: Date) {
    const result = await this.prisma.interaction.updateMany({
      where: {
        scheduled_reset: {
          lt: date,
        },
      },
      data: {
        clicked: false,
        done: false,
        clicked_at: null,
        done_at: null,
        scheduled_reset: null,
      },
    });
    return result.count;
  }
}
