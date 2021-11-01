const devBase = 'http://127.0.0.1'

const prodBase = ''

const dev = {
  user: `${devBase}:5000`,
  blog: `${devBase}:4000`,
  comment: `${devBase}:6000`
}

const prod = {
  user: `${prodBase}/users`,
  blog: `${prodBase}/blogs`,
  comment: `${prodBase}/comment`
}


export {
  dev,
  prod  
}