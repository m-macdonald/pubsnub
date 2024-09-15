CREATE TABLE user (
    id              TEXT NOT NULL PRIMARY KEY,
    username        TEXT NOT NULL,
    password_hash   TEXT NOT NULL
);

CREATE TABLE session (
    id              TEXT NOT NULL PRIMARY KEY,
    expires_at      INTEGER NOT NULL,
    user_id         TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE snub(
    id              TEXT NOT NULL PRIMARY KEY,
    snub_indicator  BOOLEAN NOT NULL CHECK (snub_indicator IN (0, 1)),
    comment         TEXT,
    insert_timestm  TIMESTAMP NOT NULL
);

CREATE TRIGGER user_max_one_record
BEFORE INSERT ON user
WHEN (SELECT COUNT(*) FROM user) >= 1
BEGIN
    SELECT RAISE(FAIL, 'Only one user is allowed');
END;