

drop table if exists DM_Pacient;
create table DM_Pacient (
    identity_document int primary key,
    name varchar(50) not null,
    last_name varchar(50) not null,
    birthdate date not null,
    email varchar(50) not null,
    phone varchar(20) not null,
    create_at timestamp default now(),
    update_at timestamp default now(),
    address varchar(150),
    latitud float,
    longitud float,
    url_pdf_register text,
    is_active boolean default false
);

drop table if exists DM_Skill;
create table DM_Skill(
    id serial primary key,
    description varchar(150) not null,
    url_skill varchar(150) not null,
    api_key varchar(150) not null
);

drop table if exists DT_Skill_X_Pacient;
create table DT_Skill_X_Pacient(
    identity_document_pacient int references DM_Pacient(identity_document) not null,
    id_skill int references DM_Skill(id) not null,
    is_active boolean default true not null,
    context text
);


drop table if exists DM_Type_Question;
create table DM_Type_Question (
     id serial primary key,
     descirption varchar(150) 
);

drop table if exists DM_Question;
create table DM_Question(
    id serial primary key,
    id_skill int references DM_Skill(id) not null,
    title varchar(100),
    description varchar(150),
    id_type_question int references DM_Type_Question(id)
);


drop table if exists DM_Option_Question;
create table DM_Option_Question(
    id serial primary key not null,
    id_question int references DM_Question(id) not null,
    value varchar(100) not null,
    is_active boolean default true
);


drop table if exists DT_Answer;
create table DT_Answer(
    id serial primary key not null,
    id_question int references DM_Question(id) not null,
    value_integer int,
    value_string varchar(150),
    value_boolean boolean,
    value_float float,
    value_date date,
    value_time time,
    value_datetime timestamp,
    value_option_question int references DM_Option_Question(id),
    create_at timestamp default now(),
    update_at timestamp default now(),
    url_pdf_answer text,
    identity_document_pacient int references DM_Pacient(identity_document) not null
);


drop table if exists DT_Schema_Alert;
create table DT_Schema_Alert(
    id serial primary key not null,
    time time default '10 hours'::interval,
    identity_document_pacient int references DM_Pacient(identity_document) not null,
    id_skill int references DM_Skill(id) not null,
    is_active boolean default true not null
);


drop table if exists DM_Administrator;
create table DM_Administrator (
    identity_document int primary key,
    name varchar(50) not null,
    last_name varchar(50) not null,
    birthdate date not null,
    email varchar(50) not null,
    phone varchar(20) not null,
    create_at timestamp default now(),
    update_at timestamp default now(),
    is_active boolean default false
);