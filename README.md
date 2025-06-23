# mihotel-technical-test

Technical test for MiHotel (Lyon), where I created a mini web application to manage a private lesson listing site. The application runs on a modern UI (React.js and Tailwind CSS) and communicates with a Java / Spring boot API for all data creation, reading, modification and deletion operations.

**Technical Documentation** : https://docs.google.com/document/d/1ZmM0tvF0ePAMe2QzrT9ioMTGfZagTivl9G5OVyF6zmk/edit?usp=sharing
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
  Inclues Spring Security to configure authentication and authorization with a JWT.

---

## Architecture

The project follows the **MVC (Model-View-Controller)** architectural pattern:

- **Model**:  
  Represents the data layer with JPA entities and database (MySQL).  

- **View**:  
  The frontend React app that renders the UI and interacts with users.  

- **Controller**:  
  The Spring Boot REST controllers that handle HTTP requests and business logic.

Data flows from the frontend to the backend and persists in the database, enabling seamless CRUD operations.

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

## Running the Project

### Backend

1. Configure MySQL connection in `application.properties`.  
2. Run the backend with:  
   ```bash
   ./gradlew bootRun
