CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author TEXT,
url TEXT NOT NULL,
title TEXT NOT NULL,
likes integer DEFAULT 0
);

INSERT INTO blogs (author, likes, title, url) VALUES ('Dan Abramov', 1098, 'React is cool', 'https://overreacted.io/');
INSERT INTO blogs (author, likes, title, url) VALUES ('The Primeagen', 37274, 'React is trash', 'https://twitch.tv/');