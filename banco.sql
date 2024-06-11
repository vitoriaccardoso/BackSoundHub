create database db_sound_hub_turma_ba;

use db_sound_hub_turma_ba;

create table tbl_usuario
(
id_usuarios int not null auto_increment primary key,
nome varchar(80) not null,
email varchar (100) not null,
senha varchar(8) not null,
data_registro varchar(10),
id_musica int,
foreign key (id_musica) references tbl_musica(id_musica)
);
ALTER TABLE `db_sound_hub_turma_ba`.`tbl_usuario` 
DROP COLUMN `data_registro`;

create table tbl_usuario_playlist(
id_usuario_playlist int primary key,
id_usuarios integer,
foreign key (id_usuarios) references tbl_usuario(id_usuarios),
id_playlist integer,
foreign key(id_playlist) references tbl_playlist(id_playlist)
);

create table tbl_usuario_musica(
id_usuario_musica int primary key,
id_usuarios integer,
foreign key (id_usuarios) references tbl_usuario(id_usuarios),
id_musica integer,
foreign key(id_musica) references tbl_musica(id_musica)
);

create table tbl_musica
(
id_musica int not null auto_increment primary key,
nome varchar(80) not null,
duracao time not null,
foto_capa varchar(200) not null,
unique key (id_musica),
unique index (id_musica),
id_playlist integer,
id_genero int,
id_album int,
foreign key (id_genero) references tbl_genero(id_genero),
foreign key (id_album) references tbl_album(id_album),
foreign key (id_playlist) references tbl_playlist (id_playlist)
);
ALTER TABLE `db_sound_hub_turma_ba`.`tbl_musica` 
DROP COLUMN `data_criacao`;

create table tbl_playlist
(
id_playlist int not null auto_increment primary key,
nome varchar(50)
);
ALTER TABLE `db_sound_hub_turma_ba`.`tbl_playlist` 
DROP COLUMN `data_criacao`;

create table tbl_playlist_musica
(
id_playlist_musica int not null auto_increment primary key,
id_playlist integer,
foreign key (id_playlist) references tbl_playlist(id_playlist),
id_musica integer,
foreign key(id_musica) references tbl_musica(id_musica)
);

create table tbl_album
(
id_album int not null auto_increment primary key,
nome varchar(50) not null,
foto_capa varchar(20) not null,
data_lancamento varchar(10),
id_genero int,
FOREIGN KEY (id_genero) REFERENCES tbl_genero(id_genero)
);
create table tbl_artista_album
(
id_artista_album int not null auto_increment primary key,
id_artista integer,
foreign key (id_artista) references tbl_artista(id_artista),
id_album integer,
foreign key(id_album) references tbl_album(id_album)
);

create table tbl_musica_album
(
id_musica_album int not null auto_increment primary key,
id_musica integer,
foreign key (id_musica) references tbl_musica(id_musica),
id_album integer,
foreign key(id_album) references tbl_album(id_album)
);



create table tbl_artista
(
id_artista int not null auto_increment primary key,
nome varchar(80) not null,
data_nascimento varchar(10) not null,
foto_artista varchar(20) not null,

id_genero int,
FOREIGN KEY (id_genero) REFERENCES tbl_genero(id_genero)
);

create table tbl_genero
(
id_genero int not null auto_increment primary key,
nome varchar(20)
);

create table tbl_musica_genero
(
id_musica_genero int not null auto_increment primary key,
id_musica integer,
foreign key (id_musica) references tbl_musica(id_musica),
id_genero integer,
foreign key(id_genero) references tbl_genero(id_genero)
);

create table tbl_musica_artista
(
id_musica_artista int not null auto_increment primary key,
id_musica integer,
foreign key (id_musica) references tbl_musica(id_musica),
id_artista integer,
foreign key(id_artista) references tbl_artista(id_artista)
);


create table tbl_musica_album
(
id_musica_album int not null auto_increment primary key,
id_musica integer,
foreign key (id_musica) references tbl_musica(id_musica),
id_album integer,
foreign key(id_album) references tbl_album(id_album)
);




select * from tbl_musica;



insert into tbl_musica(nome, duracao, foto_capa, URL)values
("areçigkuha",
 "2:00" ,
 "https://m.media-amazon.com/images/I/713xBiQEdHL._AC_UF1000,1000_QL80_.jpg",
"https://www.youtube.com/watch?v=fLexgOxsZu0&list=RDfLexgOxsZu0&start_radio=1");

DELETE FROM tbl_musica;



insert into tbl_genero(nome)values
("clássioco"),
("ópera"),
("Ópera"),
("Pop"),
("Rock"),
("Blues"),
("Jazz"),
("R&B"),
("Soul"),
("Rap"),
("Funk"),
("Reggae"),
("Gospel"),
("Samba"),
("Forró"),
("K-Pop"),
("Trap");

select * from tbl_album;

insert into tbl_album (nome, foto_capa, data_lancamento)values
("abcde", "http:", "21/05/2006"),
("aaaaa", "http:", "21/05/2006"),
("bbbbb", "http:", "21/05/2006"),
("ccccc", "http:", "21/05/2006"),
("ddddd", "http:", "21/05/2006"),
("eeeee", "http:", "21/05/2006"),
("fffff", "http:", "21/05/2006"),
("ggggg", "http:", "21/05/2006"),
("hhhhh", "http:", "21/05/2006");

insert into tbl_artista (nome, data_nascimento, foto_artista)values
("Dfideliz", "25/05/1999", "http:****"),
("the weeknd", "16/02/1990", "http:****"),
("Drake", "24/10/1986", "http:****");

select * from tbl_usuario;

insert into tbl_playlist(nome, data_criacao)values
("1#", "21/05/2014"),
("2#", "21/05/2014"),
("3#", "21/05/2014"),
("4#", "21/05/2014"),
("5#", "21/05/2014");

insert into tbl_usuario (nome, email, senha, data_registro)values
("Pedro", "fulano@gmail.com", "1234", "21/05/1024"),
("Ana", "ana@gmail.com", "1234", "21/05/2024"),
("Levi", "levi@gmail.com", "1234", "21/05/2024"),
("davi", "davi@gmail.com", "1234", "21/05/2024");

drop database db_sound_hub_turma_ba;