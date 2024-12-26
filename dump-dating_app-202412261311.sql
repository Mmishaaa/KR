--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-12-26 13:11:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 847 (class 1247 OID 34665)
-- Name: enum_subscriptions_subscriptionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_subscriptions_subscriptionType" AS ENUM (
    'BASIC',
    'PREMIUM'
);


ALTER TYPE public."enum_subscriptions_subscriptionType" OWNER TO postgres;

--
-- TOC entry 853 (class 1247 OID 34675)
-- Name: enum_users_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_gender AS ENUM (
    'NonSpecified',
    'Male',
    'Female',
    'Other'
);


ALTER TYPE public.enum_users_gender OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 34755)
-- Name: ChatUsers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ChatUsers" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" uuid NOT NULL,
    "chatId" uuid NOT NULL
);


ALTER TABLE public."ChatUsers" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 34699)
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 34745)
-- Name: coordinates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coordinates (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    lat double precision NOT NULL,
    lng double precision NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.coordinates OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 34719)
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id uuid NOT NULL,
    "senderId" uuid NOT NULL,
    "receiverId" uuid NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 34704)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id uuid NOT NULL,
    text character varying(255) NOT NULL,
    "chatId" uuid NOT NULL,
    "senderId" uuid NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 34734)
-- Name: photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photos (
    id uuid NOT NULL,
    "photoURL" character varying(255) NOT NULL,
    "isAvatar" boolean DEFAULT false,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.photos OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 34669)
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid NOT NULL,
    "subscriptionType" public."enum_subscriptions_subscriptionType" NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 34683)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    description character varying(255),
    age integer,
    password character varying(255),
    gender public.enum_users_gender DEFAULT 'NonSpecified'::public.enum_users_gender NOT NULL,
    "subscriptionId" uuid NOT NULL,
    role character varying(255) DEFAULT 'USER'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4901 (class 0 OID 34755)
-- Dependencies: 222
-- Data for Name: ChatUsers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ChatUsers" VALUES ('2024-12-26 12:28:10.018+03', '2024-12-26 12:28:10.018+03', '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', '7ec2b180-acab-490e-a7b6-3f4599fd2945');
INSERT INTO public."ChatUsers" VALUES ('2024-12-26 12:28:10.018+03', '2024-12-26 12:28:10.018+03', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '7ec2b180-acab-490e-a7b6-3f4599fd2945');
INSERT INTO public."ChatUsers" VALUES ('2024-12-26 12:58:09.92+03', '2024-12-26 12:58:09.92+03', 'f931bd07-b3c6-4401-bef5-e78e8d1d4c12', 'cece9dd4-71f1-4748-9f8a-aeffd3d1322c');
INSERT INTO public."ChatUsers" VALUES ('2024-12-26 12:58:09.92+03', '2024-12-26 12:58:09.92+03', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', 'cece9dd4-71f1-4748-9f8a-aeffd3d1322c');
INSERT INTO public."ChatUsers" VALUES ('2024-12-26 12:59:57.539+03', '2024-12-26 12:59:57.539+03', '7fc869d6-687f-4581-bdaf-fbbf7b85ccab', '1ac1b9bd-93e7-451c-907c-4777f1602267');
INSERT INTO public."ChatUsers" VALUES ('2024-12-26 12:59:57.539+03', '2024-12-26 12:59:57.539+03', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '1ac1b9bd-93e7-451c-907c-4777f1602267');


--
-- TOC entry 4896 (class 0 OID 34699)
-- Dependencies: 217
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.chats VALUES ('7ec2b180-acab-490e-a7b6-3f4599fd2945', '2024-12-26 12:28:10.01+03', '2024-12-26 12:28:10.01+03');
INSERT INTO public.chats VALUES ('cece9dd4-71f1-4748-9f8a-aeffd3d1322c', '2024-12-26 12:58:09.913+03', '2024-12-26 12:58:09.913+03');
INSERT INTO public.chats VALUES ('1ac1b9bd-93e7-451c-907c-4777f1602267', '2024-12-26 12:59:57.534+03', '2024-12-26 12:59:57.534+03');


--
-- TOC entry 4900 (class 0 OID 34745)
-- Dependencies: 221
-- Data for Name: coordinates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.coordinates VALUES ('1b34ef35-3ccc-498f-9871-0ffc24f07bfc', 'Беларусь, Могилёв, улица Лысенко', 53.90517883223231, 30.324226100722406, 'e915c51a-db4b-4cd3-a281-fb26425431e8', '2024-12-26 12:05:00.596+03', '2024-12-26 12:05:00.596+03');
INSERT INTO public.coordinates VALUES ('31216045-0b5d-4708-a130-7fbe7a72d21f', 'Беларусь, Могилёв, посёлок Загорский', 53.909638708832034, 30.279765804091536, '63279bef-2fe9-4479-9e59-677103f6e49f', '2024-12-26 12:06:34.529+03', '2024-12-26 12:06:34.529+03');
INSERT INTO public.coordinates VALUES ('87bbaf10-90ff-4c11-ad64-c3b6abbfb0e9', 'Беларусь, Могилёвский район, Буйничский сельсовет, деревня Тишовка, Центральная улица, 63', 53.892201925329985, 30.25229998377903, 'efda3bcb-ea81-4763-8583-e3a335d724c7', '2024-12-26 12:07:14.962+03', '2024-12-26 12:07:14.962+03');
INSERT INTO public.coordinates VALUES ('277b3582-eaf7-4629-9cee-58fc68c0332a', 'Беларусь, Могилёвский район, Полыковичский сельсовет', 53.93031006799372, 30.39374895838843, 'bc225c65-bb0b-4e35-bc73-7a1b966f6dc0', '2024-12-26 12:07:45.961+03', '2024-12-26 12:07:45.961+03');
INSERT INTO public.coordinates VALUES ('0e10d5db-ae81-4e36-98b1-ae050f0abbd3', 'Беларусь, Могилёвский район, Буйничский сельсовет', 53.87151160983356, 30.265346248427473, '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', '2024-12-26 12:08:11.178+03', '2024-12-26 12:08:11.178+03');
INSERT INTO public.coordinates VALUES ('01fd4c97-7d2c-437b-9737-cba90fb12d77', 'Беларусь, Могилёвский район, Буйничский сельсовет, деревня Тишовка, 2-й Садовый переулок', 53.892201925329985, 30.26465960291966, '8651e9c5-fe7b-4b8c-a0a1-88225410dcbb', '2024-12-26 12:09:21.801+03', '2024-12-26 12:09:21.801+03');
INSERT INTO public.coordinates VALUES ('aae56ba1-82ad-48d9-b918-95597129107f', 'Беларусь, Могилёвский район, Буйничский сельсовет, деревня Тишовка', 53.831724867210305, 30.401988704482164, 'f931bd07-b3c6-4401-bef5-e78e8d1d4c12', '2024-12-26 12:09:46.678+03', '2024-12-26 12:09:46.678+03');
INSERT INTO public.coordinates VALUES ('3b5be982-60c1-45e9-98b0-9cd66caebab3', 'Беларусь, Могилёвский район, Полыковичский сельсовет', 53.9610953707825, 30.37520952967747, 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:10:13.969+03', '2024-12-26 12:10:13.969+03');
INSERT INTO public.coordinates VALUES ('500137c0-7221-451d-b453-47d8951a656e', 'Беларусь, Могилёвский район, Княжицкий сельсовет', 53.954211166550124, 30.202174887902167, '7fc869d6-687f-4581-bdaf-fbbf7b85ccab', '2024-12-26 12:38:36.941+03', '2024-12-26 12:38:36.941+03');
INSERT INTO public.coordinates VALUES ('ea8f9a96-8871-4a60-92c2-678a0fb0e6b0', 'Беларусь, Могилёвский район, Мостокский сельсовет', 53.94286998760118, 30.45280049825373, 'b2472329-a51a-4282-aada-672ec0b43bcd', '2024-12-26 12:39:33.383+03', '2024-12-26 12:39:33.383+03');
INSERT INTO public.coordinates VALUES ('5bc95cf3-bc7b-43a5-aa70-d402ecdb3262', 'Беларусь, Могилёвский район, Княжицкий сельсовет', 53.96676385798705, 30.178142295128744, 'f255a6fd-82f6-4e4c-9d1c-40f3823c52e1', '2024-12-26 12:40:42.065+03', '2024-12-26 12:40:42.065+03');
INSERT INTO public.coordinates VALUES ('87b13cc0-fc88-4089-a9a9-4d7f2c09b274', 'Беларусь, Могилёвский район, Пашковский сельсовет', 53.95907072337788, 30.233760581261542, '9f1c6d8d-99e8-42c2-911b-2944b35d5efc', '2024-12-26 12:49:00.283+03', '2024-12-26 12:49:00.283+03');
INSERT INTO public.coordinates VALUES ('73bf4df3-49f8-492f-a57b-6092092a3cff', 'Соединённые Штаты Америки, штат Флорида, округ Майами-Дейд, Dadeland Mall Cir N', 25.691853681342035, -80.3147928855354, 'd521c35c-609d-44c6-b846-939b3b8ff3f9', '2024-12-26 12:51:22.514+03', '2024-12-26 12:51:22.514+03');
INSERT INTO public.coordinates VALUES ('c8af1ac9-774c-4cd4-8d0c-f3fb60c37135', 'Беларусь, Могилёвский район, Вейнянский сельсовет', 53.83369716301266, 30.404045304906095, '7213c6bd-1327-4405-aaab-67bea7870430', '2024-12-26 12:53:02.347+03', '2024-12-26 12:53:02.347+03');


--
-- TOC entry 4898 (class 0 OID 34719)
-- Dependencies: 219
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.likes VALUES ('d7975fec-3a31-42a6-aad8-33fa2faba56b', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', '2024-12-26 12:27:02.19+03', '2024-12-26 12:27:02.191+03');
INSERT INTO public.likes VALUES ('bd5fc3f5-ca68-4180-bd7a-de234d2e7be6', '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:28:10+03', '2024-12-26 12:28:10+03');
INSERT INTO public.likes VALUES ('20e3389e-c0a5-4faa-925a-496f6b14f8e9', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', 'f931bd07-b3c6-4401-bef5-e78e8d1d4c12', '2024-12-26 12:57:32.149+03', '2024-12-26 12:57:32.15+03');
INSERT INTO public.likes VALUES ('785912d7-3674-4e57-898e-61f11cf5a0b9', 'f931bd07-b3c6-4401-bef5-e78e8d1d4c12', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:58:09.902+03', '2024-12-26 12:58:09.902+03');
INSERT INTO public.likes VALUES ('b961ac22-62a9-459d-9e1c-bd4bff98c0d5', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', 'e915c51a-db4b-4cd3-a281-fb26425431e8', '2024-12-26 12:58:48.898+03', '2024-12-26 12:58:48.898+03');
INSERT INTO public.likes VALUES ('a9ff6077-8f1b-4121-b646-892bfd6d861b', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', 'efda3bcb-ea81-4763-8583-e3a335d724c7', '2024-12-26 12:58:58.318+03', '2024-12-26 12:58:58.318+03');
INSERT INTO public.likes VALUES ('243e8eda-36b4-43d9-8564-176ffad1a0dd', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '7fc869d6-687f-4581-bdaf-fbbf7b85ccab', '2024-12-26 12:58:59.088+03', '2024-12-26 12:58:59.088+03');
INSERT INTO public.likes VALUES ('0a7b1c26-e2a0-4f4e-9f56-6deda4bca0d2', '7fc869d6-687f-4581-bdaf-fbbf7b85ccab', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:59:57.518+03', '2024-12-26 12:59:57.518+03');
INSERT INTO public.likes VALUES ('bc0d60e5-8c80-4a5c-8a71-b40748d93280', '7213c6bd-1327-4405-aaab-67bea7870430', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 13:00:50.205+03', '2024-12-26 13:00:50.205+03');


--
-- TOC entry 4897 (class 0 OID 34704)
-- Dependencies: 218
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.messages VALUES ('cdf14a83-2f71-4020-af34-132bc02f68ac', 'Hi, Chris!', '7ec2b180-acab-490e-a7b6-3f4599fd2945', '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', '2024-12-26 12:28:28.138+03', '2024-12-26 12:28:28.139+03');
INSERT INTO public.messages VALUES ('048a81f9-8f52-4a7a-be91-3396d734d751', 'Hi, Emily!', '7ec2b180-acab-490e-a7b6-3f4599fd2945', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:28:37.836+03', '2024-12-26 12:28:37.837+03');
INSERT INTO public.messages VALUES ('0b1dd50f-c986-45a2-86a1-280e3db5e1b1', 'do u have any plans for the evening?', '7ec2b180-acab-490e-a7b6-3f4599fd2945', '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', '2024-12-26 12:29:08.836+03', '2024-12-26 12:29:08.836+03');
INSERT INTO public.messages VALUES ('46347d7b-db2d-4b45-a880-14c8bf606bf7', 'not, realy :) any suggestions?', '7ec2b180-acab-490e-a7b6-3f4599fd2945', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:29:29.085+03', '2024-12-26 12:29:29.086+03');
INSERT INTO public.messages VALUES ('4e62e73c-45f9-45ee-aeab-fbb98d215740', 'how about a movie?', '7ec2b180-acab-490e-a7b6-3f4599fd2945', '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', '2024-12-26 12:29:52.401+03', '2024-12-26 12:29:52.401+03');
INSERT INTO public.messages VALUES ('3bca6057-2543-4a28-a967-420564adf9be', 'what time?', '7ec2b180-acab-490e-a7b6-3f4599fd2945', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:34:27.477+03', '2024-12-26 12:34:27.477+03');
INSERT INTO public.messages VALUES ('60537d81-976d-41ce-8b7f-515b00b05e86', 'i''ll pick up you at 7', '7ec2b180-acab-490e-a7b6-3f4599fd2945', '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', '2024-12-26 12:35:13.637+03', '2024-12-26 12:35:13.637+03');
INSERT INTO public.messages VALUES ('49f1ac62-85da-4aef-87e0-edde944cbe50', 'deal!', '7ec2b180-acab-490e-a7b6-3f4599fd2945', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:36:52.431+03', '2024-12-26 12:36:52.431+03');
INSERT INTO public.messages VALUES ('4265d3ce-f2a9-4cea-ab72-0eef2a9be570', 'Hi, Chris!', 'cece9dd4-71f1-4748-9f8a-aeffd3d1322c', 'f931bd07-b3c6-4401-bef5-e78e8d1d4c12', '2024-12-26 12:58:23.334+03', '2024-12-26 12:58:23.334+03');
INSERT INTO public.messages VALUES ('a144e232-bed4-460b-ac35-b932c7744b0c', 'Hi, Sarah!', 'cece9dd4-71f1-4748-9f8a-aeffd3d1322c', 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:58:36.897+03', '2024-12-26 12:58:36.897+03');


--
-- TOC entry 4899 (class 0 OID 34734)
-- Dependencies: 220
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.photos VALUES ('0f0dc158-0ba8-45aa-8e1b-94a229c91c0c', 'e3109dae-812f-425d-afcb-5e004e7ecf92.jpg', true, 'e915c51a-db4b-4cd3-a281-fb26425431e8', '2024-12-26 12:05:19.106+03', '2024-12-26 12:05:19.178+03');
INSERT INTO public.photos VALUES ('383f26b7-1ed7-4633-95a7-3db750cdd810', '23ceb49d-e0e9-40d6-ae02-1a370be45d5c.jpg', true, '63279bef-2fe9-4479-9e59-677103f6e49f', '2024-12-26 12:06:56.874+03', '2024-12-26 12:06:56.949+03');
INSERT INTO public.photos VALUES ('15300422-d8b9-4eb6-9a49-55a8060e9e04', 'dc838175-aff2-4a82-b63c-45c6870bd693.jpg', true, 'bc225c65-bb0b-4e35-bc73-7a1b966f6dc0', '2024-12-26 12:07:54.148+03', '2024-12-26 12:07:54.151+03');
INSERT INTO public.photos VALUES ('8853f61f-52a2-4fb6-ac91-bb862e46ac48', 'f2dccf5c-5806-4424-a0cf-fd023692bc9a.jpg', true, '44aeb2f1-952f-485e-acd3-9a5e0d9b2116', '2024-12-26 12:08:18.573+03', '2024-12-26 12:08:18.58+03');
INSERT INTO public.photos VALUES ('4d269311-b9e7-4a43-a34b-2b7afe78eb02', '0173b10b-34f0-46f8-a36a-950be39071dd.jpg', true, 'efda3bcb-ea81-4763-8583-e3a335d724c7', '2024-12-26 12:09:03.016+03', '2024-12-26 12:09:03.021+03');
INSERT INTO public.photos VALUES ('dbc05a5b-06bb-4dde-8390-1cfb495b637f', '0e75a7c8-72e2-44c5-88bd-224ed2e60997.jpg', true, '8651e9c5-fe7b-4b8c-a0a1-88225410dcbb', '2024-12-26 12:09:28.779+03', '2024-12-26 12:09:28.786+03');
INSERT INTO public.photos VALUES ('1af9c4f6-0506-4fb4-acbe-94fd31eb905c', '5b2ee02c-cf64-45a6-9848-4d4eabe8be44.jpg', true, 'f931bd07-b3c6-4401-bef5-e78e8d1d4c12', '2024-12-26 12:09:55.435+03', '2024-12-26 12:09:55.439+03');
INSERT INTO public.photos VALUES ('c4fe1743-c16d-49f9-9b5e-64fb7a7948e4', '155e4142-5157-4f04-ba11-818d407cbade.jpg', true, 'ff57d074-dfbd-4d7b-88c3-1cace2b44971', '2024-12-26 12:10:20.56+03', '2024-12-26 12:10:20.564+03');
INSERT INTO public.photos VALUES ('d66a94de-c6cb-4c8e-878b-4f362ebbd04c', '1c21e8b4-0556-4036-9841-ca79fd259528.jpg', true, '7fc869d6-687f-4581-bdaf-fbbf7b85ccab', '2024-12-26 12:38:52.915+03', '2024-12-26 12:38:52.981+03');
INSERT INTO public.photos VALUES ('71999a54-65b5-4fba-a47a-a6b5cfccf5ee', '935470a6-be25-43c4-8d6a-6a5eb68a6910.jpg', true, 'b2472329-a51a-4282-aada-672ec0b43bcd', '2024-12-26 12:39:59.262+03', '2024-12-26 12:39:59.265+03');
INSERT INTO public.photos VALUES ('4a8c460a-6e03-4959-8621-f7f87e243f03', '05fe0a76-a935-4ad7-a8b8-9eace1b09b99.jpg', true, 'f255a6fd-82f6-4e4c-9d1c-40f3823c52e1', '2024-12-26 12:46:24.69+03', '2024-12-26 12:46:24.756+03');
INSERT INTO public.photos VALUES ('590858c8-e2d8-45e6-9dc3-d956cac305c1', '97994c87-a0fe-4e76-8a03-fc234db80781.jpg', true, '9f1c6d8d-99e8-42c2-911b-2944b35d5efc', '2024-12-26 12:49:58.826+03', '2024-12-26 12:49:58.927+03');
INSERT INTO public.photos VALUES ('6c84f10e-1ea0-44a3-87b7-1ed63112f7f0', '56a00d22-514f-4973-a7ab-6ee0dadbfcc3.jpg', true, '7213c6bd-1327-4405-aaab-67bea7870430', '2024-12-26 12:53:17.306+03', '2024-12-26 12:53:17.375+03');
INSERT INTO public.photos VALUES ('940d44da-3a5f-49dc-8c60-7aa4eb45459e', '26e2b81a-b131-4d14-935c-174db8c0c18d.jpg', true, 'd521c35c-609d-44c6-b846-939b3b8ff3f9', '2024-12-26 12:56:55.162+03', '2024-12-26 12:56:55.165+03');


--
-- TOC entry 4894 (class 0 OID 34669)
-- Dependencies: 215
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subscriptions VALUES ('ef5f1e4d-43f8-460a-bbcb-e48b762965ca', 'BASIC', '2025-01-26 12:04:54.303+03', '2025-01-26 12:04:54.303+03', '2024-12-26 12:04:54.306+03');
INSERT INTO public.subscriptions VALUES ('26cecbbc-3b63-4512-ba02-1ef3286f8cec', 'BASIC', '2025-01-26 12:06:10.14+03', '2025-01-26 12:06:10.14+03', '2024-12-26 12:06:10.141+03');
INSERT INTO public.subscriptions VALUES ('d74717aa-a266-4f72-85d8-2254c8ccf0e5', 'BASIC', '2025-01-26 12:06:10.159+03', '2025-01-26 12:06:10.159+03', '2024-12-26 12:06:10.159+03');
INSERT INTO public.subscriptions VALUES ('c79d6ce5-5941-411d-bae2-d39a1628dab1', 'BASIC', '2025-01-26 12:06:10.177+03', '2025-01-26 12:06:10.177+03', '2024-12-26 12:06:10.177+03');
INSERT INTO public.subscriptions VALUES ('4fcfdc24-085f-4b45-af41-de5564c157b7', 'BASIC', '2025-01-26 12:06:10.191+03', '2025-01-26 12:06:10.191+03', '2024-12-26 12:06:10.192+03');
INSERT INTO public.subscriptions VALUES ('3b4ba7dd-6154-4122-a6e8-d079258bc809', 'BASIC', '2025-01-26 12:06:10.204+03', '2025-01-26 12:06:10.204+03', '2024-12-26 12:06:10.204+03');
INSERT INTO public.subscriptions VALUES ('9d30be17-8bee-4d1f-b4b4-e4dcc48e4e65', 'BASIC', '2025-01-26 12:06:10.218+03', '2025-01-26 12:06:10.218+03', '2024-12-26 12:06:10.218+03');
INSERT INTO public.subscriptions VALUES ('33f27e60-272d-4e2b-acdc-d0b3df90309d', 'BASIC', '2025-01-26 12:06:10.23+03', '2025-01-26 12:06:10.23+03', '2024-12-26 12:06:10.23+03');
INSERT INTO public.subscriptions VALUES ('61c17925-d2ed-44a2-a1d1-1dc95779bcae', 'BASIC', '2025-01-26 12:37:45.516+03', '2025-01-26 12:37:45.516+03', '2024-12-26 12:37:45.517+03');
INSERT INTO public.subscriptions VALUES ('e9859fca-d636-4ab2-bb73-ed26d71f41f5', 'BASIC', '2025-01-26 12:37:45.55+03', '2025-01-26 12:37:45.55+03', '2024-12-26 12:37:45.551+03');
INSERT INTO public.subscriptions VALUES ('94147bc9-8c1b-45dc-a59a-a6a0cb862875', 'BASIC', '2025-01-26 12:37:45.569+03', '2025-01-26 12:37:45.569+03', '2024-12-26 12:37:45.57+03');
INSERT INTO public.subscriptions VALUES ('3ec51a8b-8bd4-4a8f-99df-86c7e57450e8', 'BASIC', '2025-01-26 12:37:45.586+03', '2025-01-26 12:37:45.586+03', '2024-12-26 12:37:45.587+03');
INSERT INTO public.subscriptions VALUES ('be920e2c-bafb-471b-b104-8875434282fa', 'BASIC', '2025-01-26 12:37:45.603+03', '2025-01-26 12:37:45.603+03', '2024-12-26 12:37:45.604+03');
INSERT INTO public.subscriptions VALUES ('6e62088b-fcc3-47ef-8640-f310e8f1fb2d', 'BASIC', '2025-01-26 12:37:45.619+03', '2025-01-26 12:37:45.619+03', '2024-12-26 12:37:45.619+03');


--
-- TOC entry 4895 (class 0 OID 34683)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('e915c51a-db4b-4cd3-a281-fb26425431e8', 'test@gmail.com', 'Chill', 'Guy', NULL, 20, '$2b$05$v7US10j5y52I1lhvZB.NUuHl17DMP5pFeMaRZsO9YHZ0NXjavADpe', 'Male', 'ef5f1e4d-43f8-460a-bbcb-e48b762965ca', 'USER', '2024-12-26 12:04:54.322+03', '2024-12-26 12:04:54.322+03');
INSERT INTO public.users VALUES ('63279bef-2fe9-4479-9e59-677103f6e49f', 'john.doe@example.com', 'John', 'Doe', 'A software developer with a passion for coding.', 25, '$2b$05$yidT1GYZhSfNhQUVBMTQx.AIJve5t/okxKI7qx8Wjo5gCKPSS1JFe', 'Male', '26cecbbc-3b63-4512-ba02-1ef3286f8cec', 'USER', '2024-12-26 12:06:10.146+03', '2024-12-26 12:06:10.146+03');
INSERT INTO public.users VALUES ('efda3bcb-ea81-4763-8583-e3a335d724c7', 'jane.smith@example.com', 'Jane', 'Smith', 'Marketing specialist with a keen eye for design.', 30, '$2b$05$DKnfbm64NGy/5fLdlaJmLOo2RD6UgxvdnOZOCiyD.XLhNaYfadx.C', 'Female', 'd74717aa-a266-4f72-85d8-2254c8ccf0e5', 'USER', '2024-12-26 12:06:10.163+03', '2024-12-26 12:06:10.163+03');
INSERT INTO public.users VALUES ('bc225c65-bb0b-4e35-bc73-7a1b966f6dc0', 'michael.johnson@example.com', 'Michael', 'Johnson', 'Aspiring entrepreneur with a focus on tech startups.', 22, '$2b$05$IfbRE2Z6kapHGZzxD8Q3KeRkq/GgEtHy2.ek601A2JuswmoZ3Y.46', 'Male', 'c79d6ce5-5941-411d-bae2-d39a1628dab1', 'USER', '2024-12-26 12:06:10.181+03', '2024-12-26 12:06:10.181+03');
INSERT INTO public.users VALUES ('44aeb2f1-952f-485e-acd3-9a5e0d9b2116', 'emily.williams@example.com', 'Emily', 'Williams', 'HR manager with strong interpersonal skills.', 27, '$2b$05$4dzNdpCf0o2Er.FkR0GZ4O1HjGkJL9.MWMQFwsXI1FZBdD6QWC0dW', 'Female', '4fcfdc24-085f-4b45-af41-de5564c157b7', 'USER', '2024-12-26 12:06:10.195+03', '2024-12-26 12:06:10.195+03');
INSERT INTO public.users VALUES ('8651e9c5-fe7b-4b8c-a0a1-88225410dcbb', 'david.brown@example.com', 'David', 'Brown', 'Experienced data scientist with a passion for AI.', 35, '$2b$05$opEs/FUrtHuL3j9YAZgAu.ATGBv5w1kr9dyPEEn5VwWylbPIPWt.6', 'Male', '3b4ba7dd-6154-4122-a6e8-d079258bc809', 'USER', '2024-12-26 12:06:10.207+03', '2024-12-26 12:06:10.207+03');
INSERT INTO public.users VALUES ('f931bd07-b3c6-4401-bef5-e78e8d1d4c12', 'sarah.jones@example.com', 'Sarah', 'Jones', 'Graphic designer with a focus on branding.', 29, '$2b$05$jFeFlYWwXD/6BSTXWQk8buK9I8/aN5fUX3BVX5/pjxRPr5zrRRj6a', 'Female', '9d30be17-8bee-4d1f-b4b4-e4dcc48e4e65', 'USER', '2024-12-26 12:06:10.221+03', '2024-12-26 12:06:10.221+03');
INSERT INTO public.users VALUES ('7fc869d6-687f-4581-bdaf-fbbf7b85ccab', 'anna.martinez@example.com', 'Anna', 'Martinez', 'Product manager with expertise in agile methodologies.', 31, '$2b$05$MJH95sp12rA6SYTb9D6OA.c8lAnepCDj/fNZFHW4RmiNRzG6XiySS', 'Female', '61c17925-d2ed-44a2-a1d1-1dc95779bcae', 'USER', '2024-12-26 12:37:45.535+03', '2024-12-26 12:37:45.535+03');
INSERT INTO public.users VALUES ('b2472329-a51a-4282-aada-672ec0b43bcd', 'james.hernandez@example.com', 'James', 'Hernandez', 'Experienced financial analyst with a focus on market trends.', 28, '$2b$05$OZWsxjxaqgVhvHBK0KApyuD9yxfw3il/Djtjiw3XXnYxUqdRkenNi', 'Male', 'e9859fca-d636-4ab2-bb73-ed26d71f41f5', 'USER', '2024-12-26 12:37:45.555+03', '2024-12-26 12:37:45.555+03');
INSERT INTO public.users VALUES ('f255a6fd-82f6-4e4c-9d1c-40f3823c52e1', 'sophia.lopez@example.com', 'Sophia', 'Lopez', 'Entrepreneur with a background in e-commerce.', 32, '$2b$05$h7OW4Lba5omKb48HvxdkUe5Mgv9G/IxBPFPt77bvmqRMU4x1ovG36', 'Female', '94147bc9-8c1b-45dc-a59a-a6a0cb862875', 'USER', '2024-12-26 12:37:45.574+03', '2024-12-26 12:37:45.574+03');
INSERT INTO public.users VALUES ('9f1c6d8d-99e8-42c2-911b-2944b35d5efc', 'ethan.gonzalez@example.com', 'Ethan', 'Gonzalez', 'Senior developer with over 15 years in the tech industry.', 40, '$2b$05$Qmoog9BicPd4/TzF4rsSEe0LBAcMij1UwjPMRMDqjzY6WqBw1M6Li', 'Male', '3ec51a8b-8bd4-4a8f-99df-86c7e57450e8', 'USER', '2024-12-26 12:37:45.591+03', '2024-12-26 12:37:45.591+03');
INSERT INTO public.users VALUES ('7213c6bd-1327-4405-aaab-67bea7870430', 'liam.anderson@example.com', 'Liam', 'Anderson', 'Web developer with a focus on responsive design.', 24, '$2b$05$USP/1yGjYvgltIqrI7se2.VsBkq8XXUfX7uGac.XrxVz.tzQIr3sq', 'Male', '6e62088b-fcc3-47ef-8640-f310e8f1fb2d', 'USER', '2024-12-26 12:37:45.623+03', '2024-12-26 12:37:45.623+03');
INSERT INTO public.users VALUES ('d521c35c-609d-44c6-b846-939b3b8ff3f9', 'olivia.wilson@example.com', 'Dainty', 'Wilder', 'Creative writer with a passion for storytelling.', 26, '$2b$05$lI.UYW.IofWbDAUjN2Zg2.i3/3DxEY4ovMQyjSBCeZIE6P/srIuSi', 'Female', 'be920e2c-bafb-471b-b104-8875434282fa', 'USER', '2024-12-26 12:37:45.608+03', '2024-12-26 12:51:35.341+03');
INSERT INTO public.users VALUES ('ff57d074-dfbd-4d7b-88c3-1cace2b44971', 'chris.garcia@example.com', 'Chris', 'Garcia', 'Junior developer with a love for front-end development.', 23, '$2b$05$6iwWZvgHoWIB6nkEHkcA9enpe7crSlOerUmcy3zsXshQo44fbNyIS', 'Male', '33f27e60-272d-4e2b-acdc-d0b3df90309d', 'ADMIN', '2024-12-26 12:06:10.233+03', '2024-12-26 12:06:10.233+03');


--
-- TOC entry 4741 (class 2606 OID 34759)
-- Name: ChatUsers ChatUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatUsers"
    ADD CONSTRAINT "ChatUsers_pkey" PRIMARY KEY ("userId", "chatId");


--
-- TOC entry 4731 (class 2606 OID 34703)
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- TOC entry 4739 (class 2606 OID 34749)
-- Name: coordinates coordinates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coordinates
    ADD CONSTRAINT coordinates_pkey PRIMARY KEY (id);


--
-- TOC entry 4735 (class 2606 OID 34723)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- TOC entry 4733 (class 2606 OID 34708)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4737 (class 2606 OID 34739)
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 34673)
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 34693)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4729 (class 2606 OID 34691)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4749 (class 2606 OID 34765)
-- Name: ChatUsers ChatUsers_chatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatUsers"
    ADD CONSTRAINT "ChatUsers_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES public.chats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4750 (class 2606 OID 34760)
-- Name: ChatUsers ChatUsers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatUsers"
    ADD CONSTRAINT "ChatUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4748 (class 2606 OID 34750)
-- Name: coordinates coordinates_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coordinates
    ADD CONSTRAINT "coordinates_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4745 (class 2606 OID 34729)
-- Name: likes likes_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4746 (class 2606 OID 34724)
-- Name: likes likes_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4743 (class 2606 OID 34709)
-- Name: messages messages_chatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES public.chats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4744 (class 2606 OID 34714)
-- Name: messages messages_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4747 (class 2606 OID 34740)
-- Name: photos photos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4742 (class 2606 OID 34694)
-- Name: users users_subscriptionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES public.subscriptions(id) ON UPDATE CASCADE;


-- Completed on 2024-12-26 13:11:50

--
-- PostgreSQL database dump complete
--

