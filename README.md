# mi_banco
proyecto para prueba 

# base de datos
Este proyecto se lo realizo con el gestor de base de datos postgresSQL13 
- crear la base de datos con el nombre mi_banco posteriormente dentro de la carpeta db_script
encontrala el script que contiene las tablas de la  base de datos

# backend

Este fue realizado con el framework node js
- ejecutar el comando npm install 
- Dentro dela carpeta backend encontrara el los achivos necesarios 
- en el archivo server.js en la linea 76 realizar el cambio de la ip  segun su direccion de red ejecutar el comando ipconfig en el cmd
- ![imagen](https://user-images.githubusercontent.com/30697632/114262262-a06b3980-99a4-11eb-9ab8-bb07b1c28838.png)
ejemplo :

 server.listen(3000, '192.168.0.14' || 'localhost', function () {
  console.log('Application worker ' + process.pid + ' started...');
});
-en la carpeta config se encuentra un archibo llamado config.js en donde tendra que configurar los datos correspondientes al gestor de base de datos asi:
![imagen](https://user-images.githubusercontent.com/30697632/114262318-0657c100-99a5-11eb-894d-38d7b1221753.png)
-para la inicializacion del servidor ejecutar el comando node server.js


