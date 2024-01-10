import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { InteractionsUsecase } from '../../usecase/interactions.usecase';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InteractionAPI } from './types/interaction/interactionAPI';
import { AuthGuard } from '../auth/guard';
import { GenericControler } from './genericControler';

@Controller()
@ApiBearerAuth()
@ApiTags('Interactions')
export class InteractionsController extends GenericControler {
  constructor(private readonly interactionsUsecase: InteractionsUsecase) {
    super();
  }

  @Get('utilisateurs/:id/interactions')
  @ApiOkResponse({ type: [InteractionAPI] })
  @UseGuards(AuthGuard)
  async getUserInteractions(
    @Request() req,
    @Param('id') id: string,
  ): Promise<InteractionAPI[]> {
    this.checkCallerId(req, id);

    const list = await this.interactionsUsecase.listInteractions(id);
    return list.map((inter) => {
      const new_inter = new InteractionAPI();
      Object.assign(new_inter, inter);
      return new_inter;
    });
  }
}
