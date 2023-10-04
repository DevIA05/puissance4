# puissance4

## Front
Docker
`docker build -t s12_front .`

`docker run -p 3000:80 -v ./dist:/usr/share/nginx/html/dist s12_front`
volume don't work ?