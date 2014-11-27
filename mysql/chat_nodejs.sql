-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 27, 2014 at 02:04 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `chat_nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_partners`
--

CREATE TABLE `chat_partners` (
  `chat_id` int(11) NOT NULL COMMENT 'user_chat id',
  `recipient_id` int(11) NOT NULL COMMENT 'user id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `email_address` varchar(512) NOT NULL,
  `creation_time` datetime NOT NULL,
  `last_activity` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email_address`, `creation_time`, `last_activity`) VALUES
(0, 'titi', 'baudin@titi.com', '2014-11-27 00:00:00', '2014-11-27 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_chat`
--

CREATE TABLE `user_chat` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL COMMENT 'user_id',
  `chat_file` varchar(1024) NOT NULL,
  `creation_time` datetime NOT NULL,
  `last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_partners`
--
ALTER TABLE `chat_partners`
 ADD KEY `chat_id` (`chat_id`,`recipient_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_chat`
--
ALTER TABLE `user_chat`
 ADD PRIMARY KEY (`id`), ADD KEY `owner_id` (`owner_id`);
