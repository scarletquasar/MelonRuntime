# Base TypeScript Dockerfile compatible with Melon v2.0.1+

# Will use .NET 6
# Change to a specific version if required
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Will use Node.js v18.x.x
# Change to a specific version if required
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -yq nodejs build-essential

# Setup docker working directory
WORKDIR /docker
COPY . /docker

# Will install the latest version of Melon
# Change to a specific version if required
RUN npm i melon-runtime -g -f

# Bundling and installing packages
RUN npm i
RUN npx babel ./src/ --out-dir ./babel
RUN npx webpack ./babel/index.js
RUN npm run build

# Execution script that will be in package.json
ENTRYPOINT ["npm", "run", "run"]