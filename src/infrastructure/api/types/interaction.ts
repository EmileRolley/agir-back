export type APIInteractionType = {
  id   : string
  type : string
  titre : string
  soustitre : string
  categorie : string
  tags         : string[]
  duree        : string
  frequence    : string
  image_url    : string
  url          : string
  seen         : boolean
  seen_at      : Date,
  clicked      : boolean
  clicked_at   : Date
  done         : boolean
  done_at      : Date
  succeeded    : boolean
  succeeded_at : Date
  difficulty   : number
  points       : number
  reco_score   : number
} 
