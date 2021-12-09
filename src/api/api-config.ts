const devBase = "http://127.0.0.1";

const prodBase = "http://0.0.0.0";

const dev = {
  user: `${devBase}:5000`,
  blog: "https://uwu5f8dejb.execute-api.us-east-1.amazonaws.com",
  comment: `${devBase}:3000`,
};

const prod = {
  user: `${prodBase}:5000`,
  blog: `${prodBase}:8000`,
  comment: `${prodBase}:3000`,
};

export { dev, prod };
