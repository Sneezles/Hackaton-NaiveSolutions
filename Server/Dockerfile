FROM node


# add `/app/node_modules/.bin` to $PATH
ENV PATH ./Server/node_modules/.bin:$PATH

EXPOSE 8000
# add app
COPY ./ .
RUN cd Server; npm ci

# start app
CMD ["node", "Server/index.js"]