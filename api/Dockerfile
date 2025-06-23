# Étape 1 : builder le projet avec Gradle (build image temporaire)
FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /app

COPY build.gradle.kts settings.gradle.kts ./
COPY gradlew gradlew.bat ./
COPY gradle ./gradle
COPY src ./src

RUN ./gradlew clean build -x test --no-daemon

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar", "--server.port=8080"]
