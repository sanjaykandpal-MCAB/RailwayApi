# RailwayAPI

Railway API is a Web Application which is based on Microservice Architecture instead of Monolithic architecture.

# Running Dockerized Railway API Microservices on a Different System

To run your Dockerized microservice application on a different system, follow these steps:

## 1. Ensure Docker is Installed

Make sure Docker is installed on the target system. You can install Docker by following the official [Docker installation guide](https://docs.docker.com/get-docker/).

## 2. Transfer the Docker Image

You have two options for transferring the Docker image to the target system:

**Pull the Image on the Target System:**
   - Log in to the registry on the target system:
     ```bash
     docker login your-registry
     ```
   - Pull the image:
     ```bash
     docker pull your-registry/your-service-name:latest
     ```

3. **Run the Docker Container:**
   ```bash
   docker run -p 3000:3000 your-registry/your-service-name:latest



## Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/8b6e5dda-3f83-4032-9026-414b999b324b" alt="Add" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/10399510-250d-4464-8f7f-95a10ec1e82e" alt="Read" width="400"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/01cfc169-725d-4e1b-a346-282e26427576" alt="Read2" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/ec5777f8-1f72-4b7e-8425-78d26d55e3c0" alt="Update" width="400"/></td>
  </tr>
</table>


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
