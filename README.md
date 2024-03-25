> **Requerimientos**:
 - Instalar Docker
 - Instalar Node Js
-------------------------------------------------------------------------------------------------------------
## Modo Local Sin Contenedores
 # Configuración inicial por Microservicio
- Debe tener configurada la base de datos MongoDB en su sistema o crear una imagen de docker de la misma
- Cree el archivo env.yaml utilizando como base el .env.yaml.example y coloque los valores correspondientes
- Instale las dependencias utilizando el comando `npm install`

 # Desarrollo
- Para ejecutar la aplicación, utilice el comando `npm run dev`

 # Producción
- Para realizar la compilación de Typescript y generar el build (./dist), utilice el comando `npm run build`
- Para compilar y ejecutar la aplicación, utilice el comando `npm run serve` 

--------------------------------------------------------------------------------------------------------------
## Modo Local Con Contenedores
# Compilación y ejecución
- Para generar la base de datos y el app mediante contenedores de Docker, ejecute el comando en la raíz del proyecto 
`docker-compose -f docker-compose.local.yml up -d`.

--------------------------------------------------------------------------------------------------------------
## Modo Cloud Con Contenedores
# Compilación y ejecución
- Para generar la base de datos y el app mediante contenedores de Docker, ejecute el comando en la raíz del proyecto 
`docker-compose -f docker-compose.aws.yml up -d`.
