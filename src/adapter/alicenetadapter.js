import AliceNetAdapter from 'alicenetjs-adapter';
import { aliceNetProvider } from '../config/config';

export const aliceNetAdapter = new AliceNetAdapter(aliceNetProvider);

// TODO: Should be updated and made UI friendly... Toasts?
try {
    aliceNetAdapter.init()
} catch (ex) {
    console.log(ex)
}