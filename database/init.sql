CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasenia VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(100),
    fecha_registro DATE
);

CREATE TABLE empresa (
    id_empresa INT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    ubicacion VARCHAR(100),
    industria VARCHAR(100),
    tamano VARCHAR(50)
);

CREATE TABLE habilidad (
    id_habilidad INT PRIMARY KEY,
    nombre_habilidad VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE perfil (
    id_perfil INT PRIMARY KEY,
    foto VARCHAR(255),
    seguidores INT DEFAULT 0,
    estado_premium BOOLEAN DEFAULT FALSE,
    id_usuario INT UNIQUE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE profesional (
    id_usuario INT PRIMARY KEY,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE experiencia (
    id_experiencia INT PRIMARY KEY,
    cargo VARCHAR(100),
    tipo VARCHAR(40),
    trabajo_actual BOOLEAN,
    fecha_inicio DATE,
    fecha_fin DATE,
    id_usuario INT NOT NULL,
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE certificadocurso (
    id_certificado INT PRIMARY KEY,
    titulo VARCHAR(150),
    institucion VARCHAR(150),
    fecha_emision DATE,
    id_usuario INT NOT NULL,
    id_experiencia INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_experiencia) REFERENCES experiencia(id_experiencia)
);

CREATE TABLE ofertalaboral (
    id_oferta INT PRIMARY KEY,
    titulo VARCHAR(150),
    descripcion TEXT,
    salario DECIMAL(10,2),
    vacantes INT,
    tipo_contrato VARCHAR(50),
    estado_oferta VARCHAR(30),
    experiencia_minima INT,
    fecha_publicacion DATE,
    modalidad VARCHAR(50),
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE contenido (
    id_contenido INT PRIMARY KEY,
    titulo VARCHAR(150),
    descripcion TEXT,
    fecha_creacion DATE,
    id_usuario INT NOT NULL,
    id_perfil INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_perfil) REFERENCES perfil(id_perfil)
);

CREATE TABLE reclutador (
    id_usuario INT PRIMARY KEY,
    cargo VARCHAR(100),
    is_practicante BOOLEAN,
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE conecta (
    id_usuario1 INT,
    id_usuario2 INT,
    fecha DATE,
    estado VARCHAR(50),
    PRIMARY KEY(id_usuario1,id_usuario2),
    FOREIGN KEY (id_usuario1) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_usuario2) REFERENCES usuario(id_usuario),
    CHECK (id_usuario1 <> id_usuario2)
);

CREATE TABLE posee (
    id_usuario INT,
    id_habilidad INT,
    nivel VARCHAR(50),
    PRIMARY KEY(id_usuario,id_habilidad),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_habilidad) REFERENCES habilidad(id_habilidad)
);

CREATE TABLE postula (
    id_usuario INT,
    id_oferta INT,
    estado_postulacion VARCHAR(50),
    PRIMARY KEY(id_usuario,id_oferta),
    FOREIGN KEY (id_usuario) REFERENCES profesional(id_usuario),
    FOREIGN KEY (id_oferta) REFERENCES ofertalaboral(id_oferta)
);

CREATE TABLE requiere (
    id_oferta INT,
    id_habilidad INT,
    nivel_minimo VARCHAR(50),
    es_excluyente BOOLEAN,
    PRIMARY KEY(id_oferta,id_habilidad),
    FOREIGN KEY (id_oferta) REFERENCES ofertalaboral(id_oferta),
    FOREIGN KEY (id_habilidad) REFERENCES habilidad(id_habilidad)
);

CREATE TABLE gestiona (
    id_usuario INT,
    id_oferta INT,
    PRIMARY KEY(id_usuario,id_oferta),
    FOREIGN KEY (id_usuario) REFERENCES reclutador(id_usuario),
    FOREIGN KEY (id_oferta) REFERENCES ofertalaboral(id_oferta)
);

CREATE TABLE publica (
    id_usuario2 INT,
    id_usuario1 INT,
    id_contenido1 INT,
    id_perfil1 INT,
    recomienda BOOLEAN,
    comentario BOOLEAN,
    compartir BOOLEAN,
    PRIMARY KEY(id_usuario2,id_usuario1,id_contenido1,id_perfil1),
    FOREIGN KEY (id_usuario2) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_usuario1) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_contenido1) REFERENCES contenido(id_contenido),
    FOREIGN KEY (id_perfil1) REFERENCES perfil(id_perfil)
);

CREATE OR REPLACE FUNCTION validar_postulacion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_estado   ofertalaboral.estado_oferta%TYPE;
    v_vacantes ofertalaboral.vacantes%TYPE;
BEGIN
    SELECT estado_oferta, vacantes
    INTO v_estado, v_vacantes
    FROM ofertalaboral
    WHERE id_oferta = NEW.id_oferta;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'La oferta laboral % no existe.', NEW.id_oferta;
    END IF;

    IF v_estado <> 'Activa' THEN
        RAISE EXCEPTION 'La oferta laboral % no se encuentra activa.', NEW.id_oferta;
    END IF;

    IF v_vacantes <= 0 THEN
        RAISE EXCEPTION 'La oferta laboral % ya no tiene vacantes disponibles.', NEW.id_oferta;
    END IF;

    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION actualizar_vacantes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_vacantes ofertalaboral.vacantes%TYPE;
BEGIN
    UPDATE ofertalaboral
    SET vacantes = vacantes - 1
    WHERE id_oferta = NEW.id_oferta;

    SELECT vacantes
    INTO v_vacantes
    FROM ofertalaboral
    WHERE id_oferta = NEW.id_oferta;

    IF v_vacantes = 0 THEN
        UPDATE ofertalaboral
        SET estado_oferta = 'Cerrada'
        WHERE id_oferta = NEW.id_oferta;
    END IF;

    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION crear_perfil_automatico()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_perfil perfil.id_perfil%TYPE;
BEGIN
    SELECT COALESCE(MAX(id_perfil), 0) + 1
    INTO v_id_perfil
    FROM perfil;

    INSERT INTO perfil (
        id_perfil,
        seguidores,
        estado_premium,
        id_usuario,
        foto
    )
    VALUES (
        v_id_perfil,
        0,
        FALSE,
        NEW.id_usuario,
        NULL
    );

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validar_postulacion
BEFORE INSERT ON postula
FOR EACH ROW
EXECUTE FUNCTION validar_postulacion();

CREATE TRIGGER trg_actualizar_vacantes
AFTER INSERT ON postula
FOR EACH ROW
EXECUTE FUNCTION actualizar_vacantes();

CREATE TRIGGER trg_crear_perfil_automatico
AFTER INSERT ON usuario
FOR EACH ROW
EXECUTE FUNCTION crear_perfil_automatico();

ALTER TABLE postula DISABLE TRIGGER trg_validar_postulacion;
ALTER TABLE postula DISABLE TRIGGER trg_actualizar_vacantes;
ALTER TABLE usuario DISABLE TRIGGER trg_crear_perfil_automatico;

\copy usuario FROM '/docker-entrypoint-initdb.d/data/usuario.csv' WITH (FORMAT csv, HEADER true)
\copy empresa FROM '/docker-entrypoint-initdb.d/data/empresa.csv' WITH (FORMAT csv, HEADER true)
\copy habilidad FROM '/docker-entrypoint-initdb.d/data/habilidad.csv' WITH (FORMAT csv, HEADER true)
\copy perfil FROM '/docker-entrypoint-initdb.d/data/perfil.csv' WITH (FORMAT csv, HEADER true)
\copy profesional FROM '/docker-entrypoint-initdb.d/data/profesional.csv' WITH (FORMAT csv, HEADER true)
\copy experiencia FROM '/docker-entrypoint-initdb.d/data/experiencia.csv' WITH (FORMAT csv, HEADER true)
\copy certificadocurso FROM '/docker-entrypoint-initdb.d/data/certificadocurso.csv' WITH (FORMAT csv, HEADER true)
\copy ofertalaboral FROM '/docker-entrypoint-initdb.d/data/ofertalaboral.csv' WITH (FORMAT csv, HEADER true)
\copy contenido FROM '/docker-entrypoint-initdb.d/data/contenido.csv' WITH (FORMAT csv, HEADER true)
\copy reclutador FROM '/docker-entrypoint-initdb.d/data/reclutador.csv' WITH (FORMAT csv, HEADER true)
\copy conecta FROM '/docker-entrypoint-initdb.d/data/conecta.csv' WITH (FORMAT csv, HEADER true)
\copy posee FROM '/docker-entrypoint-initdb.d/data/posee.csv' WITH (FORMAT csv, HEADER true)
\copy postula FROM '/docker-entrypoint-initdb.d/data/postula.csv' WITH (FORMAT csv, HEADER true)
\copy requiere FROM '/docker-entrypoint-initdb.d/data/requiere.csv' WITH (FORMAT csv, HEADER true)
\copy gestiona FROM '/docker-entrypoint-initdb.d/data/gestiona.csv' WITH (FORMAT csv, HEADER true)
\copy publica FROM '/docker-entrypoint-initdb.d/data/publica.csv' WITH (FORMAT csv, HEADER true)

ALTER TABLE postula ENABLE TRIGGER trg_validar_postulacion;
ALTER TABLE postula ENABLE TRIGGER trg_actualizar_vacantes;
ALTER TABLE usuario ENABLE TRIGGER trg_crear_perfil_automatico;

CREATE VIEW vw_ofertas_activas AS
SELECT
    o.id_oferta,
    o.titulo,
    e.nombre AS empresa,
    o.salario,
    o.vacantes,
    o.modalidad,
    o.tipo_contrato,
    o.experiencia_minima,
    o.fecha_publicacion
FROM ofertalaboral o
JOIN empresa e
    ON o.id_empresa = e.id_empresa
WHERE o.estado_oferta = 'Activa';

CREATE INDEX idx_requiere_oferta_habilidad ON requiere(id_oferta,id_habilidad);
CREATE INDEX idx_posee_habilidad_usuario ON posee(id_habilidad,id_usuario);
CREATE INDEX idx_empresa_industria ON empresa(industria);
CREATE INDEX idx_oferta_empresa ON ofertalaboral(id_empresa);
CREATE INDEX idx_requiere_oferta ON requiere(id_oferta);
CREATE INDEX idx_conecta_usuario2 ON conecta(id_usuario2);
CREATE INDEX idx_gestiona_usuario ON gestiona(id_usuario);
CREATE INDEX idx_postula_usuario_oferta ON postula(id_usuario,id_oferta);
CREATE INDEX idx_experiencia_usuario ON experiencia(id_usuario);
CREATE INDEX idx_posee_usuario ON posee(id_usuario);
CREATE INDEX idx_conecta_usuario1 ON conecta(id_usuario1);
CREATE INDEX idx_certificado_usuario ON certificadocurso(id_usuario);
