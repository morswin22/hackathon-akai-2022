import '../styles/globals.css'

import esriConfig from "@arcgis/core/config.js";
esriConfig.assetsPath = "./assets";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
