
CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL NOT NULL,
  nome VARCHAR(45) NOT NULL,
  cpf VARCHAR(45) NOT NULL,
  email VARCHAR(45) NULL,
  senha VARCHAR(45) NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS evento (
  id SERIAL NOT NULL,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(500) NOT NULL,
  data DATE NOT NULL,
  vagas INT NOT NULL,
  hora TIME NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS inscricao (
  id SERIAL NOT NULL,
  id_usuario INT NOT NULL,
  id_evento INT NOT NULL,
  presenca CHAR(1) NULL,
  situacao CHAR(1) NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_inscricao_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  CONSTRAINT fk_inscricao_evento FOREIGN KEY (id_evento) REFERENCES evento(id));

CREATE TABLE IF NOT EXISTS certificado (
  id VARCHAR(50) NOT NULL,
  id_inscricao INT NOT NULL,
  titulo VARCHAR(200) NULL,
  descricao VARCHAR(1000) NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_certificado_inscricao FOREIGN KEY (id_inscricao) REFERENCES inscricao (id));