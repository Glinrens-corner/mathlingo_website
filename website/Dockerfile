FROM opensuse/tumbleweed
#I don't think git is neccessary, but this image is not yet optimized.
RUN zypper install -y npm &&\
    zypper install -y git

# we copy the package.json into the container so
# npm can install necessary dependencies
#however for simplicty the docker compose may
# mount the whole /src directory.
RUN mkdir /package
ADD src/keeptrack/package.json /package
WORKDIR /package
RUN npm install

EXPOSE 3000
WORKDIR /
