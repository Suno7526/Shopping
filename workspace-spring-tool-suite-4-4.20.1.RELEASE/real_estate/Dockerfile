# OpenJDK 17을 기반으로 하는 경량화 스프링 부트 이미지
FROM openjdk:17-jdk-slim

# 작업 디렉토리 설정
WORKDIR /real_estate

# JAR 파일을 컨테이너에 복사(jar파일이 하나만 생기도록 설정해줘야 함.)
COPY build/libs/*.jar real_estate.jar

# 포트 설정
EXPOSE 8000

# 실행 명령어
ENTRYPOINT ["java", "-jar", "real_estate.jar"]