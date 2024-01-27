set -e

psql -v ON_ERROR_STOP=1 -U mathlingo -d mathlingo  <<-EOSQL

INSERT INTO question(type, content) VALUES ('SINGLE_CHOICE', '{"type_":"single_choice",
     "text": "Was ist die bedeutung von  $\\\\mathbb{N}$?",
     "correctChoice":2, 
     "answers":["Alle ganzen Zahlen","$\\\\{0,1,2...\\\\}$","$\\\\{1,2,3,4...\\\\}$"]}'::json);



EOSQL
