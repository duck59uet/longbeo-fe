module.exports = {
    siteUrl: 'https://app.dichvumat.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin', '/auth'],
        },
      ],
    },
  };
  