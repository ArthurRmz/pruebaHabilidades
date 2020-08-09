CREATE TABLE usuarios(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nombre text COLLATE pg_catalog."default",
    rfc text COLLATE pg_catalog."default",
    direccion text COLLATE pg_catalog."default",
    telefono text COLLATE pg_catalog."default",
    website text COLLATE pg_catalog."default",
    correo text COLLATE pg_catalog."default",
    clave text COLLATE pg_catalog."default");