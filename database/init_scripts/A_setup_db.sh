set -e 
psql -v ON_ERROR_STOP=1 -U mathlingo_su <<-EOSQL
-- user to be used by the app/server. 
\set password  `echo $MATHLINGO_PASSWORD`
CREATE USER mathlingo;
ALTER USER mathlingo WITH PASSWORD :'password';

CREATE DATABASE mathlingo;

GRANT ALL PRIVILEGES ON DATABASE mathlingo TO mathlingo;

EOSQL
