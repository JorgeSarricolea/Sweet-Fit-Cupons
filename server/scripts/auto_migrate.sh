#!/bin/bash

# Aautocomplete name
MIGRATION_NAME="auto_migration"

# concatenate autocomplete name and run command
npx prisma migrate dev --name $MIGRATION_NAME
