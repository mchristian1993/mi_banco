
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username varchar(180) NULL UNIQUE,
  enabled BOOLEAN NOT NULL,
  email varchar(255) NULL UNIQUE,
  password varchar(255) NULL,
  phone varchar(80) NULL,
  identification varchar(80) NULL UNIQUE,
  type_identification varchar(80) NULL,
  age varchar null,
  address varchar(255) NULL,
  name varchar(255) NOT NULL,
  lastname varchar(255) NULL,
  last_login timestamp(0) NULL,
  session_token varchar(180) NULL,
  created_at timestamp(0) NOT NULL,
  updated_at timestamp(0) NOT NULL
);

DROP TABLE IF EXISTS bank CASCADE;

CREATE TABLE bank (
  id BIGSERIAL PRIMARY KEY,
  name varchar(255) NULL,
  created_at timestamp(0) NOT NULL,
  updated_at timestamp(0) NOT NULL
);

DROP TABLE IF EXISTS type_account;

CREATE TABLE type_account (
  id BIGSERIAL PRIMARY KEY,
  name varchar(255) NULL,
  created_at timestamp(0) NOT NULL,
  updated_at timestamp(0) NOT NULL
);

DROP TABLE IF EXISTS bank_account;

CREATE TABLE bank_account (
  id BIGSERIAL PRIMARY KEY,
  account_number integer NOT NULL UNIQUE,
  alias varchar(255) null,
  saldo FLOAT null,
  coin varchar(255) NULL,
  description varchar(255) NULL,
  enabled BOOLEAN NOT NULL,
  id_user INTEGER NOT NULL,
  id_account_type INTEGER NOT NULL,
  id_banking_entity INTEGER NOT NULL,
  created_at timestamp(0) NOT NULL,
  updated_at timestamp(0) NOT NULL,
  FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY( id_banking_entity) REFERENCES bank(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY( id_account_type) REFERENCES type_account(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS transacciones_bancarias;

CREATE TABLE transacciones_bancarias (
  id BIGSERIAL PRIMARY KEY,
  root_account BIGSERIAL not null,
  destination_account BIGSERIAL not null,
  amount float not null,
  created_at timestamp(0) NOT NULL,
  updated_at timestamp(0) NOT NULL,
   FOREIGN KEY( root_account) REFERENCES bank_account( account_number) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY(  destination_account) REFERENCES bank_account( account_number) ON UPDATE CASCADE ON DELETE CASCADE
) ;

INSERT INTO
  bank(name, created_at, updated_at)
VALUES
  (
    'BANCAMIA S.A.',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'BANCO AGRARIO',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'BANCO AV VILLAS',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'BANCO BBVA COLOMBIA S.A.',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'BANCO CAJA SOCIAL',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'BANCO DAVIVIENDA',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'BANCO POPULAR',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'BANCOLOMBIA',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'SCOTIABANK COLPATRIA',
    '2019-12-12',
    '2019-12-12'
  );

INSERT INTO
  type_account(name, created_at, updated_at)
VALUES
  (
    'CORRIENTE',
    '2019-12-12',
    '2019-12-12'
  ),
  (
    'AHORROS',
    '2019-12-12',
    '2019-12-12'
  );
