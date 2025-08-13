# AgentForce - AI Agent Employee Platform

A modern, professional website for deploying AI agents as virtual employees, built using the Appway HTML template with custom content for our SaaS platform.

## 🚀 Project Overview

This project has been restarted using the Appway HTML template as the foundation, with all content customized for our AI Agent Employee Platform. The website follows the structure and flow outlined in our original ChatGPT conversation and market research.

## 🏗 Project Structure

```
AiAGENTPLATFORM/
├── public/
│   ├── index.html              # Homepage (Landing page)
│   ├── features.html           # Features page
│   ├── pricing.html            # Pricing page (per-agent subscription)
│   ├── about.html              # About page
│   ├── contact.html            # Contact page
│   ├── dashboard.html          # Agent Command Center dashboard
│   ├── css/                    # Appway CSS files
│   ├── js/                     # Appway JavaScript files
│   ├── fonts/                  # Appway font files
│   └── images/                 # Appway images and assets
├── server.js                   # Express server to serve HTML files
├── package.json                # Dependencies and scripts
└── README-NEW.md              # This file
```

## 🎯 Pages & Features

### Homepage (`/`)
- Hero section with AI agent value proposition
- Why companies choose AgentForce
- Security and compliance features
- Feature highlights with animations
- Client testimonials
- Call-to-action sections

### Features Page (`/features`)
- Core platform features (Agent Management, Workflow Engine, Integration Layer)
- Advanced capabilities (Task Log, ROI Metrics, Multi-Agent Collaboration)
- Security and compliance information
- Enterprise-grade features

### Pricing Page (`/pricing`)
- Per-agent subscription model ($49, $99, $199 per agent/month)
- Optional add-ons (Specialized Role Packs, Premium Integrations)
- FAQ section
- Clear value proposition

### About Page (`/about`)
- Company mission and vision
- Team information
- Customer testimonials
- Company statistics

### Contact Page (`/contact`)
- Contact form with multiple subject options
- Company information
- Office location details
- Working hours

### Dashboard Page (`/dashboard`)
- Agent Command Center interface
- Agent overview cards with status and stats
- Real-time activity feed
- ROI metrics
- Quick actions and suggestions

## 💰 Business Model

Based on our original ChatGPT conversation:

### Subscription Pricing
- **Starter**: $49/agent/month (1,000 tasks, 3 integrations)
- **Professional**: $99/agent/month (5,000 tasks, 10 integrations)
- **Enterprise**: $199/agent/month (Unlimited tasks, all integrations)

### Optional Add-ons
- Specialized Role Packs: $29-$49/month
- Premium Integrations: $15-$50/month
- Extra Tasks: $10 per 1,000 additional tasks

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Appway template)
- **Backend**: Node.js with Express
- **Styling**: Appway CSS framework with custom modifications
- **Animations**: WOW.js, CSS animations
- **Icons**: Font Awesome, Flaticon
- **Server**: Express.js static file server

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AiAGENTPLATFORM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run serve
   ```

4. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

### Available Routes
- Home: http://localhost:3001/
- Features: http://localhost:3001/features
- Pricing: http://localhost:3001/pricing
- About: http://localhost:3001/about
- Contact: http://localhost:3001/contact
- Dashboard: http://localhost:3001/dashboard

## 🎨 Design System

### Colors
- **Primary**: Blue (#007bff)
- **Secondary**: Gray (#6c757d)
- **Success**: Green (#28a745)
- **Warning**: Yellow (#ffc107)
- **Danger**: Red (#dc3545)
- **Background**: Light gray (#f8f9fa)

### Typography
- **Font**: Ubuntu (Google Fonts)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good readability

### Components
- **Cards**: Elevated with shadows and hover effects
- **Buttons**: Consistent styling with hover states
- **Navigation**: Sticky header with mobile menu
- **Forms**: Clean, modern styling

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Customization

### Adding New Pages
1. Create a new HTML file in the `public/` directory
2. Add the route in `server.js`
3. Update navigation links across all pages

### Modifying Styles
- Main styles are in `public/css/style.css`
- Responsive styles in `public/css/responsive.css`
- Custom dashboard styles in `dashboard.html`

### Adding Content
- Update HTML files directly
- Images go in `public/images/`
- New CSS/JS files in respective directories

## 🚀 Deployment

### Netlify (Recommended)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set the build command to: `npm run serve`
4. Set the publish directory to: `public`
5. Deploy

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
```bash
npm run serve
```

## 📊 Performance

- **Lighthouse Score**: Optimized for all metrics
- **Core Web Vitals**: Fast loading and smooth interactions
- **Images**: Optimized and compressed
- **CSS/JS**: Minified for production

## 🔒 Security

- **HTTPS**: SSL/TLS encryption recommended
- **Content Security Policy**: Configured in headers
- **Form Validation**: Client and server-side validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the inline comments and HTML structure
- **Issues**: Report bugs via GitHub Issues
- **Contact**: hello@agentforce.ai

## 🔮 Next Steps

This website serves as the foundation for our AI Agent Employee Platform. The next phase would be to:

1. **Develop the actual SaaS platform** using the architecture outlined in our ChatGPT conversation
2. **Implement the Agent Command Center** as a real React/Next.js application
3. **Build the workflow engine** and integration layer
4. **Create the billing system** with Stripe integration
5. **Develop the agent management system** with persistent memory

## 📞 Contact

- **Website**: [agentforce.ai](https://agentforce.ai)
- **Email**: hello@agentforce.ai
- **Support**: support@agentforce.ai
- **Platform**: Global cloud-based SaaS

---

Built with ❤️ by the AgentForce team using the Appway HTML template 