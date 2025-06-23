FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY build.gradle.kts settings.gradle.kts ./
COPY gradlew gradlew.bat ./
COPY gradle ./gradle
COPY src ./src

RUN ./gradlew build

EXPOSE 8080

CMD ["./gradlew", "bootRun"]
