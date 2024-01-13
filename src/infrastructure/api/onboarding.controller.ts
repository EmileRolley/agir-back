import { Body, Controller, Post, Response } from '@nestjs/common';
import { OnboardingUsecase } from '../../usecase/onboarding.usecase';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiExtraModels,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUtilisateurAPI } from './types/utilisateur/onboarding/createUtilisateurAPI';
import { OnboardingDataAPI } from './types/utilisateur/onboarding/onboardingDataAPI';
import { OnboardingDataImpactAPI } from './types/utilisateur/onboarding/onboardingDataImpactAPI';
import { HttpStatus } from '@nestjs/common';
import { LoggedUtilisateurAPI } from './types/utilisateur/loggedUtilisateurAPI';
import { ProspectSubmitAPI } from './types/utilisateur/onboarding/prospectSubmitAPI';
import { ValidateCodeAPI } from './types/utilisateur/onboarding/validateCodeAPI';
import { RenvoyerCodeAPI } from './types/utilisateur/renvoyerCodeAPI';
import { GenericControler } from './genericControler';

@ApiExtraModels(CreateUtilisateurAPI)
@Controller()
@ApiTags('Onboarding Utilisateur')
export class OnboardingController extends GenericControler {
  constructor(private readonly onboardingUsecase: OnboardingUsecase) {
    super();
  }

  @Post('utilisateurs')
  @ApiOperation({
    summary:
      "création d'un compte, qui doit ensuite être activé via la soumission d'un code",
  })
  @ApiBody({
    type: CreateUtilisateurAPI,
  })
  @ApiOkResponse({
    type: ProspectSubmitAPI,
  })
  async createUtilisateur(@Body() body: CreateUtilisateurAPI, @Response() res) {
    await this.onboardingUsecase.createUtilisateur(body);
    return res.json({
      email: body.email,
    });
  }

  @Post('utilisateurs/evaluate-onboarding')
  @ApiBody({
    type: OnboardingDataAPI,
  })
  @ApiOperation({
    summary:
      "calcul le score de l'utilisateur sur les différentes thématiques, le compare par rapport aux autres de la base",
  })
  @ApiOkResponse({
    type: OnboardingDataImpactAPI,
  })
  async evaluateOnboardingData(
    @Body() body: OnboardingDataAPI,
  ): Promise<OnboardingDataImpactAPI> {
    return this.onboardingUsecase.evaluateOnboardingData(body);
  }

  @Post('utilisateurs/valider')
  @ApiOperation({
    summary:
      "valide l'inscription de l'utilisateur d'un email donné avec en entrée un code (code reçu par email), renvoie le token de sécurité",
  })
  @ApiBody({
    type: ValidateCodeAPI,
  })
  @ApiOkResponse({
    type: LoggedUtilisateurAPI,
  })
  async validerCode(@Body() body: ValidateCodeAPI, @Response() res) {
    const loggedUser = await this.onboardingUsecase.validateCode(
      body.email,
      body.code,
    );
    const response = LoggedUtilisateurAPI.mapToAPI(
      loggedUser.token,
      loggedUser.utilisateur,
    );
    return res.status(HttpStatus.OK).json(response);
  }

  @Post('utilisateurs/renvoyer_code')
  @ApiOperation({
    summary:
      "renvoi le code de validation de l'inscription par email à l'email précisé dans la route",
  })
  @ApiBody({
    type: RenvoyerCodeAPI,
  })
  async renvoyerCode(@Body() body: RenvoyerCodeAPI, @Response() res) {
    await this.onboardingUsecase.renvoyerCode(body.email);
    return res.status(HttpStatus.OK).json('code renvoyé');
  }
}
