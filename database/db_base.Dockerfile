FROM  postgres:16.1-alpine3.18

#default superuser
#has the POSTGRES_PASSWORD as password. (set externally, not in Git)
ENV POSTGRES_USER mathlingo_su

ADD init_scripts/A_setup_db.sh docker-entrypoint-initdb.d
ADD init_scripts/B_create_questiontype_enum.sh docker-entrypoint-initdb.d
ADD init_scripts/CA_create_tables.sh docker-entrypoint-initdb.d

ADD init_scripts/EA0_enter_test_user.sh docker-entrypoint-initdb.d
ADD init_scripts/EA0_enter_test_question.sh docker-entrypoint-initdb.d


EXPOSE 5432
