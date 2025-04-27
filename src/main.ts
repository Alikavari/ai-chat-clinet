import './assets/main.css';
import '../node_modules/flowbite-vue/dist/index.css';

import {createApp} from 'vue';
import {createPinia} from 'pinia';

import {WagmiPlugin} from '@wagmi/vue';
import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query';
import {wagmiAdapter} from './config/index';
import {type WagmiPluginOptions} from '@wagmi/vue';

import App from './App.vue';
const queryClient = new QueryClient();
const app = createApp(App);

app.use(createPinia());

//app.use(WagmiPlugin, {config: wagmiAdapter.wagmiConfig});
const wagmi_plugin_options = {config: wagmiAdapter.wagmiConfig} as WagmiPluginOptions;
app.use(WagmiPlugin, wagmi_plugin_options);

app.use(VueQueryPlugin, {queryClient});

app.mount('#app');
