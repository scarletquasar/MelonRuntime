FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MelonJS/MelonJS.csproj", "MelonJs/"]
RUN dotnet restore "MelonJS/MelonJS.csproj"
COPY . .
WORKDIR "/src/MelonJS"
RUN dotnet build "MelonJS.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MelonJS.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MelonJS.exe"]
CMD [${PARAMS}]