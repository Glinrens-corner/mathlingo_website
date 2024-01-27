set -e 
psql -v ON_ERROR_STOP=1 -U mathlingo_su -d mathlingo  <<-EOSQL

CREATE TYPE QUESTIONTYPE AS ENUM ('SINGLE_CHOICE');



EOSQL
