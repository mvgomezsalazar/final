CREATE TABLE EVENTO (id BIGINT NOT NULL, FECHA VARCHAR(255), HORA INTEGER, LUGAR VARCHAR(255), NOMBRE VARCHAR(255), PRIMARY KEY (id))
CREATE TABLE SEQUENCE (SEQ_NAME VARCHAR(50) NOT NULL, SEQ_COUNT DECIMAL(15), PRIMARY KEY (SEQ_NAME))
INSERT INTO SEQUENCE(SEQ_NAME, SEQ_COUNT) values ('SEQ_GEN', 0)
