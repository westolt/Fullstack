CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Test Guy', 'www.test.com', 'This is a test', 0);
INSERT INTO blogs (author, url, title, likes) VALUES ('Matti', 'www.mattikatti.fi', 'Matti on katti', 0);