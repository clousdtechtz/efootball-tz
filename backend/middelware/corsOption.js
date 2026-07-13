const corsOptions = {
  // Hardcoded to allow your local environment AND your live GitHub Pages frontend!
  origin: [
    'http://localhost:5173', 
    'https://cloudstechz.github.io'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

export default corsOptions;
