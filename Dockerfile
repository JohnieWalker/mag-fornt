FROM alpine

ENV APP_DIR /var/www/app

RUN apk update && \
    apk add --update nodejs

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

ADD package.json ${APP_DIR}
RUN npm install

ADD . ${APP_DIR}

EXPOSE 4200

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["npm run build:prod && npm run start:prod"]
