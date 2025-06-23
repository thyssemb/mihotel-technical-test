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

## Setup & Run Instructions

1. Clone the repo
git clone https://github.com/toncompte/mihotel-technical-test.git
cd mihotel-technical-test

2. Database setup
 The MySQL dump is located at :
api/src/main/resources/db/database.sql

3. Create the database in MySQL :
mysql -u ton_user -p -e "CREATE DATABASE mihotel;"

4. Import the dump : 
mysql -u username -p mihotel < api/src/main/resources/db/database.sql

5. Configure backend database connection
Edit `api/src/main/resources/application.properties`:
spring.datasource.url=jdbc:mysql://localhost:3306/mihotel?useSSL=false&serverTimezone=UTC
spring.datasource.username=DBUsername
spring.datasource.password=DBPassword

6. Run the backend API
cd api
./gradlew bootRun

Backend runs at http://localhost:8080
Swagger UI: http://localhost:8080/swagger-ui/index.html

7. Run the frontend
cd ../client
npm install
npm run dev

Frontend usually runs at http://localhost:5173
