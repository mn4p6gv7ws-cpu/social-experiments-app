# Social Experiments App

A comprehensive full-stack platform for designing, running, and analyzing social experiments. This application supports experiment creators, researchers, and participants in conducting behavioral psychology and crowdsourced citizen science experiments.

## Features

### For Participants
- Discover and browse available experiments
- Join experiments and complete tasks
- Track participation history
- View results and insights
- User dashboard with progress tracking

### For Researchers/Creators
- Create custom experiments with multiple question types
- Design experiment flow and logic
- Set participation requirements
- Real-time result monitoring
- Advanced analytics and visualizations
- Export data for analysis

### For Administrators
- Manage users and experiments
- Monitor platform activity
- View comprehensive analytics
- Manage experiment categories and tags
- System configuration and settings

## Technology Stack

- **Backend:** Node.js, Express.js, PostgreSQL
- **Frontend:** React 18, TypeScript, Redux, Material-UI
- **Mobile:** React Native, TypeScript
- **Real-time:** WebSockets (Socket.io)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Docker, Docker Compose
- **CI/CD:** GitHub Actions

## Project Structure

```
social-experiments-app/
├── server/                          # Backend API
│   ├── config/                      # Configuration files
│   ├── models/                      # Database models
│   ├── controllers/                 # Request handlers
│   ├── routes/                      # API routes
│   ├── middleware/                  # Express middleware
│   ├── database/                    # DB schema & migrations
│   ├── services/                    # Business logic
│   └── server.js                    # Entry point
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API client
│   │   ├── hooks/                   # Custom hooks
│   │   ├── types/                   # TypeScript types
│   │   ├── store/                   # Redux store
│   │   └── App.tsx                  # Root component
│   └── package.json
├── mobile/                          # React Native app
│   ├── src/
│   │   ├── screens/                 # App screens
│   │   ├── navigation/              # Navigation setup
│   │   ├── services/                # Shared services
│   │   └── types/                   # TypeScript types
│   └── package.json
├── .github/workflows/               # CI/CD workflows
├── docker-compose.yml               # Local development setup
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## Getting Started

### Prerequisites
- Node.js 16+
- Docker & Docker Compose (optional, for containerized setup)
- PostgreSQL 12+ (if running without Docker)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mn4p6gv7ws-cpu/social-experiments-app.git
   cd social-experiments-app
   ```

2. **Install dependencies:**
   ```bash
   # Backend
   cd server
   npm install
   cd ..
   
   # Frontend
   cd client
   npm install
   cd ..
   
   # Mobile
   cd mobile
   npm install
   cd ..
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/social_experiments
   
   # Server
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   
   # Frontend
   REACT_APP_API_URL=http://localhost:5000
   
   # Email (optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_password
   ```

### Running the Application

#### Option 1: Using Docker Compose (Recommended)
```bash
docker-compose up
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 5000
- Frontend on port 3000

#### Option 2: Running Locally

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm start
```

**Terminal 3 - Mobile (optional):**
```bash
cd mobile
npm install
npm start
```

### Access the Application
- **Frontend:** http://localhost:3000
- **API:** http://localhost:5000
- **API Docs:** http://localhost:5000/api/docs

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Experiments Endpoints
- `GET /api/experiments` - List all experiments
- `GET /api/experiments/:id` - Get experiment details
- `POST /api/experiments` - Create new experiment
- `PUT /api/experiments/:id` - Update experiment
- `DELETE /api/experiments/:id` - Delete experiment
- `POST /api/experiments/:id/join` - Join experiment
- `POST /api/experiments/:id/leave` - Leave experiment

### Results Endpoints
- `GET /api/results/experiments/:id` - Get experiment results
- `GET /api/results/my-results` - Get user's results
- `POST /api/results` - Submit experiment result
- `GET /api/results/analytics/:id` - Get analytics for experiment

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/experiments` - Get user's experiments
- `GET /api/users/participation` - Get user's participation history

## Database Schema

### Users Table
```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- firstName (VARCHAR)
- lastName (VARCHAR)
- avatar (VARCHAR)
- bio (TEXT)
- role (ENUM: user, researcher, admin)
- isVerified (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Experiments Table
```sql
- id (UUID, PK)
- creatorId (UUID, FK)
- title (VARCHAR)
- description (TEXT)
- category (VARCHAR)
- status (ENUM: draft, active, paused, completed)
- questions (JSONB)
- startDate (TIMESTAMP)
- endDate (TIMESTAMP)
- maxParticipants (INTEGER)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Participation Table
```sql
- id (UUID, PK)
- userId (UUID, FK)
- experimentId (UUID, FK)
- startedAt (TIMESTAMP)
- completedAt (TIMESTAMP)
- status (ENUM: in_progress, completed, abandoned)
- createdAt (TIMESTAMP)
```

### Results Table
```sql
- id (UUID, PK)
- participationId (UUID, FK)
- experimentId (UUID, FK)
- responses (JSONB)
- timeSpent (INTEGER)
- createdAt (TIMESTAMP)
```

## Development

### Running Tests
```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test

# Mobile tests
cd mobile && npm test
```

### Code Style
- ESLint configuration included
- Prettier for code formatting
- TypeScript strict mode enabled

### Building for Production
```bash
# Backend
cd server && npm run build

# Frontend
cd client && npm run build

# Mobile
cd mobile && npm run build
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow ESLint rules
- Write unit tests for new features
- Update documentation as needed

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Run migrations: `cd server && npm run migrate`

### Port Already in Use
- Backend (5000): `lsof -i :5000` and `kill -9 <PID>`
- Frontend (3000): `lsof -i :3000` and `kill -9 <PID>`
- DB (5432): `lsof -i :5432` and `kill -9 <PID>`

### Module Not Found Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@socialexperimentsapp.com or open an issue in the GitHub repository.

## Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app improvements
- [ ] A/B testing framework
- [ ] Integration with external platforms
- [ ] Real-time collaboration features
- [ ] Enhanced security features
- [ ] Performance optimizations