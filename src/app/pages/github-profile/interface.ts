export interface TypeUserProfile {
  avatar_url?: string,
  followers?: number,
  following?: number,
  login?: string,
  public_repos?: number,
  public_gists?: number,
  name?: string,
  html_url?:string,
  repos_url?: string
}
export interface TypeUserRepos{
  watchers?:number,
  forks?:number,
  name?:string,
  html_url?:string,
  full_name?:string,
  language?:string,
  description?:string
}

export interface TypeUserGist {
  description?:string,
  filename?:string,
  language?:string,
  html_url?:string
}
export interface TypeUserContributes{
  login?:string,
  avatar_url?:string,
  contributions?:number,
}
export interface TypeContrProfile{
  watchers?:number,
  forks?:number,
  html_url?:string,
  login?:string,
  name?:string,
  description?:string,
  avatar_url?:string
}

