

## Docker Compose
For this Project, we used Docker & Docker-compose to improve the developpement workflow & deployement
#### Installation
- Install Docker and Docker Compose
- Edit your Host file and add these lines : 
  - For Windows
    >  c:\Windows\System32\Drivers\etc\hosts 
  - For Linux:
    > /etc/hosts
  ```
  127.0.0.1 rideshare.dz
  127.0.0.1 admin.rideshare.dz
  127.0.0.1 api.rideshare.dz
  ```   
- Create an external network <br>
`docker network create rideshare-network`

- To launch the server to be fully operational :  <br>
`docker-compose up --build -d`

#### Usage
- The Client frontend is acessible via [rideshare.dz](http://rideshare.dz)
- The Admin frontend is acessible via [admin.rideshare.dz](http://admin.rideshare.dz)
- The API backend is acessible via [api.rideshare.dz](http://api.rideshare.dz)




