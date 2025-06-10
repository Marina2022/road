module.exports = {
  // experimental: {
  //   staleTimes: {
  //     dynamic: 30
  //   }
  // },

  experimental: {
    serverActions: {
      bodySizeLimit: "4mb"
    }
  },


  reactStrictMode: false,
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};


