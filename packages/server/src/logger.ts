import pino from 'pino'

export default pino().child({ component: '@fireboom/server' })
