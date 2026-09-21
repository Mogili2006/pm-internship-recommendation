# Multi-stage build for PM Internship Spring Boot Backend
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Build application
COPY src ./src
RUN mvn clean package -DskipTests

# Production runtime image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080
EXPOSE 8080

# Fast startup flags for presentation readiness
ENTRYPOINT ["java", "-XX:+TieredCompilation", "-XX:TieredStopAtLevel=1", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]