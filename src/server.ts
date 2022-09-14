import app from './app';

import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT);

app.listen(PORT, () => console.log(`server running on port ${PORT}`))