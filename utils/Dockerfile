# Base Dockerfile compatible with MelonRuntime v1.8.0+

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

# Will install the latest version of MelonRuntime
# Change to a specific version if required
RUN npm i melon-runtime@latest --g

# Bundling and installing packages
RUN npm i
RUN npx babel --extensions .ts ./src/ --out-dir ./babel
RUN npx webpack ./babel/index.js

# Execution script that will be in package.json
ENTRYPOINT ["npm", "run", "go"]