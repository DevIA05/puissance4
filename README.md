# puissance4

## Front
Docker
`docker build -t s12_front .`

`docker run -p 3000:80 -v ./dist:/usr/share/nginx/html/dist s12_front`
volume don't work ?

## Back
`docker build -t s12_back .`
`docker run -p 8000:8000 s12_back`
