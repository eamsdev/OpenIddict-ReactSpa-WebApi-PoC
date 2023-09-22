FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ResourceServer/ResourceServer.csproj", "ResourceServer/"]
RUN dotnet restore "ResourceServer/ResourceServer.csproj"
COPY . .
WORKDIR "/src/ResourceServer"
RUN dotnet build "ResourceServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ResourceServer.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ResourceServer.dll"]
