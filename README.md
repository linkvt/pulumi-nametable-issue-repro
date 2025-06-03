# Reproduction Repo for bad pulumi import files

This is a reproduction repository for generating bad import files using the `pulumi preview --import-file import.json` command.

## Issue

The issue appears when trying to generate an import file for resources using parent components (e.g. through a ComponentResource) where the parent resources already exist in the stack.
The import file generation creates a mapping of an id to the existing parent component urn.
It then uses add this mapping `id: parent-urn` in the `nameTable` field in the import file.
The issue shows when multiple existing parent components have the same id which results only one parent being referenced in the `nameTable` field at random.

## Reproduction

1. Install the deps with `npm install` or `make setup`
2. Show the issue by running `make repro`

