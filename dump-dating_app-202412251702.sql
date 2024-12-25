--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-12-25 17:02:35

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
-- TOC entry 847 (class 1247 OID 34482)
-- Name: enum_subscriptions_subscriptionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_subscriptions_subscriptionType" AS ENUM (
    'BASIC',
    'PREMIUM'
);


ALTER TYPE public."enum_subscriptions_subscriptionType" OWNER TO postgres;

--
-- TOC entry 853 (class 1247 OID 34493)
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
-- TOC entry 222 (class 1259 OID 34573)
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
-- TOC entry 217 (class 1259 OID 34517)
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 34563)
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
-- TOC entry 219 (class 1259 OID 34537)
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
-- TOC entry 218 (class 1259 OID 34522)
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
-- TOC entry 220 (class 1259 OID 34552)
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
-- TOC entry 215 (class 1259 OID 34487)
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
-- TOC entry 216 (class 1259 OID 34501)
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
-- TOC entry 4901 (class 0 OID 34573)
-- Dependencies: 222
-- Data for Name: ChatUsers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:11:24.593+03', '2024-12-24 03:11:24.593+03', 'b4d9776d-6e73-4cf8-acff-8c906fc2be50', '4b3e5ac1-5eda-4321-822d-bc6a0b29736c');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:11:24.593+03', '2024-12-24 03:11:24.593+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '4b3e5ac1-5eda-4321-822d-bc6a0b29736c');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:12:37.236+03', '2024-12-24 03:12:37.236+03', 'd6a4434d-2547-45e4-b147-19d911405585', '19d342f6-cef4-453f-8ceb-cd58d354e488');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:12:37.236+03', '2024-12-24 03:12:37.236+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '19d342f6-cef4-453f-8ceb-cd58d354e488');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:14:31.13+03', '2024-12-24 03:14:31.13+03', '44891608-eb3b-46f6-8778-52406c121102', '12a4c85f-792a-4bb5-8d6e-04d30fbbacfe');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:14:31.13+03', '2024-12-24 03:14:31.13+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '12a4c85f-792a-4bb5-8d6e-04d30fbbacfe');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:14:55.717+03', '2024-12-24 03:14:55.717+03', 'a7fa29a2-a487-4720-86ba-a45e3b000ca5', 'a533ac32-5f87-4a44-ace2-01a08badd44d');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:14:55.717+03', '2024-12-24 03:14:55.717+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'a533ac32-5f87-4a44-ace2-01a08badd44d');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:15:21.198+03', '2024-12-24 03:15:21.198+03', '4c5643ed-20f4-43c2-8553-f127f727b2f2', '01a7c43a-5c64-43a3-ab2c-60c1537a344a');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:15:21.198+03', '2024-12-24 03:15:21.198+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '01a7c43a-5c64-43a3-ab2c-60c1537a344a');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:15:49.431+03', '2024-12-24 03:15:49.431+03', '575deb34-4361-4d54-badd-e81591c2103a', 'e6482e63-18d6-4b66-918f-c4f6d575f06d');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:15:49.431+03', '2024-12-24 03:15:49.431+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'e6482e63-18d6-4b66-918f-c4f6d575f06d');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:16:05.473+03', '2024-12-24 03:16:05.473+03', '22f3e923-9275-4ac7-8f2f-4acf756952a2', 'b2be581b-632e-47a6-9f43-dda8ddc79080');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:16:05.473+03', '2024-12-24 03:16:05.473+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'b2be581b-632e-47a6-9f43-dda8ddc79080');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:16:26.827+03', '2024-12-24 03:16:26.827+03', 'f9bf42f1-2800-4516-a11e-d456e6724bf4', '1da7264e-11d7-4e1d-b342-db85e06a455e');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:16:26.827+03', '2024-12-24 03:16:26.827+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '1da7264e-11d7-4e1d-b342-db85e06a455e');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:16:49.657+03', '2024-12-24 03:16:49.657+03', 'ea307c90-febd-4372-9ae0-143d1d5314da', 'af9556a2-65a8-48e2-aed5-6b31ae186a48');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:16:49.657+03', '2024-12-24 03:16:49.657+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'af9556a2-65a8-48e2-aed5-6b31ae186a48');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:17:09.343+03', '2024-12-24 03:17:09.343+03', '406b3ad9-89b4-4bbc-8fa1-2ee8b620c712', '205cf3cc-b358-460f-8729-9ca5652fa298');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:17:09.343+03', '2024-12-24 03:17:09.343+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '205cf3cc-b358-460f-8729-9ca5652fa298');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:17:26.542+03', '2024-12-24 03:17:26.542+03', 'cf92ba2a-bae3-4258-8e88-034103de1bd4', '3b808bf9-2131-4e7c-bbcd-6fcbdd023399');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:17:26.542+03', '2024-12-24 03:17:26.542+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '3b808bf9-2131-4e7c-bbcd-6fcbdd023399');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:18:07.041+03', '2024-12-24 03:18:07.041+03', '9a50a9e2-de9f-48ae-89f2-9187f023f0c6', '2bec25d3-750f-4105-b1ba-090de7aea72f');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:18:07.041+03', '2024-12-24 03:18:07.041+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2bec25d3-750f-4105-b1ba-090de7aea72f');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:18:33.003+03', '2024-12-24 03:18:33.003+03', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '0a07378d-ddf2-4819-91c0-755493210842');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 03:18:33.003+03', '2024-12-24 03:18:33.003+03', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '0a07378d-ddf2-4819-91c0-755493210842');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 06:05:20.238+03', '2024-12-24 06:05:20.238+03', '44891608-eb3b-46f6-8778-52406c121102', '5c392f58-c078-4e50-95f7-375ea1ca16ea');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 06:05:20.238+03', '2024-12-24 06:05:20.238+03', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '5c392f58-c078-4e50-95f7-375ea1ca16ea');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 11:50:34.798+03', '2024-12-24 11:50:34.798+03', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', 'e2c1d993-8402-4c27-83d7-79a2d2305434');
INSERT INTO public."ChatUsers" VALUES ('2024-12-24 11:50:34.798+03', '2024-12-24 11:50:34.798+03', '9432cad1-d26a-4003-9215-dbdfd451b8dd', 'e2c1d993-8402-4c27-83d7-79a2d2305434');


--
-- TOC entry 4896 (class 0 OID 34517)
-- Dependencies: 217
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.chats VALUES ('4b3e5ac1-5eda-4321-822d-bc6a0b29736c', '2024-12-24 03:11:24.588+03', '2024-12-24 03:11:24.588+03');
INSERT INTO public.chats VALUES ('19d342f6-cef4-453f-8ceb-cd58d354e488', '2024-12-24 03:12:37.233+03', '2024-12-24 03:12:37.233+03');
INSERT INTO public.chats VALUES ('12a4c85f-792a-4bb5-8d6e-04d30fbbacfe', '2024-12-24 03:14:31.127+03', '2024-12-24 03:14:31.127+03');
INSERT INTO public.chats VALUES ('a533ac32-5f87-4a44-ace2-01a08badd44d', '2024-12-24 03:14:55.715+03', '2024-12-24 03:14:55.715+03');
INSERT INTO public.chats VALUES ('01a7c43a-5c64-43a3-ab2c-60c1537a344a', '2024-12-24 03:15:21.195+03', '2024-12-24 03:15:21.195+03');
INSERT INTO public.chats VALUES ('e6482e63-18d6-4b66-918f-c4f6d575f06d', '2024-12-24 03:15:49.428+03', '2024-12-24 03:15:49.428+03');
INSERT INTO public.chats VALUES ('b2be581b-632e-47a6-9f43-dda8ddc79080', '2024-12-24 03:16:05.47+03', '2024-12-24 03:16:05.47+03');
INSERT INTO public.chats VALUES ('1da7264e-11d7-4e1d-b342-db85e06a455e', '2024-12-24 03:16:26.823+03', '2024-12-24 03:16:26.823+03');
INSERT INTO public.chats VALUES ('af9556a2-65a8-48e2-aed5-6b31ae186a48', '2024-12-24 03:16:49.652+03', '2024-12-24 03:16:49.652+03');
INSERT INTO public.chats VALUES ('205cf3cc-b358-460f-8729-9ca5652fa298', '2024-12-24 03:17:09.339+03', '2024-12-24 03:17:09.339+03');
INSERT INTO public.chats VALUES ('3b808bf9-2131-4e7c-bbcd-6fcbdd023399', '2024-12-24 03:17:26.538+03', '2024-12-24 03:17:26.538+03');
INSERT INTO public.chats VALUES ('2bec25d3-750f-4105-b1ba-090de7aea72f', '2024-12-24 03:18:07.039+03', '2024-12-24 03:18:07.039+03');
INSERT INTO public.chats VALUES ('0a07378d-ddf2-4819-91c0-755493210842', '2024-12-24 03:18:33+03', '2024-12-24 03:18:33+03');
INSERT INTO public.chats VALUES ('5c392f58-c078-4e50-95f7-375ea1ca16ea', '2024-12-24 06:05:20.224+03', '2024-12-24 06:05:20.224+03');
INSERT INTO public.chats VALUES ('e2c1d993-8402-4c27-83d7-79a2d2305434', '2024-12-24 11:50:34.79+03', '2024-12-24 11:50:34.79+03');


--
-- TOC entry 4900 (class 0 OID 34563)
-- Dependencies: 221
-- Data for Name: coordinates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.coordinates VALUES ('a462c98d-7649-41c2-a721-97ddd9cc3df9', 'Беларусь, Могилёв, Упорный переулок, 13', 53.90071847720063, 30.30997820643529, '2d82e7c4-7aa4-4be1-9c22-c70509bff46a', '2024-12-24 02:48:06.293+03', '2024-12-24 02:48:06.293+03');
INSERT INTO public.coordinates VALUES ('cc0b61de-0bc7-4322-9069-dd69dd0b4b3f', 'Беларусь, Могилёв, микрорайон Заднепровье-3', 53.86298907791692, 30.336757381239984, '44891608-eb3b-46f6-8778-52406c121102', '2024-12-24 02:50:54.778+03', '2024-12-24 02:50:54.778+03');
INSERT INTO public.coordinates VALUES ('a2037278-cb4a-471a-8ff1-fa5b82266de5', 'Беларусь, Могилёв, улица Левая Дубровенка', 53.90031296665482, 30.329204280654032, '9a50a9e2-de9f-48ae-89f2-9187f023f0c6', '2024-12-24 02:52:21.422+03', '2024-12-24 02:52:21.422+03');
INSERT INTO public.coordinates VALUES ('dba60608-c428-4792-9bb2-53f0dcc47d35', 'Беларусь, Могилёв, улица Циолковского, 10', 53.909638708832034, 30.31821795252905, 'b4d9776d-6e73-4cf8-acff-8c906fc2be50', '2024-12-24 02:52:46.94+03', '2024-12-24 02:52:46.94+03');
INSERT INTO public.coordinates VALUES ('b7182add-da12-4f50-b5df-913bc53e1ad4', 'Беларусь, Могилёв, улица Королёва', 53.90315145743824, 30.367656429091546, 'cf92ba2a-bae3-4258-8e88-034103de1bd4', '2024-12-24 02:54:26.671+03', '2024-12-24 02:54:26.671+03');
INSERT INTO public.coordinates VALUES ('57b47944-8d76-4f35-a607-1e20335a0658', 'Беларусь, Могилёв, Ленинский район', 53.89260751496351, 30.337444026747793, 'd6a4434d-2547-45e4-b147-19d911405585', '2024-12-24 02:55:54.691+03', '2024-12-24 02:55:54.691+03');
INSERT INTO public.coordinates VALUES ('9290aeb1-4014-4392-89a0-7132ca955719', 'Беларусь, Могилёв, площадь Славы', 53.894229833952146, 30.329890926161845, 'de0b04e0-e599-45a4-aa01-9db6bc3d38d4', '2024-12-24 02:56:16.339+03', '2024-12-24 02:56:16.339+03');
INSERT INTO public.coordinates VALUES ('49bfc302-b9d2-468c-92e6-4cbfc22ae455', 'Беларусь, Могилёв, Пожарный переулок', 53.897068739935214, 30.34019060877904, 'ea307c90-febd-4372-9ae0-143d1d5314da', '2024-12-24 02:57:28.939+03', '2024-12-24 02:57:28.939+03');
INSERT INTO public.coordinates VALUES ('b4cd7075-8827-44e2-b6c9-794a7d362065', 'Беларусь, Могилёв, парк культуры и отдыха имени Максима Горького', 53.894229833952146, 30.329204280654032, 'a7fa29a2-a487-4720-86ba-a45e3b000ca5', '2024-12-24 02:58:33.105+03', '2024-12-24 02:58:33.105+03');
INSERT INTO public.coordinates VALUES ('767f7d7b-4662-4e62-883d-a0b4cf18ea37', 'Беларусь, Могилёв, Комсомольская улица, 18/1', 53.89666319380085, 30.338130672255605, '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 02:59:21.696+03', '2024-12-24 02:59:21.696+03');
INSERT INTO public.coordinates VALUES ('a24d75ff-7282-411f-9f83-f5964f405f39', 'Беларусь, Могилёв, Пушкинский проспект', 53.88287227225689, 30.33469744471655, '575deb34-4361-4d54-badd-e81591c2103a', '2024-12-24 03:00:04.968+03', '2024-12-24 03:00:04.968+03');
INSERT INTO public.coordinates VALUES ('3a2736aa-eab7-48fd-a028-8de800eb7684', 'Беларусь, Могилёв, Октябрьский район', 53.88692890022057, 30.34499712733372, '22f3e923-9275-4ac7-8f2f-4acf756952a2', '2024-12-24 03:00:36.2+03', '2024-12-24 03:00:36.2+03');
INSERT INTO public.coordinates VALUES ('5acb70ec-cf13-4962-a60b-e8350e391836', 'Беларусь, Могилёв, улица Лобачевского', 53.88043810563939, 30.342937190810286, '78469d44-2b6d-4b2e-adf2-60977e0fb4e5', '2024-12-24 03:01:40.501+03', '2024-12-24 03:01:40.501+03');
INSERT INTO public.coordinates VALUES ('dd3b58fa-ac51-4007-aba9-3e0e8cfbc2e0', 'Беларусь, Могилёв, 1-й Донской переулок, 3', 53.926662928237164, 30.322337825575918, '406b3ad9-89b4-4bbc-8fa1-2ee8b620c712', '2024-12-24 03:02:09.286+03', '2024-12-24 03:02:09.286+03');
INSERT INTO public.coordinates VALUES ('c752c1dc-f1c5-4fd2-b560-0ee625288d0c', 'Беларусь, Могилёв, Городской парк культуры и отдыха Подниколье', 53.894229833952146, 30.340877254286852, '4c5643ed-20f4-43c2-8553-f127f727b2f2', '2024-12-24 03:02:29.786+03', '2024-12-24 03:02:29.786+03');
INSERT INTO public.coordinates VALUES ('27dd6738-c2d0-4d6d-aa0a-a9a0ed0b29c7', 'Беларусь, Могилёв, улица 3 Июля', 53.93193091622242, 30.355983455458727, 'f9bf42f1-2800-4516-a11e-d456e6724bf4', '2024-12-24 03:03:24.823+03', '2024-12-24 03:03:24.823+03');
INSERT INTO public.coordinates VALUES ('8146ba22-2d86-4074-bd83-75fd47630f21', 'Беларусь, Могилёвский район, Буйничский сельсовет, деревня Тишовка', 53.88449497090144, 30.233073909560286, 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:03:45.034+03', '2024-12-24 03:04:14.238+03');
INSERT INTO public.coordinates VALUES ('bdc7ef1b-a943-46d6-802e-232331bd3407', 'Беларусь, Могилёв, улица Левая Дубровенка', 53.90315145743824, 30.331950862685304, '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 05:44:41.609+03', '2024-12-24 05:44:41.609+03');


--
-- TOC entry 4898 (class 0 OID 34537)
-- Dependencies: 219
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.likes VALUES ('fc9c29ba-0641-4990-b8a5-0cc88686958d', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'b4d9776d-6e73-4cf8-acff-8c906fc2be50', '2024-12-24 03:08:57.257+03', '2024-12-24 03:08:57.257+03');
INSERT INTO public.likes VALUES ('e8212e2d-b1d9-4190-8e0d-6b8b51b981eb', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'd6a4434d-2547-45e4-b147-19d911405585', '2024-12-24 03:08:57.614+03', '2024-12-24 03:08:57.614+03');
INSERT INTO public.likes VALUES ('421673ed-730d-465f-8eba-1bca7f3d2230', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '44891608-eb3b-46f6-8778-52406c121102', '2024-12-24 03:08:57.898+03', '2024-12-24 03:08:57.898+03');
INSERT INTO public.likes VALUES ('86cf7088-8fef-4f09-851b-3201ad65e979', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'a7fa29a2-a487-4720-86ba-a45e3b000ca5', '2024-12-24 03:08:58.069+03', '2024-12-24 03:08:58.069+03');
INSERT INTO public.likes VALUES ('ec992256-2f57-41d2-9cf2-12e6fc2def23', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '4c5643ed-20f4-43c2-8553-f127f727b2f2', '2024-12-24 03:08:58.231+03', '2024-12-24 03:08:58.231+03');
INSERT INTO public.likes VALUES ('8a215f1a-05d9-4037-ac42-7c6feb6ea7be', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '575deb34-4361-4d54-badd-e81591c2103a', '2024-12-24 03:10:39.571+03', '2024-12-24 03:10:39.571+03');
INSERT INTO public.likes VALUES ('05b1d29f-4391-434a-ada7-17c9dab89fd9', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '22f3e923-9275-4ac7-8f2f-4acf756952a2', '2024-12-24 03:10:39.896+03', '2024-12-24 03:10:39.896+03');
INSERT INTO public.likes VALUES ('c200b274-8551-43ab-9cd4-388a9a33bb6d', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'f9bf42f1-2800-4516-a11e-d456e6724bf4', '2024-12-24 03:10:40.045+03', '2024-12-24 03:10:40.045+03');
INSERT INTO public.likes VALUES ('e70bd0f3-c335-4bbe-82e6-648061da7ce0', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'ea307c90-febd-4372-9ae0-143d1d5314da', '2024-12-24 03:10:40.194+03', '2024-12-24 03:10:40.195+03');
INSERT INTO public.likes VALUES ('eafb1277-7cd2-40df-83c8-aff0f07a7f18', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '406b3ad9-89b4-4bbc-8fa1-2ee8b620c712', '2024-12-24 03:10:40.819+03', '2024-12-24 03:10:40.819+03');
INSERT INTO public.likes VALUES ('4d1ca70b-d373-4b68-bfb5-0abbe521c2ab', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', 'cf92ba2a-bae3-4258-8e88-034103de1bd4', '2024-12-24 03:10:44.232+03', '2024-12-24 03:10:44.232+03');
INSERT INTO public.likes VALUES ('66d6ba8d-270f-4003-92a9-a6b85c375d42', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '9a50a9e2-de9f-48ae-89f2-9187f023f0c6', '2024-12-24 03:10:44.574+03', '2024-12-24 03:10:44.574+03');
INSERT INTO public.likes VALUES ('b768b408-4235-43d4-9f1d-36e611229f3e', 'b4d9776d-6e73-4cf8-acff-8c906fc2be50', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:11:24.583+03', '2024-12-24 03:11:24.583+03');
INSERT INTO public.likes VALUES ('3bb7c7c3-1bab-46dc-941a-920f04f75368', '9432cad1-d26a-4003-9215-dbdfd451b8dd', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:12:02.581+03', '2024-12-24 03:12:02.581+03');
INSERT INTO public.likes VALUES ('a6a697e9-8a0a-461e-bf87-c07a0f62d443', 'd6a4434d-2547-45e4-b147-19d911405585', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:12:37.229+03', '2024-12-24 03:12:37.229+03');
INSERT INTO public.likes VALUES ('53e350ad-bac0-4875-ad64-30a778adca5e', '44891608-eb3b-46f6-8778-52406c121102', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:14:31.123+03', '2024-12-24 03:14:31.123+03');
INSERT INTO public.likes VALUES ('4ff289ba-4b04-4ca3-8a3f-d38b0b9c8675', 'a7fa29a2-a487-4720-86ba-a45e3b000ca5', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:14:55.712+03', '2024-12-24 03:14:55.712+03');
INSERT INTO public.likes VALUES ('06ff827f-ae5c-41bb-9ed4-d5fbe9ce236c', '4c5643ed-20f4-43c2-8553-f127f727b2f2', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:15:21.189+03', '2024-12-24 03:15:21.189+03');
INSERT INTO public.likes VALUES ('1d72a480-30ed-45a4-a377-d418a82071fe', '575deb34-4361-4d54-badd-e81591c2103a', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:15:49.422+03', '2024-12-24 03:15:49.422+03');
INSERT INTO public.likes VALUES ('43e82c91-0233-4d9f-a191-05c5a5044e6d', '22f3e923-9275-4ac7-8f2f-4acf756952a2', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:16:05.464+03', '2024-12-24 03:16:05.464+03');
INSERT INTO public.likes VALUES ('97451d20-0bc3-45ad-b040-0eb7ea6ee792', 'f9bf42f1-2800-4516-a11e-d456e6724bf4', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:16:26.82+03', '2024-12-24 03:16:26.82+03');
INSERT INTO public.likes VALUES ('cd3c8043-88f8-4caa-813d-bd900471c55d', 'ea307c90-febd-4372-9ae0-143d1d5314da', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:16:49.648+03', '2024-12-24 03:16:49.648+03');
INSERT INTO public.likes VALUES ('1b0f2516-94ee-4242-b03b-dd110634513e', '406b3ad9-89b4-4bbc-8fa1-2ee8b620c712', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:17:09.336+03', '2024-12-24 03:17:09.336+03');
INSERT INTO public.likes VALUES ('13a18dd1-a36e-4097-94ff-ff9eb99534af', 'cf92ba2a-bae3-4258-8e88-034103de1bd4', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:17:26.533+03', '2024-12-24 03:17:26.533+03');
INSERT INTO public.likes VALUES ('12d7ce1d-43ea-4981-9ab8-398ed4ead26b', '9a50a9e2-de9f-48ae-89f2-9187f023f0c6', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:18:07.036+03', '2024-12-24 03:18:07.036+03');
INSERT INTO public.likes VALUES ('8b1532b0-14bc-418b-a2ab-6fe02864f2e4', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 03:18:32.994+03', '2024-12-24 03:18:32.995+03');
INSERT INTO public.likes VALUES ('9e310eed-26b5-43b7-869b-3c72aef03e49', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', 'b4d9776d-6e73-4cf8-acff-8c906fc2be50', '2024-12-24 06:03:07.909+03', '2024-12-24 06:03:07.909+03');
INSERT INTO public.likes VALUES ('e6dc6a29-5033-42db-aa8a-ac521fc109b6', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '44891608-eb3b-46f6-8778-52406c121102', '2024-12-24 06:04:09.592+03', '2024-12-24 06:04:09.592+03');
INSERT INTO public.likes VALUES ('943276ab-d873-43d3-84ab-932bd54bbdb2', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 06:04:28.742+03', '2024-12-24 06:04:28.742+03');
INSERT INTO public.likes VALUES ('4a22964f-26d0-4d02-b2ed-c44f0bb4b313', '44891608-eb3b-46f6-8778-52406c121102', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 06:05:20.209+03', '2024-12-24 06:05:20.209+03');
INSERT INTO public.likes VALUES ('d8d8afa7-2c10-4218-b9f3-cbe7f024a50b', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 06:06:55.625+03', '2024-12-24 06:06:55.625+03');
INSERT INTO public.likes VALUES ('2b47ce9f-665c-44a8-bafe-66fc19d1cecf', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', 'a7fa29a2-a487-4720-86ba-a45e3b000ca5', '2024-12-24 06:06:55.909+03', '2024-12-24 06:06:55.909+03');
INSERT INTO public.likes VALUES ('ad4ea451-dc0b-4843-bd4c-50b9850587fa', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 11:50:34.777+03', '2024-12-24 11:50:34.778+03');


--
-- TOC entry 4897 (class 0 OID 34522)
-- Dependencies: 218
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.messages VALUES ('4fd9a4b8-0f31-4da1-84fa-ee3ba2185989', 'Hello!', '4b3e5ac1-5eda-4321-822d-bc6a0b29736c', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:18:45.946+03', '2024-12-24 03:18:45.946+03');
INSERT INTO public.messages VALUES ('13e90679-c5f6-4a45-bf4f-f2dec11c19eb', 'Hello, Maya!', '0a07378d-ddf2-4819-91c0-755493210842', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 03:19:29.072+03', '2024-12-24 03:19:29.072+03');
INSERT INTO public.messages VALUES ('5d02ddb8-e775-4fea-9fc4-6fec15aa35ff', 'Hello, Clark!', '0a07378d-ddf2-4819-91c0-755493210842', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:19:43.259+03', '2024-12-24 03:19:43.259+03');
INSERT INTO public.messages VALUES ('2da92e02-15de-44d0-8157-2fbd128afb1a', 'How was your day?', '0a07378d-ddf2-4819-91c0-755493210842', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 03:19:59.162+03', '2024-12-24 03:19:59.162+03');
INSERT INTO public.messages VALUES ('7b5f7fba-742b-40f2-aded-0594104f8c74', 'aweosme, thx! u?', '0a07378d-ddf2-4819-91c0-755493210842', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:20:08.438+03', '2024-12-24 03:20:08.438+03');
INSERT INTO public.messages VALUES ('0c0cbd40-4eae-4fc7-90fa-9a602c988a1e', 'the same!', '0a07378d-ddf2-4819-91c0-755493210842', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 03:20:15.849+03', '2024-12-24 03:20:15.849+03');
INSERT INTO public.messages VALUES ('2714544e-879c-4699-96de-2b89f27eb75c', 'any plans for the weekend?', '0a07378d-ddf2-4819-91c0-755493210842', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 03:20:30.156+03', '2024-12-24 03:20:30.156+03');
INSERT INTO public.messages VALUES ('e003d574-e410-4f62-b3f1-db7c6a5781d6', 'hm not really', '0a07378d-ddf2-4819-91c0-755493210842', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:20:48.001+03', '2024-12-24 03:20:48.001+03');
INSERT INTO public.messages VALUES ('1cae3934-d797-4ad0-af58-8ca5a90f6022', 'cinema?', '0a07378d-ddf2-4819-91c0-755493210842', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 03:21:00.37+03', '2024-12-24 03:21:00.37+03');
INSERT INTO public.messages VALUES ('9862cbcf-c159-4122-a7d9-85fc0e2d2677', 'sure!', '0a07378d-ddf2-4819-91c0-755493210842', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:21:09.793+03', '2024-12-24 03:21:09.793+03');
INSERT INTO public.messages VALUES ('0617af67-d9d2-4bb3-8c1f-93d15b62b048', 'ok, tommorow at 11!', '0a07378d-ddf2-4819-91c0-755493210842', '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 03:21:23.332+03', '2024-12-24 03:21:23.332+03');
INSERT INTO public.messages VALUES ('e8abb15d-2e6e-49d0-b3ac-ceb83accfa89', 'see u!', '0a07378d-ddf2-4819-91c0-755493210842', 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:21:28.143+03', '2024-12-24 03:21:28.143+03');
INSERT INTO public.messages VALUES ('cea8e2ed-5d2a-4b26-9984-cdfbae62080f', 'hi!', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 06:15:33.45+03', '2024-12-24 06:15:33.451+03');
INSERT INTO public.messages VALUES ('65726301-0efa-4b38-88bc-9bc1ef442e2d', 'hi!', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '44891608-eb3b-46f6-8778-52406c121102', '2024-12-24 06:15:37.191+03', '2024-12-24 06:15:37.191+03');
INSERT INTO public.messages VALUES ('ba9abab8-9151-444d-bde8-52c3f1d90c98', 'Hello, World!', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 06:15:48.446+03', '2024-12-24 06:15:48.446+03');
INSERT INTO public.messages VALUES ('29c521b0-6252-4809-ad6c-9bdda9024c9e', 'how are you', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '44891608-eb3b-46f6-8778-52406c121102', '2024-12-24 06:15:56.665+03', '2024-12-24 06:15:56.666+03');
INSERT INTO public.messages VALUES ('0d8f32e2-5c75-4344-a2b5-6fcf5f0378c1', 'awesome', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 06:16:10.876+03', '2024-12-24 06:16:10.876+03');
INSERT INTO public.messages VALUES ('43a7b147-a9c3-45fa-8a81-662ef967d5fb', 'any plans for today?', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 06:16:27.105+03', '2024-12-24 06:16:27.105+03');
INSERT INTO public.messages VALUES ('8e963e7b-ebd0-4485-b8d3-81e2cff13c99', 'not really', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '44891608-eb3b-46f6-8778-52406c121102', '2024-12-24 06:16:44.005+03', '2024-12-24 06:16:44.005+03');
INSERT INTO public.messages VALUES ('6f96247a-33ad-4e53-9237-3ecfa99e9a47', 'let''s coding!', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 06:16:58.417+03', '2024-12-24 06:16:58.418+03');
INSERT INTO public.messages VALUES ('9bd38a1d-0c25-48ba-8c2c-fd58e8ddaec7', 'brilliant idea', '5c392f58-c078-4e50-95f7-375ea1ca16ea', '44891608-eb3b-46f6-8778-52406c121102', '2024-12-24 06:17:09.169+03', '2024-12-24 06:17:09.169+03');


--
-- TOC entry 4899 (class 0 OID 34552)
-- Dependencies: 220
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.photos VALUES ('cf4455e7-8ca0-4ffb-8583-6485685aec0f', 'c5ba4752-3a0a-4b07-b261-91b68f7c646f.jpg', true, '2d82e7c4-7aa4-4be1-9c22-c70509bff46a', '2024-12-24 02:50:36.156+03', '2024-12-24 02:50:36.191+03');
INSERT INTO public.photos VALUES ('e79da859-dfd7-4269-a04b-5d6ff45c6b18', 'd8c6762a-9d71-425b-91d1-33df0d8e5226.jpg', true, '44891608-eb3b-46f6-8778-52406c121102', '2024-12-24 02:52:01.024+03', '2024-12-24 02:52:01.056+03');
INSERT INTO public.photos VALUES ('01b4db8e-6dac-4ff0-ad24-bbfe9662c03d', '0e54bf56-20f8-4e95-8f2f-9a65379c62de.jpg', true, '9a50a9e2-de9f-48ae-89f2-9187f023f0c6', '2024-12-24 02:52:27.754+03', '2024-12-24 02:52:27.755+03');
INSERT INTO public.photos VALUES ('491bc0ad-63cd-491b-a417-e659398abe3b', '58860aaf-31bf-438d-8666-7210553044a7.jpg', true, 'b4d9776d-6e73-4cf8-acff-8c906fc2be50', '2024-12-24 02:54:07.782+03', '2024-12-24 02:54:07.814+03');
INSERT INTO public.photos VALUES ('6eb44ffb-1a38-446a-9166-12214519ffd4', '93ddc13c-9e26-414b-ac7c-7a172343da6f.jpg', true, 'cf92ba2a-bae3-4258-8e88-034103de1bd4', '2024-12-24 02:55:36.891+03', '2024-12-24 02:55:36.92+03');
INSERT INTO public.photos VALUES ('c713ce69-155d-4a1d-9a39-10ae85a4fa91', 'b3055084-1790-4eb8-9f2e-271d01f3d136.jpg', true, 'd6a4434d-2547-45e4-b147-19d911405585', '2024-12-24 02:56:01.703+03', '2024-12-24 02:56:01.706+03');
INSERT INTO public.photos VALUES ('03886f4e-647b-4228-b0c2-bc492f6e59cf', '0070c888-6123-47cd-8ce2-da8994cd70ae.jpg', true, 'de0b04e0-e599-45a4-aa01-9db6bc3d38d4', '2024-12-24 02:56:21.747+03', '2024-12-24 02:56:21.749+03');
INSERT INTO public.photos VALUES ('f34f7702-68ca-4dee-a1f2-703df0d85edc', 'ff3aaf22-9960-4526-a511-fd336aeb0989.jpg', true, 'ea307c90-febd-4372-9ae0-143d1d5314da', '2024-12-24 02:57:35.19+03', '2024-12-24 02:57:35.194+03');
INSERT INTO public.photos VALUES ('08f477fe-e4a8-45c3-ac40-a3a80d798da5', '8bfa7a61-f1a4-4108-8aac-f3065b7d7347.jpg', true, 'a7fa29a2-a487-4720-86ba-a45e3b000ca5', '2024-12-24 02:58:52.708+03', '2024-12-24 02:58:52.71+03');
INSERT INTO public.photos VALUES ('0e8fd2cf-b664-4d47-a431-51d162087449', '447edf38-2c8f-4881-b182-667cbb550805.jpg', true, '9432cad1-d26a-4003-9215-dbdfd451b8dd', '2024-12-24 02:59:49.843+03', '2024-12-24 02:59:49.879+03');
INSERT INTO public.photos VALUES ('51a8261a-65b9-4e12-a7e0-c6844eb59379', 'a8939a72-3fa3-4b4e-8353-64b03c266103.jpg', true, '575deb34-4361-4d54-badd-e81591c2103a', '2024-12-24 03:00:13.707+03', '2024-12-24 03:00:13.708+03');
INSERT INTO public.photos VALUES ('160377fa-2d37-4531-85b8-cae5f7986df0', '8cfe6168-0ef7-4416-933a-83add720cbf2.jpg', true, '22f3e923-9275-4ac7-8f2f-4acf756952a2', '2024-12-24 03:00:44.024+03', '2024-12-24 03:00:44.026+03');
INSERT INTO public.photos VALUES ('f7213313-a4ac-4f20-ab57-e52b773d7b7d', 'eb33f495-c7fa-4371-b6c8-93efb13673fc.jpg', true, '78469d44-2b6d-4b2e-adf2-60977e0fb4e5', '2024-12-24 03:01:52.594+03', '2024-12-24 03:01:52.596+03');
INSERT INTO public.photos VALUES ('b571592c-38b3-41ee-9483-a16fd27ed741', '7cfb9819-ac07-4041-af77-8f48b1a26917.jpg', true, '406b3ad9-89b4-4bbc-8fa1-2ee8b620c712', '2024-12-24 03:02:14.956+03', '2024-12-24 03:02:14.959+03');
INSERT INTO public.photos VALUES ('021045bb-e8e1-4081-9fcb-af0c25f3d6b9', '2bc11fd1-f6dc-4e37-8644-88c2974a13e3.jpg', true, '4c5643ed-20f4-43c2-8553-f127f727b2f2', '2024-12-24 03:03:08.048+03', '2024-12-24 03:03:08.079+03');
INSERT INTO public.photos VALUES ('8e7e1cc7-5cb7-4c0e-983b-e6d02403a25c', '7368751c-276e-4282-81fe-f3234850353b.jpg', true, 'f9bf42f1-2800-4516-a11e-d456e6724bf4', '2024-12-24 03:03:30.245+03', '2024-12-24 03:03:30.247+03');
INSERT INTO public.photos VALUES ('51737543-920b-49b6-b0da-2d0f5df34f9d', 'a024dd46-ed6f-4408-b769-e1c8030993b4.jpg', false, 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:04:01.663+03', '2024-12-24 03:05:57.433+03');
INSERT INTO public.photos VALUES ('6b462323-8626-4b9e-8054-b871e07acfd5', 'e98108a7-4377-4da2-8f90-bdcd6609bff9.jpg', false, 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:05:57.433+03', '2024-12-24 03:05:57.463+03');
INSERT INTO public.photos VALUES ('09d90db9-4ee8-472e-8b07-93a848457603', 'd0c8a0d5-59b3-4d16-817f-93fd16ac9ef7.jpg', false, 'f86481bd-410e-4c7d-9811-ec8971f0cf90', '2024-12-24 03:06:08.579+03', '2024-12-24 03:06:08.611+03');
INSERT INTO public.photos VALUES ('58cc2d34-67e6-4734-bbd5-171cd80a12ef', 'e26c9402-5848-4f08-a0c6-b053f9aaed55.jpg', true, '3dcabd4d-ae92-40d8-8a30-9bb738a32c63', '2024-12-24 05:49:38.982+03', '2024-12-24 05:49:38.986+03');


--
-- TOC entry 4894 (class 0 OID 34487)
-- Dependencies: 215
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subscriptions VALUES ('1ff57753-85fd-4334-9c07-3a1b51d5a0e6', 'BASIC', '2025-01-24 02:47:13.042+03', '2025-01-24 02:47:13.042+03', '2024-12-24 02:47:13.044+03');
INSERT INTO public.subscriptions VALUES ('0dccd71a-9b0e-4e7d-b4e5-d50646bb7c52', 'BASIC', '2025-01-24 02:47:13.058+03', '2025-01-24 02:47:13.058+03', '2024-12-24 02:47:13.058+03');
INSERT INTO public.subscriptions VALUES ('971c3b4e-d79e-4424-890f-794da1687169', 'BASIC', '2025-01-24 02:47:13.064+03', '2025-01-24 02:47:13.064+03', '2024-12-24 02:47:13.065+03');
INSERT INTO public.subscriptions VALUES ('ff144bb2-65fb-49e8-95e5-b7e1bf82ec41', 'BASIC', '2025-01-24 02:47:13.072+03', '2025-01-24 02:47:13.072+03', '2024-12-24 02:47:13.072+03');
INSERT INTO public.subscriptions VALUES ('fa6ac338-8024-426b-aa20-453e25f74599', 'BASIC', '2025-01-24 02:47:13.079+03', '2025-01-24 02:47:13.079+03', '2024-12-24 02:47:13.079+03');
INSERT INTO public.subscriptions VALUES ('a67cd61e-a33c-4f65-b634-b66d27c8a56d', 'BASIC', '2025-01-24 02:47:13.085+03', '2025-01-24 02:47:13.085+03', '2024-12-24 02:47:13.085+03');
INSERT INTO public.subscriptions VALUES ('c3d46c46-f57e-4654-b943-ec471f210dbc', 'BASIC', '2025-01-24 02:47:13.091+03', '2025-01-24 02:47:13.091+03', '2024-12-24 02:47:13.092+03');
INSERT INTO public.subscriptions VALUES ('0547c8f4-5640-44e5-ae3a-626f5fd4b053', 'BASIC', '2025-01-24 02:47:13.097+03', '2025-01-24 02:47:13.097+03', '2024-12-24 02:47:13.097+03');
INSERT INTO public.subscriptions VALUES ('e76af591-a4d2-46b5-b7ed-8a2c9a69eec6', 'BASIC', '2025-01-24 02:58:04.959+03', '2025-01-24 02:58:04.959+03', '2024-12-24 02:58:04.959+03');
INSERT INTO public.subscriptions VALUES ('cfee450e-ec6f-4e31-a607-c348b60d7475', 'BASIC', '2025-01-24 02:58:04.97+03', '2025-01-24 02:58:04.97+03', '2024-12-24 02:58:04.97+03');
INSERT INTO public.subscriptions VALUES ('603cfeb5-216c-4346-b9f2-b3fa8e830a1a', 'BASIC', '2025-01-24 02:58:04.977+03', '2025-01-24 02:58:04.977+03', '2024-12-24 02:58:04.978+03');
INSERT INTO public.subscriptions VALUES ('4ba2d0da-0186-4520-81f8-e6bb66f35094', 'BASIC', '2025-01-24 02:58:04.985+03', '2025-01-24 02:58:04.985+03', '2024-12-24 02:58:04.985+03');
INSERT INTO public.subscriptions VALUES ('43a7452d-cf23-41d5-aea8-e1c89f7a6eb1', 'BASIC', '2025-01-24 02:58:04.992+03', '2025-01-24 02:58:04.992+03', '2024-12-24 02:58:04.993+03');
INSERT INTO public.subscriptions VALUES ('8686c9c3-4c18-413d-ac98-6e8e18f761b7', 'BASIC', '2025-01-24 02:58:04.998+03', '2025-01-24 02:58:04.998+03', '2024-12-24 02:58:04.999+03');
INSERT INTO public.subscriptions VALUES ('9429750e-32eb-4432-8ca8-f231c900ec97', 'BASIC', '2025-01-24 02:58:05.004+03', '2025-01-24 02:58:05.004+03', '2024-12-24 02:58:05.005+03');
INSERT INTO public.subscriptions VALUES ('fe7e69ac-711f-4c61-94af-151a9abda231', 'BASIC', '2025-01-24 02:58:05.019+03', '2025-01-24 02:58:05.019+03', '2024-12-24 02:58:05.019+03');
INSERT INTO public.subscriptions VALUES ('df551e07-a2bd-4214-9690-2507525022b4', 'PREMIUM', '2025-01-24 03:09:09.483+03', '2025-01-24 02:58:05.011+03', '2024-12-24 03:09:09.483+03');
INSERT INTO public.subscriptions VALUES ('285af3cf-6bfe-4f7d-bd31-0d69163bb095', 'BASIC', '2025-01-24 05:37:30.146+03', '2025-01-24 05:37:30.146+03', '2024-12-24 05:37:30.149+03');


--
-- TOC entry 4895 (class 0 OID 34501)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('2d82e7c4-7aa4-4be1-9c22-c70509bff46a', 'mason.jackson@example.com', 'Mason', 'Jackson', 'A recent graduate looking to enter the software development field.', 22, '$2b$05$bbcs2aCQiYUpOav1tZ0iouYgFSM5n7kSGj9LaVAe8jpom6OdCqZl.', 'Male', '1ff57753-85fd-4334-9c07-3a1b51d5a0e6', 'USER', '2024-12-24 02:47:13.051+03', '2024-12-24 02:47:13.051+03');
INSERT INTO public.users VALUES ('9a50a9e2-de9f-48ae-89f2-9187f023f0c6', 'charlotte.white@example.com', 'Charlotte', 'White', 'Marketing coordinator with a focus on digital strategies.', 27, '$2b$05$zp7kkss7IQ78AH0zMrOOXOlR9.Z1dn8Inqh7TwzzvqrVgqKM7em2a', 'Female', '0dccd71a-9b0e-4e7d-b4e5-d50646bb7c52', 'USER', '2024-12-24 02:47:13.059+03', '2024-12-24 02:47:13.059+03');
INSERT INTO public.users VALUES ('ea307c90-febd-4372-9ae0-143d1d5314da', 'oliver.lee@example.com', 'Oliver', 'Lee', 'Experienced software engineer with a passion for problem-solving.', 30, '$2b$05$8Sau6iG..AX2GUVH/IiKu.FpYAe/IGTglrmnmlZMz5p90S/uams6q', 'Male', '971c3b4e-d79e-4424-890f-794da1687169', 'USER', '2024-12-24 02:47:13.067+03', '2024-12-24 02:47:13.067+03');
INSERT INTO public.users VALUES ('d6a4434d-2547-45e4-b147-19d911405585', 'amelia.harris@example.com', 'Amelia', 'Harris', 'Customer service manager with a focus on team leadership.', 34, '$2b$05$Cr.O/YfMP6NDmvuioQ.IIOZmI6UGU8vOUeIQuHNKdzJST4EBv8SeK', 'Female', 'ff144bb2-65fb-49e8-95e5-b7e1bf82ec41', 'USER', '2024-12-24 02:47:13.074+03', '2024-12-24 02:47:13.074+03');
INSERT INTO public.users VALUES ('44891608-eb3b-46f6-8778-52406c121102', 'henry.clark@example.com', 'Henry', 'Clark', 'Recent graduate in business administration.', 23, '$2b$05$mkw94sZVpcn08uqj0VWFrubyxCibFWz09HxJJ4qLAfdOsqnE1foNu', 'Male', 'fa6ac338-8024-426b-aa20-453e25f74599', 'USER', '2024-12-24 02:47:13.08+03', '2024-12-24 02:47:13.08+03');
INSERT INTO public.users VALUES ('cf92ba2a-bae3-4258-8e88-034103de1bd4', 'ella.lewis@example.com', 'Ella', 'Lewis', 'Product designer with a passion for user experience.', 32, '$2b$05$yD77/C8gPQmDgOJ37XKMcu2zYBLcxg7zcEIi/iUSriQJ5hdqLAxQC', 'Female', 'a67cd61e-a33c-4f65-b634-b66d27c8a56d', 'USER', '2024-12-24 02:47:13.087+03', '2024-12-24 02:47:13.087+03');
INSERT INTO public.users VALUES ('de0b04e0-e599-45a4-aa01-9db6bc3d38d4', 'jack.robinson@example.com', 'Jack', 'Robinson', 'Intern with an interest in software development.', 21, '$2b$05$Bc.JcAwfTRwIoHwqWwx5hObZP5t4WAMyKuo.y74B62iUBgSMZt5uu', 'Male', 'c3d46c46-f57e-4654-b943-ec471f210dbc', 'USER', '2024-12-24 02:47:13.093+03', '2024-12-24 02:47:13.093+03');
INSERT INTO public.users VALUES ('b4d9776d-6e73-4cf8-acff-8c906fc2be50', 'harper.martin@example.com', 'Harper', 'Martin', 'Human resources assistant focused on employee wellness.', 26, '$2b$05$krpywoBsxi00extuEAwSjuIgaAX7GOtQUJ0DPvM327MVFmsmWQ7aq', 'Female', '0547c8f4-5640-44e5-ae3a-626f5fd4b053', 'USER', '2024-12-24 02:47:13.098+03', '2024-12-24 02:47:13.098+03');
INSERT INTO public.users VALUES ('a7fa29a2-a487-4720-86ba-a45e3b000ca5', 'lucas.brown@example.com', 'Lucas', 'Brown', 'DevOps engineer with a background in cloud infrastructure.', 26, '$2b$05$nIsLDqr2kXNduRxvxqZB6uD..CPzQI6p/mteQ1DKy4Orb2MUB2yDG', 'Male', 'e76af591-a4d2-46b5-b7ed-8a2c9a69eec6', 'USER', '2024-12-24 02:58:04.963+03', '2024-12-24 02:58:04.963+03');
INSERT INTO public.users VALUES ('9432cad1-d26a-4003-9215-dbdfd451b8dd', 'chloe.clark@example.com', 'Chloe', 'Clark', 'Content strategist with experience in digital marketing.', 34, '$2b$05$.Ne1rRRrahLTUCdMSEbIHOFMd21KRw3H2175R1x/thrG5IJi6l9Vm', 'Female', 'cfee450e-ec6f-4e31-a607-c348b60d7475', 'USER', '2024-12-24 02:58:04.973+03', '2024-12-24 02:58:04.973+03');
INSERT INTO public.users VALUES ('575deb34-4361-4d54-badd-e81591c2103a', 'nathan.johnson@example.com', 'Nathan', 'Johnson', 'Senior software developer with expertise in full-stack development.', 32, '$2b$05$7BUxx7yPk6ygfYAquRTUXOgGe9Ax2fiQ5m3XyNt73HAQTYCuKvtB6', 'Male', '603cfeb5-216c-4346-b9f2-b3fa8e830a1a', 'USER', '2024-12-24 02:58:04.98+03', '2024-12-24 02:58:04.98+03');
INSERT INTO public.users VALUES ('22f3e923-9275-4ac7-8f2f-4acf756952a2', 'sophia.white@example.com', 'Sophia', 'White', 'Creative director with a passion for visual storytelling.', 28, '$2b$05$62Pb1xI0uP8KnV/BnuCdP.3g21Op11.GzyHff3jeuYZyi5LWZ0hbS', 'Female', '4ba2d0da-0186-4520-81f8-e6bb66f35094', 'USER', '2024-12-24 02:58:04.987+03', '2024-12-24 02:58:04.987+03');
INSERT INTO public.users VALUES ('78469d44-2b6d-4b2e-adf2-60977e0fb4e5', 'isaac.lewis@example.com', 'Isaac', 'Lewis', 'Software engineer with a focus on front-end technologies.', 24, '$2b$05$M0onbZRSYH0uqa1yhjbKIO6zoGo/Yl0Nsucff20xDtAc9ZpUtjjAa', 'Male', '43a7452d-cf23-41d5-aea8-e1c89f7a6eb1', 'USER', '2024-12-24 02:58:04.994+03', '2024-12-24 02:58:04.994+03');
INSERT INTO public.users VALUES ('406b3ad9-89b4-4bbc-8fa1-2ee8b620c712', 'zoe.martin@example.com', 'Zoe', 'Martin', 'Experienced community manager with a passion for engagement.', 27, '$2b$05$YPd2VYP6.iImtfR2IoubLOdkyKpVVODsr85/NmsYxkVmXSVdiodti', 'Female', '8686c9c3-4c18-413d-ac98-6e8e18f761b7', 'USER', '2024-12-24 02:58:05+03', '2024-12-24 02:58:05+03');
INSERT INTO public.users VALUES ('4c5643ed-20f4-43c2-8553-f127f727b2f2', 'daniel.james@example.com', 'Daniel', 'James', 'Business analyst with a focus on data-driven decision-making.', 29, '$2b$05$hdNtyt6u8a.74dockI7TUeQqzZkVwhhYsXHz2fVmVT7V4toGlDQ7q', 'Male', '9429750e-32eb-4432-8ca8-f231c900ec97', 'USER', '2024-12-24 02:58:05.007+03', '2024-12-24 02:58:05.007+03');
INSERT INTO public.users VALUES ('f86481bd-410e-4c7d-9811-ec8971f0cf90', 'maya.garcia@example.com', 'Maya', 'Garcia', 'Operations manager with expertise in supply chain management.', 31, '$2b$05$o3wJLgX6VapxZo377oEiy.06PBQgPf69l/TwtogE4jHfCAfi/5zui', 'Female', 'df551e07-a2bd-4214-9690-2507525022b4', 'USER', '2024-12-24 02:58:05.014+03', '2024-12-24 02:58:05.014+03');
INSERT INTO public.users VALUES ('f9bf42f1-2800-4516-a11e-d456e6724bf4', 'benjamin.miller@example.com', 'Benjamin', 'Miller', 'Project manager with a background in construction and engineering.', 29, '$2b$05$Hj8Po16xhNEfXp/e7QfaHeC9n9ukIyxleM/MNVsfTe.XAJHas99z2', 'Male', 'fe7e69ac-711f-4c61-94af-151a9abda231', 'USER', '2024-12-24 02:58:05.02+03', '2024-12-24 02:58:05.02+03');
INSERT INTO public.users VALUES ('3dcabd4d-ae92-40d8-8a30-9bb738a32c63', 'test@gmail.com', 'test name', 'test last name', 'i''m just a chill guy', 20, '$2b$05$k.vfrodIzeCLWBK2qcq9ZublUSe12.ZoP1mESf09wEirR4Tlp6fYC', 'NonSpecified', '285af3cf-6bfe-4f7d-bd31-0d69163bb095', 'ADMIN', '2024-12-24 05:37:30.174+03', '2024-12-24 05:58:11.636+03');


--
-- TOC entry 4741 (class 2606 OID 34577)
-- Name: ChatUsers ChatUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatUsers"
    ADD CONSTRAINT "ChatUsers_pkey" PRIMARY KEY ("userId", "chatId");


--
-- TOC entry 4731 (class 2606 OID 34521)
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- TOC entry 4739 (class 2606 OID 34567)
-- Name: coordinates coordinates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coordinates
    ADD CONSTRAINT coordinates_pkey PRIMARY KEY (id);


--
-- TOC entry 4735 (class 2606 OID 34541)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- TOC entry 4733 (class 2606 OID 34526)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4737 (class 2606 OID 34557)
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 34491)
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 34511)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4729 (class 2606 OID 34509)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4749 (class 2606 OID 34583)
-- Name: ChatUsers ChatUsers_chatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatUsers"
    ADD CONSTRAINT "ChatUsers_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES public.chats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4750 (class 2606 OID 34578)
-- Name: ChatUsers ChatUsers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatUsers"
    ADD CONSTRAINT "ChatUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4748 (class 2606 OID 34568)
-- Name: coordinates coordinates_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coordinates
    ADD CONSTRAINT "coordinates_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4745 (class 2606 OID 34547)
-- Name: likes likes_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4746 (class 2606 OID 34542)
-- Name: likes likes_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4743 (class 2606 OID 34527)
-- Name: messages messages_chatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES public.chats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4744 (class 2606 OID 34532)
-- Name: messages messages_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4747 (class 2606 OID 34558)
-- Name: photos photos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4742 (class 2606 OID 34512)
-- Name: users users_subscriptionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES public.subscriptions(id) ON UPDATE CASCADE;


-- Completed on 2024-12-25 17:02:35

--
-- PostgreSQL database dump complete
--

