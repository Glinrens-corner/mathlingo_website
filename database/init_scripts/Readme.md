
Files in this folder are copied into docker-entrypoint-initdb.d and are
therefore executed at creation of the postgresdatabase.
(not all are always copied into the container. see the relevant dockerfile).

They are executed in alphabetically order. 
Therefore we use a simple convention:
 
Files starting with A_ create the basic user and database. 
Files starting with B_ create datatypes. 
Files starting with C_ create Tables. 
Files starting with DE_ insert general preset data.
Files starting with DT_ insert test data.

(This approach probably doesn't scale too well for many interdependencies. But
for now...)

The scripts should be executed under the postgres users mathlingo or
mathlingo_su if superuser rights are required.
