import { equal } from 'zoroaster/assert'
import Context from '../context'
import irio from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof irio, 'function')
  },
  async 'calls package without error'() {
    await irio()
  },
  async 'calls test context method'({ example }) {
    await example()
  },
}

export default T
