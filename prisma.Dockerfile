#
FROM node:lts

# 
WORKDIR /prisma

# 
COPY prisma/ ./

# COPY ENV variable
COPY .env ./
# 
RUN yarn global add prisma

# 
RUN npx prisma generate dev

# 
EXPOSE 5555
CMD ["prisma", "studio"]