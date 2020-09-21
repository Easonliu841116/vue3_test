import { PUBLICPATH } from '../../../config'

export default function imgPath() {
  return process.env.NODE_ENV === 'production' ? `${PUBLICPATH}/static` : '/static' ;
}