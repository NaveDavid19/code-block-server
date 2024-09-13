// config/index.ts

interface Config {
  dbURL: string
  dbName: string
  isGuestMode: boolean
}

import configProd from './prod'
import configDev from './dev'

export let config: Config

if (process.env.NODE_ENV === 'production') {
  config = configProd as Config
} else {
  config = configDev as Config
}

config.isGuestMode = true
