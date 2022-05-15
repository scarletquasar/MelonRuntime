dotnet publish -c Release

docker build -t %1 -f MelonJS/Dockerfile .
docker create --name %2 %1
docker start %2