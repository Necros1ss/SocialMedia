#!/bin/bash
echo "Waiting for SQL Server to start..."
sleep 15

SQLCMD="/opt/mssql-tools18/bin/sqlcmd"
PARAMS="-S sqlserver -U sa -P YourStrong@Pass123 -C"

echo "Initializing database schema and seeding data..."

$SQLCMD $PARAMS -i "/database/Schema CoreData.sql"
$SQLCMD $PARAMS -i "/database/Schema Messaging.sql"
$SQLCMD $PARAMS -i "/database/Schema Auditing.sql"
$SQLCMD $PARAMS -i "/database/Messaging Enhancement.sql"
$SQLCMD $PARAMS -i "/database/function&trigger.sql"
$SQLCMD $PARAMS -i "/database/seedDataCore.sql"
$SQLCMD $PARAMS -i "/database/seedDataMessaging.sql"
$SQLCMD $PARAMS -i "/database/insert.sql"

echo "Database initialization complete!"
