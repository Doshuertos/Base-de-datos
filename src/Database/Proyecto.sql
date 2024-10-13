CREATE DATABASE Proyecto;
CREATE TABLE Usuario (
    ID_Usuario SERIAL NOT NULL PRIMARY KEY, 
    Nombre varchar(30) NOT NULL ,
    Apellido varchar(30) NOT NULL,
    Rut varchar(12) NOT NULL UNIQUE,
    Correo varchar(30) NOT NULL UNIQUE,
    Telefono int NOT NULL,
    Admin bool NOT NULL,
    Contrasena varchar(30) NOT NULL
);

CREATE TABLE Raza (
    ID_Raza SERIAL NOT NULL PRIMARY KEY, 
    Tipo_Raza VARCHAR(30) NOT NULL
);

CREATE TABLE Conejos (
    ID_Conejo SERIAL NOT NULL PRIMARY KEY, 
    Nombre varchar(30) NOT NULL ,
    id_Raza int NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    Sexo varchar(10) NOT NULL,
    fecha_llegada DATE NOT NULL,
    FOREIGN KEY (id_Raza) REFERENCES Raza (ID_Raza)
);
CREATE TABLE Estado_Solicitud(
    ID_Estado SERIAL NOT NULL PRIMARY KEY, 
    Tipo_Estado varchar(30) NOT NULL,
    Descripcion TEXT NOT NULL
);
CREATE TABLE Solicitud(
    ID_Solicitud SERIAL NOT NULL PRIMARY KEY, 
    id_Conejo int NOT NULL,
    id_Usuario int NOT NULL,
    fecha_Solicitud TIMESTAMP NOT NULL,
    id_Estado int NOT NULL,
 FOREIGN KEY (id_Conejo) REFERENCES Conejos (ID_Conejo),
 FOREIGN KEY (id_Usuario) REFERENCES Usuario (ID_Usuario),
 FOREIGN KEY (id_Estado) REFERENCES Estado_Solicitud (ID_Estado)
);
/*INSERT INTO Usuario (Nombre,Apellido,Rut,Correo,Telefono,Admin,Contrasena) VALUES
('DANTE','HORTUVIA','21357574-0','Dante@gmail.com',34123123,'true','Pepe');
INSERT INTO Raza (Tipo_Raza) VALUES
('Mini_Rex'),
('Holandés_Enano'),
('Angora_Inglés'),
('Cabeza_de_León'),
('Flemish_Giant'),
('Californiano'),
('Holland_Lop'),
('Blanco de Hotot'),
('Chinchilla'),
('Belier');
INSERT INTO Estado_Solicitud (Tipo_Estado,Descripcion) VALUES
('Espera','Nuestros Administradores, no hay pondido revisar su Solicitud'),
('Rechazado','Su Solicitud lamentablemente fue rechazada'),
('Aceptada','Su Solicitud Fue Aceptada uno de nuestro administradores se pondra en contacto con usted');*/


Select Raza.Tipo_Raza,t3.count
from (select max(count) 
from(select count(*) from Conejos group by Conejos.id_Raza) as t1) as t2
join (select count(*),Conejos.id_Raza from Conejos group by Conejos.id_Raza) as t3 on
t3.count = t2.max join Raza on t3.id_Raza = Raza.ID_Raza;

Select Usuario.nombre,Usuario.Apellido,Solicitud.ID_Solicitud,Estado_Solicitud.Descripcion 
from Usuario 
join Solicitud 
on Usuario.ID_Usuario = Solicitud.id_Usuario 
join Estado_Solicitud 
on Estado_Solicitud.ID_Estado = Solicitud.id_Estado;

