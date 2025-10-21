# LondonHomeRent.com

A modern, full-stack rental property portal for London. Find your perfect home with expert guidance and local insights.

## 🚀 Features

- **Property Search & Listings**: Browse and search rental properties across London
- **Borough Guides**: Comprehensive guides for all 32 London boroughs
- **Neighborhood Insights**: Detailed information about London neighborhoods
- **Lead Generation**: Connect interested renters with agents
- **Premium Listings**: Paid listings for real estate agents
- **User Authentication**: Secure login with Manus OAuth
- **Responsive Design**: Works perfectly on all devices
- **SEO Optimized**: Built for search engine visibility
- **Analytics**: Track user behavior and conversions

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI framework
- **Tailwind CSS 4**: Utility-first styling
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool
- **shadcn/ui**: Beautiful UI components

### Backend
- **Node.js 22**: JavaScript runtime
- **Express.js 4**: Web framework
- **tRPC 11**: Type-safe APIs
- **TypeScript**: Type-safe backend

### Database
- **MySQL 8**: Relational database
- **Drizzle ORM**: Type-safe queries

### Authentication
- **Manus OAuth**: Secure authentication
- **JWT**: Session management

## 📋 Prerequisites

- Node.js 18+ ([nodejs.org](https://nodejs.org))
- pnpm 10+ (`npm install -g pnpm`)
- MySQL 8+ ([mysql.com](https://mysql.com))
- Git ([git-scm.com](https://git-scm.com))

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/london_home_rent.git
cd london_home_rent
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 4. Set Up Database

```bash
mysql -u root -p
CREATE DATABASE london_home_rent;
EXIT;

pnpm db:push
```

### 5. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser.

## 📦 Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Building
pnpm build            # Build for production
pnpm check            # Check TypeScript types

# Database
pnpm db:push          # Run migrations

# Code Quality
pnpm format           # Format code with Prettier
pnpm test             # Run tests

# Production
pnpm start            # Start production server
```

## 🌐 Deployment

### Railway.app (Recommended)

See `DEPLOYMENT_RAILWAY.md` for detailed instructions.

**Quick Steps:**
1. Push to GitHub
2. Create Railway project
3. Connect GitHub repository
4. Add environment variables
5. Add MySQL database
6. Deploy

**Estimated Time**: 15-20 minutes

### Render.com

See `DEPLOYMENT_RENDER.md` for detailed instructions.

**Quick Steps:**
1. Push to GitHub
2. Create Render web service
3. Configure build and start commands
4. Add environment variables
5. Create MySQL database
6. Deploy

**Estimated Time**: 20-30 minutes

### Docker

```bash
docker build -t london_home_rent .
docker run -p 3000:3000 \
  -e DATABASE_URL=mysql://user:pass@host/db \
  -e JWT_SECRET=your-secret \
  london_home_rent
```

See `COMPLETE_DEPLOYMENT_GUIDE.md` for comprehensive deployment instructions.

## 📚 Documentation

- **[Complete Deployment Guide](./COMPLETE_DEPLOYMENT_GUIDE.md)** - Full setup and deployment instructions
- **[Railway Deployment](./DEPLOYMENT_RAILWAY.md)** - Railway.app specific guide
- **[Render Deployment](./DEPLOYMENT_RENDER.md)** - Render.com specific guide
- **[SEO Strategy](./SEO_Strategy_Complete.md)** - Comprehensive SEO optimization guide
- **[Marketing Strategy](./marketing_strategy.md)** - Marketing and monetization strategy
- **[Implementation Guide](./implementation_guide.md)** - Step-by-step implementation guide

## 🏗️ Project Structure

```
london_home_rent/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities and helpers
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   └── public/            # Static assets
├── server/                # Backend Express application
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   ├── storage.ts         # S3 storage helpers
│   └── _core/             # Core server utilities
├── drizzle/               # Database schema
│   ├── schema.ts          # Table definitions
│   └── migrations/        # Database migrations
├── shared/                # Shared types and constants
├── Dockerfile             # Docker configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-super-secret-key
VITE_APP_ID=your-oauth-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# Application
VITE_APP_TITLE=LondonHomeRent.com
VITE_APP_LOGO=https://example.com/logo.png
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id

# APIs
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Server
NODE_ENV=production
PORT=3000
```

## 🎯 SEO Optimization

The application includes comprehensive SEO features:

- **Schema Markup**: RealEstateListing, LocalBusiness, FAQPage
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine crawling optimization
- **Meta Tags**: Optimized titles and descriptions
- **Internal Linking**: Strategic linking structure
- **Mobile Optimization**: Mobile-first responsive design

See `SEO_Strategy_Complete.md` for detailed SEO strategy.

## 💰 Monetization

Multiple revenue streams are built into the application:

1. **Display Advertising** - Google AdSense, 7SearchPPC
2. **Premium Listings** - Paid listings for agents (£49-199/month)
3. **Lead Generation** - Sell qualified leads to agents
4. **Affiliate Marketing** - Moving companies, insurance, utilities
5. **Digital Products** - Guides, tools, resources
6. **Sponsored Content** - Real estate brand partnerships
7. **Subscription Model** - Premium features for users

See `marketing_strategy.md` for monetization details.

## 📊 Analytics & Monitoring

The application includes built-in support for:

- **Google Analytics**: User behavior tracking
- **Google Search Console**: SEO monitoring
- **Error Tracking**: Sentry integration ready
- **Performance Monitoring**: Core Web Vitals tracking
- **Database Analytics**: Query performance monitoring

## 🔒 Security

Security features include:

- **HTTPS/SSL**: Automatic SSL certificate management
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Parameterized queries via Drizzle ORM
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Secure session cookies
- **Rate Limiting**: Ready for rate limiting middleware
- **Secure Headers**: Security headers configuration

## 🚀 Performance

Performance optimizations include:

- **Code Splitting**: Automatic code splitting with Vite
- **Image Optimization**: Lazy loading and compression
- **Caching**: Browser and server-side caching
- **Database Optimization**: Query optimization and indexing
- **CDN Ready**: Static asset CDN support
- **Compression**: Gzip compression enabled

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Troubleshooting

### Common Issues

**Application won't start:**
```bash
pnpm install
pnpm db:push
pnpm run build
pnpm start
```

**Database connection error:**
- Verify `DATABASE_URL` is correct
- Check MySQL is running
- Test connection: `mysql -h host -u user -p database`

**Build fails:**
```bash
pnpm run check  # Check TypeScript errors
rm -rf node_modules
pnpm install
pnpm run build
```

For more help, see `COMPLETE_DEPLOYMENT_GUIDE.md` troubleshooting section.

## 📞 Contact & Resources

- **Documentation**: See `/docs` directory
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@londonhomerent.com

## 🎉 Getting Started with Deployment

Ready to go live? Choose your platform:

1. **[Railway.app](./DEPLOYMENT_RAILWAY.md)** - Easiest deployment (15 min)
2. **[Render.com](./DEPLOYMENT_RENDER.md)** - Good free tier (20 min)
3. **[Docker](./COMPLETE_DEPLOYMENT_GUIDE.md)** - Full control (1-2 hours)

## 📈 Growth Roadmap

### Phase 1: Foundation (Months 1-3)
- [ ] Launch website
- [ ] Publish 50 blog posts
- [ ] Acquire 50 backlinks
- [ ] Target: 20,000 monthly visitors

### Phase 2: Growth (Months 4-6)
- [ ] Publish 100 more articles
- [ ] Acquire 100 backlinks
- [ ] Launch guest posting campaign
- [ ] Target: 50,000 monthly visitors

### Phase 3: Expansion (Months 7-9)
- [ ] Publish 50 specialized articles
- [ ] Establish local partnerships
- [ ] Implement monetization
- [ ] Target: 75,000 monthly visitors

### Phase 4: Scale (Months 10-12)
- [ ] Optimize all revenue streams
- [ ] Prepare for domain sale
- [ ] Target: 100,000+ monthly visitors
- [ ] Domain valuation: £100,000-150,000

## 🎯 Success Metrics

Track these KPIs:

| Metric | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| Organic Traffic | 20,000 | 50,000 | 100,000+ |
| Keywords (Top 10) | 100 | 200 | 400+ |
| Monthly Revenue | £1,200 | £4,600 | £12,800+ |
| Domain Authority | 15 | 25 | 35+ |
| Bounce Rate | 55% | 50% | 40% |

---

**Built with ❤️ for London renters and real estate professionals.**

**Ready to launch? Start with [COMPLETE_DEPLOYMENT_GUIDE.md](./COMPLETE_DEPLOYMENT_GUIDE.md) 🚀**

