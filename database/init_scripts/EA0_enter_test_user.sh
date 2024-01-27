set -e

psql -v ON_ERROR_STOP=1 -U mathlingo -d mathlingo  <<-EOSQL

INSERT INTO mathlingo_user(first_name, middle_names, last_name) VALUES ('orca', 'sperm blue','wale');



EOSQL
