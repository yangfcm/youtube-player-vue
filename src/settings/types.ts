export type GsiResponse = {
  client_id: string
  clientId: string
  credential: string
}

export type GsiAuthResponse = {
  access_token: string
  authuser: string
  expires_in: number
  prompt: string
  scope: string
  token_type: string
}

export enum AsyncStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FAIL = 'fail',
  SUCCESS = 'success',
}
