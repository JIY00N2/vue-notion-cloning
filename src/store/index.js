import { createStore } from '~/store';
import message from './message';

export default createStorage({
  modules: {
    message,
  },
});
