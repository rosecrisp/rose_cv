# rose_cv
My personal resume application

### Simulate a production environment locally: 
```
npm install
npm run build
npm start
```

### Build Container image
```
podman build -t resume:v3 .
```
### Run the application container locally
```
podman run -p 3000:3000 resume:v3
```

### Push image to the container registry
```
podman tag <imageid> rosebot/roseresume:<tag>
podman push rosebot/roseresume:<tag>
```
