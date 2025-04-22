# Etapa 1: Compilación (builder)
FROM eclipse-temurin:23-jdk-alpine AS builder

WORKDIR /app

# Copiamos los archivos necesarios de Maven
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Otorgamos permisos a mvnw y descargamos dependencias usando UTF‑8
RUN chmod +x mvnw && ./mvnw dependency:go-offline -Dproject.build.sourceEncoding=UTF-8 -B

# Copiamos el código fuente
COPY src src

# Compilamos el proyecto sin ejecutar tests
RUN ./mvnw package -DskipTests -Dproject.build.sourceEncoding=UTF-8 -B

# Etapa 2: Imagen final
FROM eclipse-temurin:23-jdk-alpine

WORKDIR /app

# Copiamos el JAR generado
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
