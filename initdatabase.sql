create table users (
	id int not null primary key auto_increment,
	name varchar(255) not null,
	email varchar(255) unique not null,
	password varchar(255) not null,
	created_at datetime not null,
	updated_at datetime not null
);

create table tasks (
	id int not null primary key auto_increment,
	title varchar(255) unique not null,
	description varchar(255),
	deleted boolean,
	content text not null,
	priority enum("低い", "中", "高い") default "低い" not null,
	start_time timestamp not null,
	progress enum('0', '20', '50', '80', '100') default '0' not null,
	status enum("トド", "進行中", "ペンディング", "完了") default "トド" not null,
	user_id int,
  foreign key (user_id) references users(id),
	created_at datetime not null,
	updated_at datetime not null
);

insert into users (name, email, password, created_at, updated_at)
values 
	('Nguyen Minh Quy', 'quy@gmail.com', '$2a$10$/DRCCsC19RF7NgGr9dqvCeEmzlhjUtq/JpFhgdowHRcjum2M54GBW', '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('Le Bao Hieu', 'hieu@gmail.com', '$2a$10$c8Jh2OJR2XuPUu1GHndjA.3rZrJ1AwMzkV/1Qy9sPpF4H09EIzYyK', '2022-12-09 10:24:53', '2022-12-09 10:24:53');

insert into tasks (title, description, content, priority, start_time, progress, status, user_id, created_at, updated_at)
values 
	('サッカーをする', '友達と一緒にサッカーをする', '友達と一緒にサッカーをする', '中', '2023-12-09 10:24:53', '0', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('バドミントンをする', 'バドミントン', '何', '低い', '2022-12-09 10:24:53', '80', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('すごい', 'サッカーゲーム', '何何', '高い', '2022-12-09 10:24:53', '0', '進行中', 2, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('宿題をする', '宿題を完了する', '数学宿題', '中', '2022-12-09 10:24:53', '0', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('英語', '英語を勉強する', '音楽を聴く', '中', '2022-12-09 10:24:53', '0', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('日本語', '日本語を練習する', '友達と一緒にサッカーをする', '中', '2022-12-09 10:24:53', '0', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('チェスをする', '友達とチェスをする', '友達と一緒にサッカーをする', '中', '2022-12-09 10:24:53', '20', 'トド', 2, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('データベースを作成する', 'データベースを作成する', '友達と一緒にサッカーをする', '中', '2022-12-09 10:24:53', '0', 'トド', 2, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('テスト', '安易', '友達と一緒にサッカーをする', '中', '2022-12-09 10:24:53', '0', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('ゲームをする', '何か', '何', '中', '2022-12-09 10:24:53', '50', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('食べる', 'リンゴを食べる', '友達と一緒にサッカーをする', '高い', '2022-12-09 10:24:53', '0', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53'),
	('寝る', '寝る', '友達と一緒にサッカーをする', '低い', '2022-12-09 10:24:53', '100', 'トド', 1, '2022-12-09 10:24:53', '2022-12-09 10:24:53');

