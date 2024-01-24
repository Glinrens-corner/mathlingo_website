FROM opensuse/tumbleweed
#I don't think git is neccessary, but this image is not yet optimized.
RUN zypper install -y npm 

# we copy the package.json into the container so
# npm can install necessary dependencies
#however for simplicty the docker compose may
# mount the whole  directory.
RUN mkdir /website_packages
ADD website/package.json /website_packages
RUN npm install --save --prefix /website_packages

# for the server we do it similar.
# this allows us to avoid reinstalling packages after every code change of the server as the image layers remain valid until package.json changes.
RUN mkdir /server_packages
ADD server/package.json /server_packages
RUN npm install --save --prefix /server_packages

ADD server /server_code 
EXPOSE 3000
WORKDIR /server_code
CMD [ "npm", "run", "dev" ] 
