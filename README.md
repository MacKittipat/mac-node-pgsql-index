## mac-node-pgsql-index

Experiment with PostgreSQL JSONB index

1. Create new database
```sql 
create database mactest with owner postgres;
```

2. Create new table 
```sql 
create table users
(
	data jsonb
);

alter table users owner to postgres;

create index idx_data
	on users (data);

create index idx_province
	on users (((data -> 'address'::text) ->> 'province'::text));
```

3. Insert sample data into table
```bash 
node app.js
```

4. Test index
```sql 
select count(data) from users;
select * from users;

create index idx_data on users using gin (data);
explain analyse select * from users where data->'address'->>'street' = 'e16f3f8d-f565-4f4f-b900-27054eb881ed';
explain analyse select * from users where data @> '{"address": {"street": "e16f3f8d-f565-4f4f-b900-27054eb881ed"} }';

create index idx_province on users((data->'address'->>'province'));
explain analyse select * from users where data->'address'->>'province' = 'ca4a799d-d4d2-4f8c-b2aa-d60355ae4006';
explain analyse select * from users where data->'address'->>'province' in( 'ca4a799d-d4d2-4f8c-b2aa-d60355ae4006');
```