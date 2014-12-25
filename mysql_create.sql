
CREATE DATABASE IF NOT EXISTS db_vote_web default character set utf8;
USE db_vote_web;
CREATE TABLE IF NOT EXISTS t_vote_info (
    FUID VARCHAR(64) default NULL,
    FVoteId VARCHAR(64) default NULL,
    FTitle VARCHAR(128) default NULL,
    FOptionNum TINYINT default 0,
    FOptionDesc VARCHAR(256) default NULL,
    FOptionVoteNum VARCHAR(128) default NULL,
    FState TINYINT default 0,
    FEndTime DATETIME default now(),
    FCreateTime DATETIME default now(),
    PRIMARY KEY (FVoteId),
    KEY (FUID, FState, FOptionNum, FEndTime, FCreateTime)
);

CREATE TABLE IF NOT EXISTS t_vote_rec (
    FUID VARCHAR(64) default NULL,
    FVoteId VARCHAR(64) default NULL,
    FOptionId TINYINT default 0,
    FCreateTime DATETIME default now(),
    PRIMARY KEY (FUID, FVoteId),
    KEY (FUID, FVoteId, FOptionId, FCreateTime)
);

