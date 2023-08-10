import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Query,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard';
import { UtilisateurRepository } from '../../../src/infrastructure/repository/utilisateur.repository';

@Controller()
export class HelloworldController {
  constructor(
    private jwtService: JwtService,
    private utilisateurRepository: UtilisateurRepository,
  ) {}

  code_verifier: string;
  state: string;
  nonce: string;
  idtoken: string;

  @Get()
  @ApiExcludeEndpoint()
  async getHello() {
    return "<br><a href='/login'>Se connecter avec France Connect</a>";
  }

  @Get('login')
  @Redirect()
  @ApiExcludeEndpoint()
  async login() {
    this.nonce = uuidv4();
    this.state = uuidv4();

    let url2 = new URL(process.env.OIDC_URL_AUTH);
    let params = url2.searchParams;
    params.append('response_type', 'code');
    params.append('client_id', process.env.OIDC_CLIENT_ID);
    params.append(
      'redirect_uri',
      process.env.BASE_URL.concat(
        process.env.OIDC_URL_LOGIN_CALLBACK,
        '?loginid=123',
      ),
    );
    params.append('scope', 'email profile');
    params.append('state', this.state);
    params.append('nonce', this.nonce);
    console.log(url2);
    return { url: url2 };
  }

  @Get('login-callback')
  @Redirect()
  @ApiExcludeEndpoint()
  async login_callback(
    @Req() req: Request,
    @Query('code') oidc_code: string,
    @Query('loginid') loginid: string,
  ) {
    console.log(req.url);
    let response;
    try {
      response = await axios.post(process.env.OIDC_URL_TOKEN, {
        grant_type: 'authorization_code',
        redirect_uri: process.env.BASE_URL.concat(
          process.env.OIDC_URL_LOGIN_CALLBACK,
          '?loginid=123',
        ),
        code: oidc_code,
        client_id: process.env.OIDC_CLIENT_ID,
        client_secret: process.env.OIDC_CLIENT_SECRET,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    this.idtoken = response.data.id_token;
    let response2;
    try {
      response2 = await axios.get(process.env.OIDC_URL_INFO, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });
      console.log(response2.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    let utilisateurId = '123';
    const payload = { utilisateurId };
    let token = await this.jwtService.signAsync(payload);
    return {
      url: process.env.BASE_URL.concat(
        `/welcome?utilisateurId=${utilisateurId}&token=${token}`,
      ),
    };
  }

  @Get('welcome')
  @ApiExcludeEndpoint()
  async welcome(
    @Query('token') token: string,
    @Query('utilisateurId') utilisateurId: string,
  ) {
    return `<br>Bonjour ${utilisateurId} (token : ${token})<br>
    <a href='/logout'>Se dé-connecter de France Connect</a>`;
  }

  @Get('profile/:id')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  async profile(@Req() req: Request, @Param('id') utilisateurId: string) {
    if (utilisateurId !== req['tokenUtilisateurId']) {
      throw new ForbiddenException(
        `Vous n'avez pas le droit de consulter les données de l'utilisateur ${utilisateurId} `,
      );
    }
    return this.utilisateurRepository.findUtilisateurById(utilisateurId);
  }

  @Get('logout')
  @Redirect()
  @ApiExcludeEndpoint()
  async logout() {
    let url2 = new URL(process.env.OIDC_URL_LOGOUT);
    let params = url2.searchParams;
    params.append('id_token_hint', this.idtoken);
    params.append('state', this.state);
    params.append(
      'post_logout_redirect_uri',
      process.env.BASE_URL.concat(process.env.OIDC_URL_LOGOUT_CALLBACK),
    );
    console.log(url2);
    return { url: url2 };
  }

  @Get('logout-callback')
  @ApiExcludeEndpoint()
  async logout_callback() {
    return `<br>Vous êtes bien déconnecté !!
    <br><a href='/login'>Se connecter avec France Connect</a>`;
  }
}
