set -e 
psql -v ON_ERROR_STOP=1 -U mathlingo_su -d mathlingo  <<-EOSQL
CREATE  TABLE question (
       question_id SERIAL PRIMARY KEY NOT NULL,
       type QUESTIONTYPE NOT NULL,
       content JSON NOT NULL);

-- TODO type corresponds to the relevant field in the JSON. This could be a constraint.
-- (We may select by type therefore having it in 
-- an easy accessible field is convenient and performant).

CREATE TABLE keyword(
       keyword_id SERIAL PRIMARY KEY NOT NULL,
       word VARCHAR(128) NOT NULL UNIQUE 
);

CREATE  TABLE question_to_keyword (
       question_id INTEGER NOT NULL,
       keyword_id INTEGER NOT NULL,
       PRIMARY KEY(question_id, keyword_id),
       FOREIGN KEY(question_id) 
       	       REFERENCES question(question_id) 
	       ON DELETE CASCADE,
       FOREIGN KEY(keyword_id) 
       	       REFERENCES keyword(keyword_id) 
	       ON DELETE CASCADE
);




CREATE TABLE work(
       work_id SERIAL PRIMARY KEY NOT NULL,
       name VARCHAR(1024) NOT NULL ,
       section_meaning VARCHAR(1024)
);

CREATE TABLE reference (
       reference_id SERIAL PRIMARY KEY NOT NULL,
       work_id INTEGER NOT NULL,
       section INTEGER,
       page INTEGER, 
       reference VARCHAR(1024) NOT NULL,
       statement TEXT NOT NULL,
       FOREIGN KEY(work_id) 
       	       REFERENCES work(work_id) 
	       ON DELETE CASCADE
);

CREATE TABLE question_to_reference (
       question_id INTEGER NOT NULL,
       reference_id INTEGER NOT NULL,
       PRIMARY KEY(question_id, reference_id),
       FOREIGN KEY(question_id) 
       	       REFERENCES question(question_id) 
	       ON DELETE CASCADE,
       FOREIGN KEY(reference_id) 
       	       REFERENCES reference(reference_id) 
	       ON DELETE CASCADE
);



CREATE TABLE course(
       course_id SERIAL PRIMARY KEY NOT NULL,
       name VARCHAR(1024) NOT NULL,
       description TEXT
);

CREATE TABLE lesson(
       lesson_id SERIAL PRIMARY KEY NOT NULL,
       course_id INTEGER NOT NULL,
       name VARCHAR(1024) NOT NULL,
       description TEXT,
       FOREIGN KEY(course_id) 
       	       REFERENCES course(course_id) 
	       ON DELETE CASCADE

);

CREATE TABLE reference_to_lesson(
       reference_id INTEGER NOT NULL,
       lesson_id INTEGER NOT NULL,
       PRIMARY KEY(reference_id, lesson_id),
       FOREIGN KEY(reference_id) 
       	       REFERENCES reference(reference_id) 
	       ON DELETE CASCADE,
       FOREIGN KEY(lesson_id) 
       	       REFERENCES lesson(lesson_id) 
	       ON DELETE CASCADE
);






CREATE TABLE mathlingo_user (
       mathlingo_user_id SERIAL PRIMARY KEY,
       first_name VARCHAR(1024) NOT NULL,
       middle_names VARCHAR(1024) NOT NULL,
       last_name VARCHAR(1024) NOT NULL
);

CREATE TABLE progress(
       mathlingo_user_id INTEGER NOT NULL,
       lesson_id INTEGER NOT NULL,
       finished BOOLEAN NOT NULL DEFAULT false, 
       PRIMARY KEY(mathlingo_user_id, lesson_id),
       FOREIGN KEY(mathlingo_user_id) 
       	       REFERENCES mathlingo_user(mathlingo_user_id) 
	       ON DELETE CASCADE,       
       FOREIGN KEY(lesson_id) 
       	       REFERENCES lesson(lesson_id) 
	       ON DELETE CASCADE
);

-- enrollment table
CREATE TABLE mathlingo_user_to_course(
       mathlingo_user_id INTEGER NOT NULL,
       course_id INTEGER NOT NULL,
       PRIMARY KEY(mathlingo_user_id, course_id),
       FOREIGN KEY(mathlingo_user_id) 
       	       REFERENCES mathlingo_user(mathlingo_user_id) 
	       ON DELETE CASCADE,       
       FOREIGN KEY(course_id) 
       	       REFERENCES course(course_id) 
	       ON DELETE CASCADE       
);

CREATE TABLE attempts (
       attempts_id SERIAL PRIMARY KEY,
       mathlingo_user_id INTEGER NOT NULL,
       question_id INTEGER NOT NULL,
       lesson_id INTEGER NOT NULL,
       misstrials INTEGER NOT NULL,
       succeeded BOOL NOT NULL,
       date DATE,
       FOREIGN KEY(mathlingo_user_id) 
       	       REFERENCES mathlingo_user(mathlingo_user_id) 
	       ON DELETE CASCADE,       
       FOREIGN KEY(question_id) 
       	       REFERENCES question(question_id) 
	       ON DELETE CASCADE,
       FOREIGN KEY(lesson_id) 
       	       REFERENCES lesson(lesson_id) 
	       ON DELETE CASCADE
) ;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO mathlingo ;
GRANT SELECT, INSERT, DELETE ON ALL TABLES IN SCHEMA public TO mathlingo;

EOSQL


