# mihotel-technical-test

Technical test for MiHotel (Lyon), where I created a mini web application to manage a private lesson listing site. The application runs on a modern UI (React.js and Tailwind CSS) and communicates with a Java / Spring Boot API for all data creation, reading, modification and deletion operations.

**Technical Documentation:** https://docs.google.com/document/d/1ZmM0tvF0ePAMe2QzrT9ioMTGfZagTivl9G5OVyF6zmk/edit?usp=sharing

**API Documentation Swagger UI:** http://localhost:8080/swagger-ui/index.html

---

## Project Overview

This project consists of two main parts:

- **Frontend**:  
  Built with **React.js**, styled using **Tailwind CSS**, and **GSAP** for animations.  
  It provides a user interface to interact with private lessons listings.

- **Backend API**:  
  Developed using **Spring Boot** (Java 17).  
  Provides RESTful endpoints for CRUD operations on the data.  
  Includes OpenAPI/Swagger documentation for easy API exploration.  
  Uses Spring Security with JWT for authentication and authorization.

---

## Architecture

The project follows the **MVC (Model-View-Controller)** architectural pattern:

- **Model**:  
  Represents the data layer with JPA entities and MySQL database.

- **View**:  
  The frontend React app that renders the UI and interacts with users.

- **Controller**:  
  The Spring Boot REST controllers that handle HTTP requests and business logic.

---

## Dependencies

### Backend

- Spring Boot Starter Web  
- Spring Boot Starter Data JPA  
- MySQL Connector  
- Springdoc OpenAPI Starter WebMVC UI (Swagger UI)  
- Lombok  
- JJWT (JSON Web Token)  

### Frontend

- React.js  
- Tailwind CSS  
- GSAP (GreenSock Animation Platform)  

---

## Setup & Run Instructions (Using Docker)

This project is fully dockerized for easy setup and running. You just need to have **Docker** and **Docker Compose** installed on your machine.

1. Clone the repository
git clone https://github.com/toncompte/mihotel-technical-test.git
cd mihotel-technical-test

2. Run the application stack with Docker Compose
docker-compose up --build

 This command will:
- Launch a MySQL database container with the mihotel database automatically initialized using the provided SQL dump.
- Build and run the Spring Boot backend, configured to connect to the MySQL container.
- Build and run the React frontend, accessible via the browser.

  Access the application
Frontend UI: http://localhost:3000
Backend API Swagger UI: http://localhost:8080/swagger-ui/index.html
