import { Versioned } from '../versioned';
import { ServiceRecherche } from '../../bibliotheque_services/serviceRecherche';
import { BibliothequeServices } from '../../bibliotheque_services/bibliothequeServices';
import { ServiceRechercheID } from '../../../../src/domain/bibliotheque_services/serviceRechercheID';
import { ResultatRecherche } from '../../../../src/domain/bibliotheque_services/resultatRecherche';
import { FavorisRecherche } from 'src/domain/bibliotheque_services/favorisRecherche';

export class ResultatRecherche_v0 {
  id: string;
  titre: string;

  adresse_rue: string;
  adresse_nom_ville: string;
  adresse_code_postal: string;

  site_web: string;

  longitude: number;
  latitude: number;

  impact_carbone_kg: number;

  static map(res: ResultatRecherche): ResultatRecherche_v0 {
    return {
      titre: res.titre,
      id: res.id,
      adresse_code_postal: res.adresse_code_postal,
      adresse_nom_ville: res.adresse_nom_ville,
      adresse_rue: res.adresse_rue,
      site_web: res.site_web,
      longitude: res.longitude,
      latitude: res.latitude,
      impact_carbone_kg: res.impact_carbone_kg,
    };
  }
}

export class FavorisRecherche_v0 {
  date_ajout: Date;
  resulat_recherche: ResultatRecherche_v0;

  static map(fav: FavorisRecherche): FavorisRecherche_v0 {
    return {
      date_ajout: fav.date_ajout,
      resulat_recherche: ResultatRecherche_v0.map(fav.resulat_recherche),
    };
  }
}

export class ServiceRecherche_v0 {
  id: ServiceRechercheID;
  favoris: FavorisRecherche_v0[];
  derniere_recherche: ResultatRecherche_v0[];

  static map(service: ServiceRecherche): ServiceRecherche_v0 {
    return {
      id: service.id,
      favoris: service.favoris
        ? service.favoris.map((f) => FavorisRecherche_v0.map(f))
        : [],
      derniere_recherche: service.derniere_recherche
        ? service.derniere_recherche.map((f) => ResultatRecherche_v0.map(f))
        : [],
    };
  }
}

export class BibliothequeServices_v0 extends Versioned {
  liste_services: ServiceRecherche_v0[];

  static serialise(biblio: BibliothequeServices): BibliothequeServices_v0 {
    return {
      version: 0,
      liste_services: biblio.liste_services
        ? biblio.liste_services.map((s) => ServiceRecherche_v0.map(s))
        : [],
    };
  }
}
